import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGame } from '../context/GameContext';
import { GameButton } from '../components/ui/GameButton';
import { COLORS } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';

export const PassAndPlayScreen = ({ onFinish }: { onFinish: () => void }) => {
    const { players, markPlayerRevealed, setGameStatus } = useGame();
    const insets = useSafeAreaInsets();

    // Find first unrevealed player
    const currentPlayerIndex = players.findIndex(p => !p.isRevealed);
    const currentPlayer = players[currentPlayerIndex];
    const nextPlayer = players[currentPlayerIndex + 1];

    const [isRevealing, setIsRevealing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showTapWarning, setShowTapWarning] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    if (!currentPlayer) {
        return (
            <View className="flex-1 bg-background justify-center items-center p-4">
                <View className="w-full max-w-sm bg-surface rounded-3xl p-8 items-center border border-white/10">
                    <Ionicons name="people-circle" size={80} color={COLORS.neonBlue} style={{ marginBottom: 20 }} />
                    <Text className="text-white text-3xl font-bold text-center mb-2">Tutti Pronti!</Text>
                    <Text className="text-white/60 text-center mb-8">Tutti i giocatori hanno ricevuto il loro ruolo.</Text>
                    <GameButton title="Inizia Partita" onPress={onFinish} />
                </View>
            </View>
        )
    }

    const handleLongPress = () => {
        setIsRevealing(true);
    };

    const handlePressOut = () => {
        if (isRevealing) {
            setIsRevealing(false);
            setShowConfirmation(true);
        }
    };

    const handleShortPress = () => {
        // Did not hold long enough
        setShowTapWarning(true);
        setTimeout(() => setShowTapWarning(false), 1500);
    };

    const handleNext = () => {
        markPlayerRevealed(currentPlayer.id);
        if (!nextPlayer) {
            // Last player confirmed, start game immediately
            onFinish();
        } else {
            setShowConfirmation(false);
        }
    };

    const isWarning = showTapWarning && !isRevealing;

    // Header Logic
    const getHeaderText = () => {
        if (showConfirmation && nextPlayer) return "Passa il telefono a";
        if (showConfirmation && !nextPlayer) return "Attendi...";
        return "Turno di";
    };

    const getPlayerName = () => {
        if (showConfirmation && nextPlayer) return nextPlayer.name;
        if (showConfirmation && !nextPlayer) return "Tutti Pronti";
        return currentPlayer.name;
    };

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1 justify-center p-4">
                {/* Home Button - Absolute Top Left */}
                <View
                    style={{ position: 'absolute', top: Math.max(insets.top, 16) + 16, left: 16, zIndex: 50 }}
                >
                    <Pressable
                        onPress={() => setShowExitModal(true)}
                        className="p-2 bg-surface/80 rounded-full"
                    >
                        <Ionicons name="home" size={24} color="white" />
                    </Pressable>
                </View>

                <View className="items-center mb-12 relative z-10 w-full flex-row justify-center items-center">
                    <View className="items-center">
                        <Text className="text-white/60 text-lg uppercase tracking-widest mb-2 font-bold">
                            {getHeaderText()}
                        </Text>
                        <Text className="text-white text-5xl font-extrabold text-center text-neon-blue drop-shadow-lg shadow-neon-blue/50">
                            {getPlayerName()}
                        </Text>
                    </View>
                </View>

                {/* Secret Card Container */}
                <View className="w-full aspect-[3/4] max-h-[500px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#1A1A1A] shadow-2xl">

                    {/* Background Pattern */}
                    <View className="absolute inset-0 opacity-10">
                        <Ionicons name="finger-print" size={400} color="white" style={{ position: 'absolute', right: -100, bottom: -100 }} />
                    </View>

                    {showConfirmation ? (
                        <View className="flex-1 items-center justify-center p-6">
                            <View className="w-20 h-20 rounded-full bg-neon-blue/20 items-center justify-center mb-4 border-2 border-neon-blue">
                                <Ionicons name="checkmark" size={40} color={COLORS.neonBlue} />
                            </View>
                            <Text className="text-white text-2xl font-bold text-center mb-6">
                                Ruolo Confermato
                            </Text>

                            <View className="w-full gap-y-3">
                                <Pressable
                                    onPress={handleNext}
                                    className="w-full py-4 rounded-xl bg-neon-blue active:bg-neon-blue/80 items-center justify-center shadow-lg shadow-neon-blue/20"
                                >
                                    <Text className="text-[#121212] font-extrabold uppercase tracking-wider text-lg">
                                        {nextPlayer ? 'Prossimo Giocatore' : 'Inizia Partita'}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setShowConfirmation(false)}
                                    className="w-full py-4 rounded-xl border border-white/20 active:bg-white/5 items-center justify-center"
                                >
                                    <Text className="text-white/80 font-bold uppercase tracking-wider text-sm">Rivedi Ruolo</Text>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View className="flex-1">
                            {/* Card Content (Hidden or Revealed) */}
                            <View className="flex-1 items-center justify-center p-6">
                                {isRevealing ? (
                                    <View className="items-center w-full">
                                        {currentPlayer.role === 'Impostor' ? (
                                            <>
                                                <Ionicons name="skull" size={80} color={COLORS.hotPink} style={{ marginBottom: 20 }} />
                                                <Text className="text-white/60 uppercase tracking-widest font-bold mb-4">Il tuo ruolo</Text>
                                                <Text style={styles.impostorText}>SEI L'IMPOSTORE</Text>
                                                <Text className="text-white/40 text-center mt-4 px-4">
                                                    Inganna gli altri e non farti scoprire.
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Ionicons name="people" size={80} color={COLORS.neonBlue} style={{ marginBottom: 20 }} />
                                                <Text className="text-white/60 uppercase tracking-widest font-bold mb-4">Parola Segreta</Text>
                                                <Text style={styles.secretWord}>{currentPlayer.word}</Text>
                                                <Text className="text-white/40 text-center mt-4 px-4">
                                                    Questa è la parola segreta dei civili.
                                                </Text>
                                            </>
                                        )}
                                    </View>
                                ) : (
                                    <View className="items-center opacity-50">
                                        <Ionicons name="eye-off" size={80} color="white" style={{ marginBottom: 20 }} />
                                        <Text className="text-white text-xl font-bold uppercase tracking-widest">
                                            Top Secret
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Interaction Area (Bottom) - Always rendered to capture Touch Events */}
                            <Pressable
                                onPress={handleShortPress}
                                onLongPress={handleLongPress}
                                onPressOut={handlePressOut}
                                delayLongPress={150} // Faster response
                                className={`absolute bottom-0 left-0 right-0 h-24 flex-row items-center justify-center border-t border-white/10 ${isRevealing ? 'bg-neon-blue/20' : (isWarning ? 'bg-red-500/20' : 'bg-surface-highlight')}`}
                            >
                                <Ionicons
                                    name={isWarning ? "alert-circle" : "finger-print"}
                                    size={32}
                                    color={isWarning ? COLORS.hotPink : COLORS.neonBlue}
                                    style={{ marginRight: 12 }}
                                />
                                <Text className={`font-bold text-lg tracking-wider uppercase ${isWarning ? 'text-hot-pink' : 'text-white'}`}>
                                    {isRevealing ? 'Rilascia per nascondere' : (isWarning ? 'Devi Tenere Premuto!' : 'Tieni premuto per rivelare')}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </SafeAreaView>

            <ConfirmationModal
                visible={showExitModal}
                title="Torna alla Home"
                message="Vuoi terminare la partita in corso?"
                confirmText="Termina"
                cancelText="Annulla"
                onConfirm={() => {
                    setShowExitModal(false);
                    setGameStatus('setup');
                }}
                onCancel={() => setShowExitModal(false)}
                variant="danger"
                icon="home"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    secretWord: {
        color: COLORS.neonBlue,
        fontSize: 42,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 243, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    impostorText: {
        color: COLORS.hotPink,
        fontSize: 36,
        fontWeight: '900',
        textAlign: 'center',
        textShadowColor: 'rgba(255, 0, 128, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
});
