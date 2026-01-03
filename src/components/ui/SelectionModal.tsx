import React from 'react';
import { View, Text, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../../theme';
import { useGame } from '../../context/GameContext';

export type SelectionOption = {
    label: string;
    value: any;
};

type Props = {
    visible: boolean;
    title: string;
    options: SelectionOption[];
    onSelect: (value: any) => void;
    onClose: () => void;
    selectedValue?: any;
};

export const SelectionModal: React.FC<Props> = ({
    visible,
    title,
    options,
    selectedValue,
    onSelect,
    onClose
}) => {
    const { vibrationEnabled } = useGame(); // Destructured vibrationEnabled from useGame
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/60">
                <BlurView intensity={20} tint="dark" className="absolute inset-0" />

                <View className="w-[85%] max-h-[70%] bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <View className="flex-row justify-between items-center p-5 border-b border-white/10 bg-[#222]">
                        <Text className="text-white text-xl font-bold">{title}</Text>
                        <Pressable onPress={onClose} className="bg-white/10 p-1 rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </Pressable>
                    </View>

                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value}
                        contentContainerStyle={{ padding: 16 }}
                        renderItem={({ item }) => {
                            const isSelected = selectedValue === item.value;
                            return (
                                <Pressable
                                    key={item.value}
                                    onPress={() => {
                                        if (vibrationEnabled) {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                        }
                                        onSelect(item.value);
                                    }}
                                    className={`flex-row justify-between items-center p-4 border-b border-white/10 ${isSelected ? 'bg-white/5' : ''}`}
                                >
                                    <Text className={`text-lg font-bold ${isSelected ? 'text-neon-blue' : 'text-white'}`}>
                                        {item.label}
                                    </Text>
                                    {isSelected && <Ionicons name="checkmark-circle" size={24} color={COLORS.neonBlue} />}
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};
