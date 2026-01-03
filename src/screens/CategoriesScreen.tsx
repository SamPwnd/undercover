import React from 'react';
import { View, Text, Pressable, ScrollView, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { COLORS } from '../theme';
import { DICTIONARY, Category } from '../data/dictionary';
import { LinearGradient } from 'expo-linear-gradient';

export const CategoriesScreen = () => {
    const { setGameStatus, enabledCategories, toggleCategory, toggleAllCategories } = useGame();

    React.useEffect(() => {
        const backAction = () => {
            setGameStatus('setup');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const allCategories = Object.keys(DICTIONARY) as Category[];

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right', 'bottom']}>
                {/* Header - Matching PlayerSetupScreen */}
                <View className="flex-row items-center px-4 py-4 border-b border-white/10 mb-4">
                    <Pressable onPress={() => setGameStatus('setup')} className="bg-surface p-2 rounded-full mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-2xl font-bold text-white">Pacchetti</Text>
                    <View className="flex-1" />
                    <Pressable onPress={() => setGameStatus('setup')} className="bg-neon-blue/20 p-2 rounded-full">
                        <Ionicons name="checkmark" size={24} color={COLORS.neonBlue} />
                    </Pressable>
                </View>

                <ScrollView className="flex-1 px-4">
                    <Text className="text-white/60 text-sm mb-6 text-center leading-5 mx-2">
                        Seleziona le categorie di parole da includere nel gioco.
                        Devi selezionarne almeno una.
                    </Text>

                    {/* Select All / Deselect All Toggle */}
                    <View className="flex-row justify-end mb-4 px-2">
                        <Pressable
                            onPress={() => {
                                const areAllSelected = allCategories.length === enabledCategories.length;
                                toggleAllCategories(!areAllSelected);
                            }}
                            className="flex-row items-center space-x-2"
                        >
                            <Text className="text-neon-blue font-bold uppercase tracking-wider text-sm">
                                {allCategories.length === enabledCategories.length ? "Deseleziona tutto" : "Seleziona tutto"}
                            </Text>
                            <Ionicons
                                name={allCategories.length === enabledCategories.length ? "close-circle-outline" : "checkmark-circle-outline"}
                                size={20}
                                color={COLORS.neonBlue}
                            />
                        </Pressable>
                    </View>

                    <View className="flex-row flex-wrap justify-between pb-8">
                        {allCategories.map((cat) => {
                            const isEnabled = enabledCategories.includes(cat);

                            // Simple icon mapping
                            // Icon mapping
                            const icons: Record<Category, keyof typeof Ionicons.glyphMap> = {
                                Animals: 'paw',
                                Places: 'map',
                                Objects: 'cube',
                                Food: 'fast-food',
                                Jobs: 'briefcase',
                                Sports: 'football',
                                Nature: 'leaf',
                                Clothing: 'shirt',
                                Anime: 'star',
                                BodyHealth: 'fitness',
                                Fantasy: 'color-wand',
                                MoviesTV: 'videocam',
                                Games: 'game-controller',
                                Brands: 'pricetag',
                                FictionalChars: 'person',
                                Celebrities: 'mic',
                                Technology: 'hardware-chip',
                                AdultsOnly: 'flame',
                            };

                            const iconName = icons[cat] || 'albums';

                            // Valid Italian translations
                            const translations: Record<Category, string> = {
                                Animals: 'Animali',
                                Places: 'Luoghi',
                                Objects: 'Oggetti',
                                Food: 'Cibo',
                                Jobs: 'Mestieri',
                                Sports: 'Sport',
                                Nature: 'Natura',
                                Clothing: 'Abbigliamento',
                                Anime: 'Anime & Manga',
                                BodyHealth: 'Corpo Umano',
                                Fantasy: 'Fantasy',
                                MoviesTV: 'Film & TV',
                                Games: 'Videogiochi',
                                Brands: 'Marche',
                                FictionalChars: 'Personaggi',
                                Celebrities: 'Celebrità',
                                Technology: 'Tecnologia',
                                AdultsOnly: 'Adulti',
                            };

                            return (
                                <Pressable
                                    key={cat}
                                    onPress={() => toggleCategory(cat)}
                                    className={`w-[48%] aspect-square mb-4 rounded-3xl overflow-hidden border-2 transition-all ${isEnabled
                                        ? 'border-neon-blue shadow-lg shadow-neon-blue/20'
                                        : 'border-white/5'
                                        }`}
                                >
                                    <LinearGradient
                                        colors={isEnabled ? [COLORS.surface, '#1a1a2e'] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        {/* Icon Container with bg-transparent FIXED */}
                                        <View className="p-4 rounded-full mb-3 bg-transparent">
                                            <Ionicons
                                                name={iconName}
                                                size={32}
                                                color={isEnabled ? COLORS.neonBlue : 'rgba(255,255,255,0.2)'}
                                            />
                                        </View>
                                        <Text className={`font-bold text-lg tracking-wide text-center px-1 ${isEnabled ? 'text-white' : 'text-white/30'}`} numberOfLines={1} adjustsFontSizeToFit>
                                            {translations[cat] || cat}
                                        </Text>

                                        {/* Selection Indicator */}
                                        {isEnabled && (
                                            <View className="absolute top-3 right-3">
                                                <Ionicons name="checkmark-circle" size={20} color={COLORS.neonBlue} />
                                            </View>
                                        )}
                                    </LinearGradient>
                                </Pressable>
                            );
                        })}
                    </View>

                    {/* Save Button */}
                    <Pressable
                        onPress={() => setGameStatus('setup')}
                        className="flex-row items-center justify-center bg-neon-blue rounded-xl p-4 mt-2 mb-8 shadow-lg"
                    >
                        <Text className="text-[#121212] font-extrabold text-lg uppercase tracking-wider">Salva e Chiudi</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
