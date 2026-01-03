import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../../theme';
import { useGame } from '../../context/GameContext';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    label: string;
    value?: string | number;
    type?: 'arrow' | 'switch' | 'counter';
    onPress?: () => void;
    onValueChange?: (val: boolean) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
    switchValue?: boolean;
    helperText?: string;
    disabled?: boolean;
    badge?: string;
};

export const SettingRow: React.FC<Props> = ({
    icon,
    iconColor = COLORS.neonBlue,
    label,
    value,
    type = 'arrow',
    onPress,
    onValueChange,
    onIncrement,
    onDecrement,
    switchValue = false,
    helperText,
    disabled = false,
    badge,
}) => {
    const { vibrationEnabled } = useGame();

    const handlePress = () => {
        if (disabled) return;
        if (vibrationEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        if (onPress) onPress();
    };

    return (
        <Pressable
            onPress={disabled || type !== 'arrow' ? undefined : handlePress}
            className={`flex-row items-center justify-between py-4 px-4 bg-surface mb-[1px] relative ${!disabled ? 'active:bg-surface-highlight' : ''}`}
            style={({ pressed }) => [
                pressed && !disabled && type === 'arrow' && { opacity: 0.8 },
                disabled && { opacity: 0.3, backgroundColor: 'rgba(0,0,0,0.5)' }
            ]}
        >
            {badge && (
                <View className="absolute top-0 right-0 bg-hot-pink px-2 py-1 rounded-bl-xl z-10">
                    <Text className="text-white text-[10px] font-bold uppercase tracking-wider">{badge}</Text>
                </View>
            )}

            <View className="flex-row items-center flex-1">
                <Ionicons name={icon} size={24} color={disabled ? '#555' : iconColor} style={{ marginRight: 16 }} />
                <View>
                    <Text className={`text-lg font-bold ${disabled ? 'text-white/30' : 'text-white'}`}>{label}</Text>
                    {helperText && <Text className="text-white/40 text-xs">{helperText}</Text>}
                </View>
            </View>

            <View className="flex-row items-center">
                {type === 'arrow' && (
                    <>
                        {value && <Text className="text-white/60 text-base mr-2">{value}</Text>}
                        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
                    </>
                )}

                {type === 'switch' && (
                    <Switch
                        value={switchValue}
                        onValueChange={disabled ? undefined : onValueChange}
                        trackColor={{ true: COLORS.neonBlue, false: '#333' }}
                        thumbColor={COLORS.white}
                        disabled={disabled}
                    />
                )}

                {type === 'counter' && (
                    <View className="flex-row items-center bg-surface-highlight rounded-full p-1">
                        <Pressable
                            onPress={onDecrement}
                            className="w-8 h-8 items-center justify-center bg-[#333] rounded-full active:bg-[#444]"
                        >
                            <Ionicons name="remove" size={18} color="white" />
                        </Pressable>
                        <Text className="text-white font-bold mx-4 w-6 text-center">{value}</Text>
                        <Pressable
                            onPress={onIncrement}
                            className="w-8 h-8 items-center justify-center bg-[#333] rounded-full active:bg-[#444]"
                        >
                            <Ionicons name="add" size={18} color="white" />
                        </Pressable>
                    </View>
                )}
            </View>
        </Pressable>
    );
};
