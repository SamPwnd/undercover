
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { SettingRow } from '../components/ui/SettingRow';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { COLORS } from '../theme';

export const SettingsScreen = () => {
    const {
        setGameStatus,
        soundEnabled,
        setSoundEnabled,
        vibrationEnabled,
        setVibrationEnabled,
        setRulesSource,
        resetUsedWords
    } = useGame();

    const [showResetConfirm, setShowResetConfirm] = useState(false);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                setGameStatus('setup');
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4 mb-4 border-b border-white/10">
                    <Pressable
                        onPress={() => setGameStatus('setup')}
                        className="bg-surface p-2 rounded-full mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-white text-2xl font-bold">Impostazioni</Text>
                </View>

                <ScrollView className="flex-1 px-4">
                    <Text className="text-white/40 font-bold uppercase tracking-wider mb-2 ml-2">Preferenze</Text>
                    <View className="rounded-2xl overflow-hidden mb-8">
                        <SettingRow
                            icon="musical-notes"
                            label="Effetti Sonori"
                            type="switch"
                            switchValue={soundEnabled}
                            onValueChange={setSoundEnabled}
                        />
                        <SettingRow
                            icon="phone-portrait"
                            label="Vibrazione"
                            type="switch"
                            switchValue={vibrationEnabled}
                            onValueChange={setVibrationEnabled}
                        />
                    </View>

                    <Text className="text-white/40 font-bold uppercase tracking-wider mb-2 ml-2">Info</Text>
                    <View className="rounded-2xl overflow-hidden mb-8">
                        <SettingRow
                            icon="book"
                            label="Regolamento"
                            type="arrow"
                            onPress={() => {
                                setRulesSource('settings');
                                setGameStatus('rules');
                            }}
                        />
                        <SettingRow
                            icon="information-circle"
                            label="Versione"
                            value="1.0.0"
                            disabled={true}
                        />
                    </View>

                    {/* Reset History Button */}
                    <View className="mt-6 rounded-2xl overflow-hidden">
                        <SettingRow
                            icon="refresh"
                            label="Resetta Parole Usate"
                            type="arrow"
                            onPress={() => setShowResetConfirm(true)}
                        />
                    </View>
                </ScrollView>

                <ConfirmationModal
                    visible={showResetConfirm}
                    title="Conferma Reset"
                    message="Vuoi davvero cancellare la memoria delle parole usate? Così le parole già giocate potranno ricapitare."
                    confirmText="Resetta"
                    cancelText="Annulla"
                    onConfirm={() => {
                        resetUsedWords();
                        setShowResetConfirm(false);
                    }}
                    onCancel={() => setShowResetConfirm(false)}
                    variant="danger"
                    icon="trash"
                />
            </SafeAreaView>
        </View>
    );
};
