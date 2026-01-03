import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { COLORS } from '../theme';

export const PlayerSetupScreen = ({ onBack }: { onBack: () => void }) => {
    const { playerNames, setPlayerNames } = useGame();
    const [localNames, setLocalNames] = useState<string[]>([]);

    useEffect(() => {
        // Handle Hardware Back Press
        const backAction = () => {
            onBack();
            return true; // Stop default behavior (exit)
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [onBack]);

    useEffect(() => {
        // Initialize with context names or at least 3 empties
        if (playerNames.length > 0) {
            setLocalNames([...playerNames]);
        } else {
            setLocalNames(['', '', '']);
        }
    }, [playerNames]);

    const handleUpdateName = (text: string, index: number) => {
        const newNames = [...localNames];
        newNames[index] = text;
        setLocalNames(newNames);
    };

    const handleAddPlayer = () => {
        if (localNames.length < 20) {
            setLocalNames([...localNames, '']);
        }
    };

    const handleRemovePlayer = (index: number) => {
        if (localNames.length > 3) {
            const newNames = localNames.filter((_, i) => i !== index);
            setLocalNames(newNames);
        }
    };

    const handleSave = () => {
        // Filter out empty names or default them?
        // Let's default them if empty.
        const cleanedNames = localNames.map((name, i) => name.trim() || `Giocatore ${i + 1}`);
        setPlayerNames(cleanedNames);
        onBack();
    };

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1">
                <View className="flex-row items-center px-4 py-4 border-b border-white/10">
                    <Pressable onPress={onBack} className="bg-surface p-2 rounded-full mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-2xl font-bold text-white">Giocatori</Text>
                    <View className="flex-1" />
                    <Pressable onPress={handleSave} className="bg-neon-blue/20 p-2 rounded-full">
                        <Ionicons name="checkmark" size={24} color={COLORS.neonBlue} />
                    </Pressable>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView className="flex-1 px-4 py-4" contentContainerStyle={{ paddingBottom: 100 }}>
                        {localNames.map((name, index) => (
                            <View key={index} className="flex-row items-center mb-3">
                                <View className="w-8 h-8 rounded-full bg-surface-highlight items-center justify-center mr-3">
                                    <Text className="text-white font-bold">{index + 1}</Text>
                                </View>
                                <View className="flex-1 bg-surface rounded-xl flex-row items-center px-4 py-3">
                                    <TextInput
                                        className="flex-1 text-white text-lg font-bold"
                                        value={name}
                                        onChangeText={(text) => handleUpdateName(text, index)}
                                        placeholder={`Giocatore ${index + 1}`}
                                        placeholderTextColor="#666"
                                        autoFocus={index === localNames.length - 1 && index > 2} // Focus new ones
                                    />
                                    {localNames.length > 3 && (
                                        <Pressable
                                            onPress={() => handleRemovePlayer(index)}
                                            className="p-2 -mr-2" // Add padding and negative margin to align
                                            hitSlop={10}
                                        >
                                            <Ionicons name="close-circle" size={26} color={COLORS.hotPink} />
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        ))}

                        <Pressable
                            onPress={handleAddPlayer}
                            className="flex-row items-center justify-center bg-surface-highlight rounded-xl p-4 mt-2 border border-white/10 border-dashed"
                        >
                            <Ionicons name="add-circle" size={24} color={COLORS.neonBlue} style={{ marginRight: 8 }} />
                            <Text className="text-white font-bold text-lg">Aggiungi Giocatore</Text>
                        </Pressable>

                        <Pressable
                            onPress={handleSave}
                            className="flex-row items-center justify-center bg-neon-blue rounded-xl p-4 mt-6 mb-8 shadow-lg"
                        >
                            <Text className="text-[#121212] font-extrabold text-lg uppercase tracking-wider">Salva e Chiudi</Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};
