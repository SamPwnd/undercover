import React from 'react';
import { Text, Pressable, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, GRADIENTS } from '../../theme';
import { useGame } from '../../context/GameContext';
import { useSounds } from '../../context/SoundContext';

interface Props {
    title: string;
    onPress: () => void;
    onLongPress?: () => void;
    onPressOut?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    disabled?: boolean;
}

export const GameButton: React.FC<Props> = ({
    title,
    onPress,
    onLongPress,
    onPressOut,
    variant = 'primary',
    disabled = false
}) => {
    const scale = React.useRef(new Animated.Value(1)).current;
    const { vibrationEnabled } = useGame();
    const { playSound } = useSounds();

    const handlePressIn = () => {
        if (disabled) return;
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();

        playSound('click'); // Play Sound

        if (vibrationEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handlePressOut = () => {
        if (disabled) {
            if (onPressOut) onPressOut();
            return;
        }
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        if (onPressOut) onPressOut();
    };

    const getColors = () => {
        if (disabled) return ['#555', '#333'];
        if (variant === 'secondary') return [COLORS.orange, '#FF512F'];
        if (variant === 'danger') return ['#FF416C', '#FF4B2B'];
        if (variant === 'outline') return ['transparent', 'transparent'];
        return GRADIENTS.button; // Primary
    };

    const isOutline = variant === 'outline';

    return (
        <Animated.View style={{ transform: [{ scale }], width: '100%' }}>
            <Pressable
                onPress={disabled ? undefined : onPress}
                onLongPress={disabled ? undefined : onLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.container,
                    disabled && styles.disabled,
                    isOutline && styles.outlineContainer
                ]}
            >
                <LinearGradient
                    colors={getColors() as [string, string, ...string[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient, isOutline && styles.outlineGradient]}
                >
                    <Text style={[styles.text, isOutline && styles.outlineText]}>{title}</Text>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        shadowColor: COLORS.neonBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        width: '100%',
    },
    outlineContainer: {
        shadowOpacity: 0,
        elevation: 0,
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
    gradient: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineGradient: {
        // Compensate for border to match height? 
        // If normal is 16 pad. Outline has 2px border outside/inside?
        // In RN border is usually part of width/height.
        // If we want EXACT pixel match, we need to reduce padding by borderWidth.
        paddingVertical: 14,
    },
    disabled: {
        opacity: 0.6,
        shadowOpacity: 0,
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    outlineText: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 0.5, // tracking-wider
    }
});
