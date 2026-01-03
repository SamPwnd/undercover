import React from 'react';
import { View, Text, Pressable, ScrollView, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { COLORS } from '../theme';

export const RulesScreen = () => {
    const { setGameStatus, rulesSource } = useGame();

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                setGameStatus(rulesSource);
                return true;
            }
        );
        return () => backHandler.remove();
    }, [rulesSource]);

    return (
        <View className="flex-1 bg-background">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4 mb-2 border-b border-white/10">
                    <Pressable
                        onPress={() => setGameStatus(rulesSource)}
                        className="bg-surface p-2 rounded-full mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-white text-2xl font-bold">Regolamento</Text>
                </View>

                <ScrollView className="flex-1 px-4 py-4">
                    {/* Intro */}
                    <Text className="text-white/80 text-lg mb-8 leading-6">
                        In <Text className="font-bold text-neon-blue">Mimic: Trova l'Impostore</Text>, l'obiettivo è scoprire l'identità degli altri giocatori (e la propria!) descrivendo una Parola Segreta.
                    </Text>

                    {/* Roles */}
                    <Text className="text-white/40 font-bold uppercase tracking-wider mb-4 ml-1">I Ruoli</Text>

                    <View className="bg-surface rounded-2xl p-4 mb-4 border-l-4 border-neon-blue">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="people" size={24} color={COLORS.neonBlue} style={{ marginRight: 10 }} />
                            <Text className="text-white font-bold text-xl">Civile</Text>
                        </View>
                        <Text className="text-white/70 leading-5">
                            Riceve la Parola Segreta corretta. Deve descriverla in modo abbastanza chiaro da farsi riconoscere dagli altri Civili, ma abbastanza criptico da non regalarla all'Impostore.
                        </Text>
                    </View>

                    <View className="bg-surface rounded-2xl p-4 mb-8 border-l-4 border-hot-pink">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="skull" size={24} color={COLORS.hotPink} style={{ marginRight: 10 }} />
                            <Text className="text-white font-bold text-xl">Impostore</Text>
                        </View>
                        <Text className="text-white/70 leading-5">
                            Non conosce la Parola Segreta. Deve ascoltare la descrizione degli altri per capire quale potrebbe essere, bluffare e non farsi scoprire.
                        </Text>
                    </View>

                    {/* Gameplay */}
                    <Text className="text-white/40 font-bold uppercase tracking-wider mb-4 ml-1">Svolgimento</Text>

                    <View className="mb-8 gap-y-4">
                        <View className="flex-row">
                            <Text className="text-neon-blue font-bold text-xl mr-4">1.</Text>
                            <Text className="text-white/80 text-base flex-1">
                                Ogni giocatore riceve segretamente il proprio ruolo e (se è Civile) la Parola Segreta.
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Text className="text-neon-blue font-bold text-xl mr-4">2.</Text>
                            <Text className="text-white/80 text-base flex-1">
                                A turno, i giocatori dicono <Text className="font-bold">una sola parola</Text> o una breve frase per descrivere la propria parola segreta.
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Text className="text-neon-blue font-bold text-xl mr-4">3.</Text>
                            <Text className="text-white/80 text-base flex-1">
                                Dopo che tutti hanno parlato, si discute e si <Text className="font-bold text-hot-pink">VOTA</Text> chi eliminare.
                            </Text>
                        </View>
                    </View>

                    {/* Victory */}
                    <Text className="text-white/40 font-bold uppercase tracking-wider mb-4 ml-1">Vittoria</Text>

                    <View className="bg-surface/50 rounded-xl p-4 mb-20">
                        <Text className="text-white/80 mb-2">
                            <Text className="font-bold text-neon-blue">I Civili vincono</Text> se eliminano l'Impostore.
                        </Text>
                        <Text className="text-white/80">
                            <Text className="font-bold text-hot-pink">L'Impostore vince</Text> se rimane in gioco fino alla fine (o se rimangono solo 2 giocatori) o se dopo essere stato scoperto indovina la parola segreta.
                        </Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
