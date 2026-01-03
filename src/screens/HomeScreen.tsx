import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { SelectionModal, SelectionOption } from '../components/ui/SelectionModal';
import { SettingRow } from '../components/ui/SettingRow';
import HomeHero from '../components/ui/HomeHero';
import { DICTIONARY } from '../data/dictionary';

export const HomeScreen = () => {
    const { playerCount, setPlayerCount, impostorCount, setImpostorCount, startGame, category, setCategory, setGameStatus, gameDuration, setGameDuration, setRulesSource, enabledCategories } = useGame();
    const [hintsEnabled, setHintsEnabled] = useState(false);
    const [showDurationModal, setShowDurationModal] = useState(false);
    const insets = useSafeAreaInsets();

    const durationOptions: SelectionOption[] = [
        { label: '3 minuti', value: 3 * 60 },
        { label: '4 minuti', value: 4 * 60 },
        { label: '5 minuti', value: 5 * 60 },
        { label: '6 minuti', value: 6 * 60 },
        { label: '7 minuti', value: 7 * 60 },
        { label: '8 minuti', value: 8 * 60 },
        { label: '9 minuti', value: 9 * 60 },
        { label: '10 minuti', value: 10 * 60 },
        { label: '11 minuti', value: 11 * 60 },
        { label: '12 minuti', value: 12 * 60 },
        { label: '13 minuti', value: 13 * 60 },
        { label: '14 minuti', value: 14 * 60 },
        { label: '15 minuti', value: 15 * 60 },
        { label: 'Illimitato', value: -1 },
    ];

    const getDurationLabel = (seconds: number) => {
        if (seconds === -1) return 'Illimitato';
        if (seconds === 6) return '6 sec';
        return `${Math.floor(seconds / 60)} min`;
    };

    const handleImpostorChange = (increment: boolean) => {
        const maxImpostors = playerCount - 1;
        const newCount = increment
            ? Math.min(maxImpostors, impostorCount + 1)
            : Math.max(1, impostorCount - 1);
        setImpostorCount(newCount);
    };

    return (
        <View className="flex-1">
            <SafeAreaView className="flex-1" edges={['left', 'right']}>
                {/* Fixed Header Actions */}
                <View
                    className="absolute left-0 right-0 z-50 flex-row justify-between items-center px-4 py-4"
                    style={{ top: insets.top }}
                >
                    <Pressable
                        onPress={() => setGameStatus('settings')}
                        className="bg-surface/50 p-2 rounded-full border border-white/5 backdrop-blur-md"
                    >
                        <Ionicons name="settings-sharp" size={24} color="white" />
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            setRulesSource('setup');
                            setGameStatus('rules');
                        }}
                        className="bg-surface/50 p-2 rounded-full border border-white/5 backdrop-blur-md"
                    >
                        <Ionicons name="help" size={24} color="white" />
                    </Pressable>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                    {/* Hero Header */}
                    <HomeHero />

                    {/* Settings List */}
                    <View className="mx-4 rounded-2xl overflow-hidden">
                        <SettingRow
                            icon="grid"
                            label="Modalità di Gioco"
                            value="Classico"
                            disabled={true}
                            badge="COMING SOON"
                        />
                    </View>

                    <View className="mx-4 mt-4 rounded-2xl overflow-hidden">
                        <SettingRow
                            icon="people"
                            label="Giocatori"
                            value={playerCount.toString()}
                            onPress={() => setGameStatus('player_config')}
                            helperText="Tocca per aggiungere i partecipanti"
                        />
                        <SettingRow
                            icon="happy"
                            label="Impostori"
                            value={impostorCount}
                            type="counter"
                            onIncrement={() => handleImpostorChange(true)}
                            onDecrement={() => handleImpostorChange(false)}
                            helperText=""
                        />
                        <SettingRow
                            icon="search"
                            label="Indizio per Impostori"
                            type="switch"
                            switchValue={hintsEnabled}
                            onValueChange={setHintsEnabled}
                            disabled={true}
                            badge="COMING SOON"
                        />
                    </View>

                    <View className="mx-4 mt-4 rounded-2xl overflow-hidden">
                        <SettingRow
                            icon="book"
                            label="Pacchetti"
                            value={enabledCategories.length === Object.keys(DICTIONARY).length ? 'Tutti' : `${enabledCategories.length} Selezionati`}
                            type="arrow"
                            onPress={() => setGameStatus('categories')}
                        />
                        <SettingRow
                            icon="time"
                            label="Durata"
                            value={getDurationLabel(gameDuration)}
                            type="arrow"
                            onPress={() => setShowDurationModal(true)}
                        />
                    </View>

                </ScrollView>

                {/* Duration Modal */}
                <SelectionModal
                    visible={showDurationModal}
                    title="Seleziona Durata"
                    options={durationOptions}
                    selectedValue={gameDuration}
                    onSelect={(val) => {
                        setGameDuration(val);
                        setShowDurationModal(false);
                    }}
                    onClose={() => setShowDurationModal(false)}
                />

                {/* Start Button - Sticky Footer */}
                <View
                    className="p-4 pt-2 bg-background border-t border-white/5"
                    style={{ paddingBottom: Math.max(insets.bottom, 16) }}
                >
                    <Pressable onPress={startGame}>
                        <LinearGradient
                            colors={['#00b09b', '#96c93d']} // Green Gradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="p-4 rounded-full flex-row justify-center items-center shadow-lg"
                        >
                            <Text className="text-white text-2xl font-bold uppercase tracking-widest shadow-sm">Inizia</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
};
