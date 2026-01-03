
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, Pressable, Animated, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { GameButton } from '../components/ui/GameButton';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { COLORS } from '../theme';

const { width } = Dimensions.get('window');

export const GameScreen = () => {
    const { gameDuration, setGameStatus, players, starterPlayerId, resetGame, timeLeft, setTimeLeft } = useGame();

    // Determine if we show countdown: Only if time is full (fresh start)
    const [isCountdownActive, setIsCountdownActive] = useState(timeLeft === gameDuration);
    const [countdown, setCountdown] = useState(3);

    // Standard Animations
    const countdownScale = useRef(new Animated.Value(0.5)).current;
    const countdownOpacity = useRef(new Animated.Value(0)).current;
    const timerScale = useRef(new Animated.Value(1)).current;
    const progressWidth = useRef(new Animated.Value(width)).current; // For progress bar

    // Countdown Logic
    useEffect(() => {
        if (!isCountdownActive) return;

        if (countdown > 0) {
            // Reset values
            countdownScale.setValue(0.5);
            countdownOpacity.setValue(0);

            // Animate In
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(countdownScale, {
                        toValue: 1.2,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.spring(countdownScale, {
                        toValue: 1,
                        friction: 3,
                        useNativeDriver: true,
                    })
                ]),
                Animated.timing(countdownOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();

            const timer = setTimeout(() => {
                setCountdown(c => c - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // "GO!" phase or end
            setIsCountdownActive(false);

            // Start Pulsing Timer
            Animated.loop(
                Animated.sequence([
                    Animated.timing(timerScale, {
                        toValue: 1.05,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(timerScale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    })
                ])
            ).start();
        }
    }, [countdown, isCountdownActive]);

    // Timer Logic - Decrement Context State
    useEffect(() => {
        // If unlimited, we do NOT decrement timeLeft and do not animate progress bar
        if (gameDuration === -1) return;

        if (!isCountdownActive && timeLeft > 0) {
            // Animate progress bar smoothly to the next second
            // Calculate target width for the NEXT second
            const nextTime = timeLeft - 1;
            const targetWidth = (nextTime / gameDuration) * width;

            Animated.timing(progressWidth, {
                toValue: targetWidth,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isCountdownActive, timeLeft, gameDuration]); // Added gameDuration dependency

    // Derived Visuals
    const getTimerColor = () => {
        if (gameDuration === -1) return 'white'; // Always white for unlimited

        const percentage = timeLeft / gameDuration;
        if (percentage < 0.2) return '#EF4444'; // Red-500
        if (percentage < 0.5) return '#EAB308'; // Yellow-500
        return 'white';
    };

    const formatTime = (totalSeconds: number) => {
        if (gameDuration === -1) return '∞';
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVote = () => {
        setGameStatus('voting');
    };

    const [showExitModal, setShowExitModal] = useState(false);

    const handleHomePress = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        setShowExitModal(false);
        resetGame();
    };

    const starterName = players.find(p => p.id === starterPlayerId)?.name || 'Qualcuno';

    if (isCountdownActive) {
        return (
            <View className="flex-1 bg-background justify-center items-center">
                <Animated.Text style={{
                    transform: [{ scale: timerScale }], // Re-using timerScale intentionally simple or create new
                    opacity: countdownOpacity,
                    color: '#AA2222',
                    fontSize: 120,
                    fontWeight: '800'
                }}>
                    {countdown === 0 ? 'GO!' : countdown}
                </Animated.Text>
                {countdown > 0 && (
                    <Text className="text-white text-3xl font-bold mt-10 text-center px-4">
                        Inizia <Text className="text-neon-blue">{starterName}</Text>
                    </Text>
                )}
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1 relative">

                {/* Progress Bar Top - Show ONLY if not unlimited */}
                {gameDuration !== -1 && (
                    <>
                        <View className="h-1 w-full bg-white/10 absolute top-0 z-0" />
                        <Animated.View
                            style={{
                                width: progressWidth,
                                backgroundColor: getTimerColor(),
                                height: 4,
                                position: 'absolute',
                                top: 0,
                                zIndex: 10
                            }}
                        />
                    </>
                )}

                {/* Header with Home Button */}
                <View className="flex-row justify-between items-center px-4 py-2 mt-2">
                    <Pressable onPress={handleHomePress} className="bg-surface p-2 rounded-full">
                        <Ionicons name="home" size={24} color="white" />
                    </Pressable>
                    <Text className="text-white font-bold text-lg">Partita in corso</Text>
                    <View className="w-10" />
                </View>

                <View className="flex-1 justify-center items-center">
                    {/* Timer Circle */}
                    <Animated.View
                        style={{
                            transform: [{ scale: timerScale }],
                            borderColor: getTimerColor(),
                            shadowColor: getTimerColor(),
                        }}
                        className="w-64 h-64 rounded-full border-4 items-center justify-center bg-surface mb-10 shadow-lg"
                    >
                        <Text style={{ color: getTimerColor() }} className="text-6xl font-monospaced font-bold">
                            {formatTime(timeLeft)}
                        </Text>
                        <Text className="text-white/50 text-sm mt-2 uppercase tracking-widest">Tempo Rimasto</Text>
                    </Animated.View>

                    <Text className="text-white/60 mb-2">Tocca in basso per votare</Text>
                    <Ionicons name="arrow-down" size={24} color="white" style={{ opacity: 0.5, marginBottom: 40 }} />
                </View>

                {/* Vote Button */}
                <View className="absolute bottom-10 left-4 right-4">
                    <GameButton
                        title="VAI AL VOTO"
                        onPress={handleVote}
                        variant="danger"
                    />
                </View>

                <ConfirmationModal
                    visible={showExitModal}
                    title="Torna alla Home"
                    message="Sei sicuro di voler uscire? La partita in corso verrà terminata."
                    confirmText="Esci"
                    cancelText="Annulla"
                    onConfirm={confirmExit}
                    onCancel={() => setShowExitModal(false)}
                    variant="danger"
                />
            </SafeAreaView>
        </View>
    );
};
