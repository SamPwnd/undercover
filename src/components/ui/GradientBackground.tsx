import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { COLORS, GRADIENTS } from '../../theme';

const { width, height } = Dimensions.get('window');

interface Props {
    children: React.ReactNode;
}

export const GradientBackground: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {/* Base Dark Gradient */}
            <LinearGradient
                colors={[COLORS.deepPurple, '#000000', '#000000']}
                locations={[0, 0.6, 1]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            {/* Ambient Blobs */}
            <View style={[styles.blob, styles.blob1]}>
                <LinearGradient
                    colors={GRADIENTS.blob1}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            <View style={[styles.blob, styles.blob2]}>
                <LinearGradient
                    colors={[COLORS.neonBlue, 'transparent']}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            {/* Bottom Fade to Black Overlay */}
            <LinearGradient
                colors={['transparent', '#000000']}
                style={[StyleSheet.absoluteFillObject, { top: '20%' }]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.deepPurple,
    },
    content: {
        flex: 1,
        zIndex: 10,
    },
    blob: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.6,
    },
    blob1: {
        width: width * 0.8,
        height: width * 0.8,
        top: -width * 0.2,
        left: -width * 0.2,
        transform: [{ scale: 1.2 }],
        filter: 'blur(40px)', // Note: blur filter might not work deeply in RN without special setup, using opacity and gradient for now. 
        // Emulating blur with opacity often works okay for ambient background. 
        // Ideally expo-blur over it or using an image.
    },
    blob2: {
        width: width * 1,
        height: width * 1,
        bottom: -width * 0.3,
        right: -width * 0.3,
        opacity: 0.4,
    },
});
