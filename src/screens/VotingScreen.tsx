import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame, Player } from '../context/GameContext';
import { GameButton } from '../components/ui/GameButton';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { COLORS } from '../theme';

export const VotingScreen = () => {
    const { players, setGameStatus, resetGame, secretWord, startPlaying, eliminatedPlayerIds, markPlayerEliminated, impostorCount, impostorsFound, incrementImpostorsFound } = useGame();
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
    const [voteOutcome, setVoteOutcome] = useState<'none' | 'citizen' | 'impostor'>('none');
    const [showSecretWord, setShowSecretWord] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    // Filter out already revealed players? Usually we keep them in list but maybe mark them?
    // For simplicity, list active players.
    // Assuming 'isRevealed' in context meant "Role revealed to self", not "Eliminated".
    // We didn't add an "isEliminated" state. We can infer logic locally or just not support multi-round elimination yet.
    // The prompt says: "Se non è l'impostore allora dopo ... si torna alla schermata del timer".
    // This implies the game continues.

    // Active players are those NOT eliminated
    const activePlayers = players.filter(p => !eliminatedPlayerIds.includes(p.id));

    const handleVote = () => {
        if (selectedPlayerId === null) return;

        const target = players.find(p => p.id === selectedPlayerId);
        if (!target) return;

        if (target.role === 'Impostor') {
            incrementImpostorsFound();
            markPlayerEliminated(selectedPlayerId); // Eliminated
            setVoteOutcome('impostor');
        } else {
            markPlayerEliminated(selectedPlayerId); // Eliminated (Innocent)
            setVoteOutcome('citizen');
        }
    };

    const handleResume = () => {
        startPlaying(); // Resumes timer (timeLeft is preserved in context)
    };

    const handleHome = () => {
        setShowExitModal(true);
    };

    // Multi-impostor logic for Resume
    const impostorsRemaining = impostorCount - (voteOutcome === 'impostor' ? impostorsFound + 1 : impostorsFound);
    // Note: impostorsFound state update is async, so we use local calc for render if needed, or rely on state if already updated.
    // Actually simpler: we updated state in handleVote. BUT React state updates might not be immediate in same render cycle?
    // It's safer to rely on the outcome state for UI.

    if (voteOutcome === 'impostor') {
        const remaining = impostorCount - (impostorsFound + 1); // +1 because we just found one but state might lag or we want current frame
        // Wait, incrementImpostorsFound updates state.

        const isGameOver = (impostorsFound + 1) >= impostorCount; // We found the last one?
        // Actually since we call incrementImpostorsFound immediately, let's assume next render has it. 
        // But inside this render cycle, 'impostorsFound' is the OLD value.
        // So checking (impostorsFound + 1) >= impostorCount is correct for "Is this the last one?"

        return (
            <View className="flex-1 bg-background items-center justify-center px-4">
                <Ionicons name="trophy" size={80} color={COLORS.neonBlue} />
                <Text className="text-neon-blue text-4xl font-extrabold text-center mt-4 mb-2">IMPOSTORE TROVATO!</Text>
                <Text className="text-white text-xl text-center mb-8">
                    Era <Text className="font-bold">{players.find(p => p.id === selectedPlayerId)?.name}</Text>
                </Text>

                {/* If Game Over (All impostors found) */}
                {isGameOver ? (
                    <View className="bg-surface p-6 rounded-2xl w-full mb-8 items-center">
                        <Text className="text-white/60 mb-2">PAROLA SEGRETA</Text>
                        <Pressable onPress={() => setShowSecretWord(!showSecretWord)}>
                            <Text className="text-white text-3xl font-bold tracking-widest text-center">
                                {showSecretWord ? secretWord : '•••••••'}
                            </Text>
                            <Text className="text-neon-blue text-xs text-center mt-2">
                                {showSecretWord ? 'Tocca per nascondere' : 'Tocca per rivelare'}
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <Text className="text-white/50 text-lg mb-8">Ne rimangono altri {impostorCount - (impostorsFound + 1)}!</Text>
                )}

                <View className="w-full gap-4">
                    {!isGameOver && (
                        <GameButton title="Riprendi Gioco" onPress={handleResume} variant="secondary" />
                    )}
                    <GameButton title={isGameOver ? "Nuova Partita" : "Termina Partita"} onPress={resetGame} variant={isGameOver ? 'primary' : 'danger'} />
                </View>
            </View>
        );
    }

    if (voteOutcome === 'citizen') {
        return (
            <View className="flex-1 bg-background items-center justify-center px-4">
                <Ionicons name="close-circle" size={80} color={COLORS.hotPink} />
                <Text className="text-hotPink text-4xl font-extrabold text-center mt-4 mb-2">INNOCENTE!</Text>
                <Text className="text-white text-xl text-center mb-8">
                    <Text className="font-bold">{players.find(p => p.id === selectedPlayerId)?.name}</Text> non è l'impostore.
                </Text>

                <Text className="text-white/40 mb-10 text-center">La partita continua...</Text>

                <View className="w-full">
                    <GameButton title="Riprendi Gioco" onPress={handleResume} variant="secondary" />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1">
                <View className="flex-row justify-between items-center px-4 py-2 border-b border-white/10">
                    <Pressable onPress={handleHome} className="bg-surface p-2 rounded-full">
                        <Ionicons name="home" size={24} color="white" />
                    </Pressable>
                    <Text className="text-white font-bold text-lg">Chi è l'Impostore?</Text>
                    <View className="w-10" />
                </View>

                <ScrollView className="flex-1 px-4 py-4">
                    <Text className="text-white/60 text-center mb-6">Seleziona un giocatore da accusare</Text>

                    <View className="flex-row flex-wrap justify-between">
                        {activePlayers.map(player => (
                            <Pressable
                                key={player.id}
                                onPress={() => setSelectedPlayerId(player.id)}
                                className={`w-[48%] aspect-square mb-4 rounded-2xl items-center justify-center border-2 ${selectedPlayerId === player.id ? 'bg-neon-blue/20 border-neon-blue' : 'bg-surface border-transparent'}`}
                            >
                                <Ionicons name="person" size={32} color={selectedPlayerId === player.id ? COLORS.neonBlue : 'white'} />
                                <Text className={`text-lg font-bold mt-2 text-center ${selectedPlayerId === player.id ? 'text-neon-blue' : 'text-white'}`}>
                                    {player.name}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>

                <View className="p-4 bg-background border-t border-white/10">
                    <GameButton
                        title="Torna alla discussione"
                        onPress={handleResume}
                        variant="outline"
                    />

                    <View className="h-4" />

                    <GameButton
                        title="VOTA"
                        onPress={handleVote}
                        disabled={selectedPlayerId === null}
                        variant={selectedPlayerId ? 'danger' : 'primary'}
                    />
                </View>
                <ConfirmationModal
                    visible={showExitModal}
                    title="Torna alla Home"
                    message="Vuoi terminare la partita in corso?"
                    confirmText="Termina"
                    cancelText="Annulla"
                    onConfirm={() => {
                        setShowExitModal(false);
                        resetGame();
                    }}
                    onCancel={() => setShowExitModal(false)}
                    variant="danger"
                    icon="home"
                />
            </SafeAreaView>
        </View>
    );
};
