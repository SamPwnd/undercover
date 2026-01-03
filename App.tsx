import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GameProvider, useGame } from './src/context/GameContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { PassAndPlayScreen } from './src/screens/PassAndPlayScreen';
import { GameScreen } from './src/screens/GameScreen';
import { GradientBackground } from './src/components/ui/GradientBackground';
import { StatusBar } from 'expo-status-bar';

// Main content wrapper to consume context
import { PlayerSetupScreen } from './src/screens/PlayerSetupScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { RulesScreen } from './src/screens/RulesScreen';

import { VotingScreen } from './src/screens/VotingScreen';
import { CategoriesScreen } from './src/screens/CategoriesScreen';

import { SoundProvider } from './src/context/SoundContext';

const AppContent = () => {
  const { status, setGameStatus, startPlaying } = useGame();

  return (
    <SoundProvider>
      <View className="flex-1 bg-background">
        <StatusBar style="light" />
        {status === 'setup' && <HomeScreen />}
        {status === 'categories' && <CategoriesScreen />}
        {status === 'player_config' && <PlayerSetupScreen onBack={() => setGameStatus('setup')} />}
        {status === 'revealing' && <PassAndPlayScreen onFinish={startPlaying} />}
        {status === 'playing' && <GameScreen />}
        {status === 'voting' && <VotingScreen />}
        {status === 'finished' && <GameScreen />}
        {status === 'settings' && <SettingsScreen />}
        {status === 'rules' && <RulesScreen />}
      </View>
    </SoundProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <StatusBar style="light" />
        <AppContent />
      </GameProvider>
    </SafeAreaProvider>
  );
}
