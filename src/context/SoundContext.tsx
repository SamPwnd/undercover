import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useGame } from './GameContext';

type SoundType = 'click' | 'reveal' | 'notification' | 'win' | 'lose' | 'timer';

// MAPPA AI FILE: Decommenta e aggiungi i file in assets/sounds/
const SOUND_FILES: Record<SoundType, any> = {
    // click: require('../../assets/sounds/click.mp3'),
    // reveal: require('../../assets/sounds/reveal.mp3'),
    // notification: require('../../assets/sounds/notification.mp3'),
    // win: require('../../assets/sounds/win.mp3'),
    // lose: require('../../assets/sounds/lose.mp3'),
    // timer: require('../../assets/sounds/timer.mp3'),
    click: null,
    reveal: null,
    notification: null,
    win: null,
    lose: null,
    timer: null,
};

interface SoundContextType {
    playSound: (type: SoundType) => Promise<void>;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const { soundEnabled } = useGame();
    const [sounds, setSounds] = useState<Record<SoundType, Audio.Sound | null>>({
        click: null,
        reveal: null,
        notification: null,
        win: null,
        lose: null,
        timer: null,
    });

    useEffect(() => {
        loadSounds();
        return () => {
            // Cleanup if needed
            // unloadSounds();
        };
    }, []);

    const loadSounds = async () => {
        const loadedSounds: any = {};
        for (const [key, source] of Object.entries(SOUND_FILES)) {
            if (source) {
                try {
                    const { sound } = await Audio.Sound.createAsync(source);
                    loadedSounds[key] = sound;
                } catch (error) {
                    console.log(`[Sound] Failed to load ${key}`);
                }
            }
        }
        setSounds(prev => ({ ...prev, ...loadedSounds }));
    };

    const playSound = async (type: SoundType) => {
        if (!soundEnabled) return;
        const sound = sounds[type];
        if (sound) {
            try {
                await sound.replayAsync();
            } catch (e) {
                // ignore
            }
        } else {
            // console.log(`[Sound Mock] Playing ${type}`);
        }
    };

    return (
        <SoundContext.Provider value={{ playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSounds = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSounds must be used within a SoundProvider');
    }
    return context;
};
