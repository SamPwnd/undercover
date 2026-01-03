import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme';

interface HomeHeroProps {
    // No props needed after removing buttons
}

export const HomeHero: React.FC<HomeHeroProps> = () => {
    React.useEffect(() => {
        console.log('HomeHero mounted');
    }, []);

    return (
        <View className="mb-6 pt-12 relative overflow-hidden rounded-b-3xl">
            {/* Background Gradient */}
            <LinearGradient
                colors={[COLORS.deepPurple, COLORS.background]}
                className="absolute inset-0"
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            {/* Decorative Blobs */}
            <View className="absolute -top-20 -left-20 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl" />
            <View className="absolute top-0 right-0 w-48 h-48 bg-hot-pink/10 rounded-full blur-3xl" />

            {/* Content Container */}
            <View className="pt-4 pb-8 px-4">
                {/* Main Titles */}
                <View className="items-center justify-center py-4">
                    <Text className="text-5xl font-extrabold text-white tracking-[-2px] shadow-lg shadow-neon-blue/50">
                        MIMIC
                    </Text>
                    <Text className="text-xl text-white/60 font-medium tracking-[3px] mt-2 uppercase">
                        Trova l'Impostore
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default HomeHero;
