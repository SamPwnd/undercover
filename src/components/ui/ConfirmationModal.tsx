import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    variant?: 'danger' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    visible,
    title,
    message,
    confirmText = 'Conferma',
    cancelText = 'Annulla',
    onConfirm,
    onCancel,
    icon = 'alert-circle',
    variant = 'danger'
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/80 p-4">
                <BlurView intensity={20} tint="dark" className="absolute inset-0" />

                <View className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-6 items-center">
                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-500/20' : 'bg-neon-blue/20'}`}>
                        <Ionicons
                            name={icon}
                            size={32}
                            color={variant === 'danger' ? COLORS.hotPink : COLORS.neonBlue}
                        />
                    </View>

                    <Text className="text-white text-2xl font-bold text-center mb-2">
                        {title}
                    </Text>

                    <Text className="text-white/60 text-center text-lg mb-8 leading-6">
                        {message}
                    </Text>

                    <View className="flex-row gap-3 w-full">
                        <Pressable
                            onPress={onCancel}
                            className="flex-1 py-4 rounded-xl bg-surface border border-white/10 items-center active:bg-white/5"
                        >
                            <Text className="text-white font-bold">{cancelText}</Text>
                        </Pressable>

                        <Pressable
                            onPress={onConfirm}
                            className={`flex-1 py-4 rounded-xl items-center shadow-lg ${variant === 'danger' ? 'bg-red-500 shadow-red-500/30' : 'bg-neon-blue shadow-neon-blue/30'}`}
                        >
                            <Text className="text-white font-bold uppercase tracking-wider">
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
