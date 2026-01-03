import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DICTIONARY, Category } from '../data/dictionary';

export type GameStatus = 'setup' | 'player_config' | 'playing' | 'revealing' | 'voting' | 'finished' | 'rules' | 'settings' | 'categories';
export type Role = 'Citizen' | 'Impostor';

export interface Player {
    id: number;
    name: string;
    role: Role;
    word?: string;
    isRevealed: boolean;
}

interface GameContextType {
    playerCount: number;
    impostorCount: number;
    players: Player[];
    playerNames: string[];
    status: GameStatus;
    secretWord: string;
    category: Category;
    gameStartTime: number | null;
    setPlayerCount: (count: number) => void;
    setImpostorCount: (count: number) => void;
    setPlayerNames: (names: string[]) => void;
    startGame: () => void;
    resetGame: () => void;
    markPlayerRevealed: (id: number) => void;
    startPlaying: () => void;
    setCategory: (category: Category) => void;
    setGameFinished: () => void;
    setGameStatus: (status: GameStatus) => void;
    gameDuration: number;
    setGameDuration: (duration: number) => void;
    starterPlayerId: number | null;
    timeLeft: number;
    setTimeLeft: (time: number) => void;
    eliminatedPlayerIds: number[];
    markPlayerEliminated: (id: number) => void;
    impostorsFound: number;
    incrementImpostorsFound: () => void;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    vibrationEnabled: boolean;
    setVibrationEnabled: (enabled: boolean) => void;
    rulesSource: 'setup' | 'settings';
    setRulesSource: (source: 'setup' | 'settings') => void;
    enabledCategories: Category[];
    toggleCategory: (category: Category) => void;
    toggleAllCategories: (shouldEnable: boolean) => void;
    resetUsedWords: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY_NAMES = '@impostor_player_names';

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [playerCount, setPlayerCount] = useState(4);
    const [impostorCount, setImpostorCount] = useState(1);
    const [playerNames, setPlayerNamesState] = useState<string[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [status, setStatus] = useState<GameStatus>('setup');
    const [secretWord, setSecretWord] = useState('');
    const [category, setCategory] = useState<Category>('Animals');
    const [gameStartTime, setGameStartTime] = useState<number | null>(null);
    const [gameDuration, setGameDuration] = useState(300); // 5 minutes default
    const [starterPlayerId, setStarterPlayerId] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(300);
    const [eliminatedPlayerIds, setEliminatedPlayerIds] = useState<number[]>([]);
    const [impostorsFound, setImpostorsFound] = useState(0);
    // Settings State
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [rulesSource, setRulesSource] = useState<'setup' | 'settings'>('settings');

    // Categories State
    const [enabledCategories, setEnabledCategories] = useState<Category[]>(Object.keys(DICTIONARY) as Category[]);
    const STORAGE_KEY_CATEGORIES = '@enabled_categories';

    // Load enabled categories
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY_CATEGORIES);
            if (stored) {
                setEnabledCategories(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load categories', e);
        }
    };

    const toggleCategory = async (cat: Category) => {
        setEnabledCategories(prev => {
            let next;
            if (prev.includes(cat)) {
                // Prevent disabling the last category
                if (prev.length <= 1) return prev;
                next = prev.filter(c => c !== cat);
            } else {
                next = [...prev, cat];
            }
            // Persist
            AsyncStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(next)).catch(e => console.error(e));
            return next;
        });
    };

    const toggleAllCategories = async (shouldEnable: boolean) => {
        let next: Category[];
        if (shouldEnable) {
            next = Object.keys(DICTIONARY) as Category[];
        } else {
            // Keep at least one category enabled (e.g., the first one) to prevent empty state issues
            // Or strictly follow user intent and rely on validation elsewhere?
            // "Salva e Chiudi" validation blocks empty, so we can allow empty transiently here?
            // User might want to deselect all to then pick just one.
            // If we block deselecting the last one, it's annoying.
            // Let's allow empty here, because the UI prevents saving empty.
            next = [];
        }
        setEnabledCategories(next);
        AsyncStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(next)).catch(e => console.error(e));
    };

    // Load names on mount
    useEffect(() => {
        loadNames();
    }, []);

    const loadNames = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY_NAMES);
            if (stored) {
                const names = JSON.parse(stored);
                setPlayerNamesState(names);
                if (names.length >= 3) {
                    setPlayerCount(names.length);
                }
            }
        } catch (e) {
            console.error('Failed to load names', e);
        }
    };

    const setPlayerNames = async (names: string[]) => {
        setPlayerNamesState(names);
        setPlayerCount(names.length);
        try {
            await AsyncStorage.setItem(STORAGE_KEY_NAMES, JSON.stringify(names));
        } catch (e) {
            console.error('Failed to save names', e);
        }
    };

    // Word History
    const [usedWords, setUsedWords] = useState<string[]>([]);
    const STORAGE_KEY_USED_WORDS = '@used_words';

    // Load used words
    useEffect(() => {
        loadUsedWords();
    }, []);

    const loadUsedWords = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY_USED_WORDS);
            if (stored) {
                setUsedWords(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load used words', e);
        }
    };

    const addToUsedWords = async (word: string) => {
        const newUsed = [...usedWords, word];
        setUsedWords(newUsed);
        try {
            await AsyncStorage.setItem(STORAGE_KEY_USED_WORDS, JSON.stringify(newUsed));
        } catch (e) {
            console.error('Failed to save used words', e);
        }
    };

    const resetUsedWords = async () => {
        setUsedWords([]);
        try {
            await AsyncStorage.setItem(STORAGE_KEY_USED_WORDS, JSON.stringify([]));
        } catch (e) {
            console.error(e);
        }
    };

    const startGame = () => {
        const categories = enabledCategories.length > 0 ? enabledCategories : (Object.keys(DICTIONARY) as Category[]);

        // 1. Collect all words from enabled categories
        let availablePool: { word: string; category: Category }[] = [];
        categories.forEach(cat => {
            DICTIONARY[cat].forEach(w => {
                availablePool.push({ word: w, category: cat });
            });
        });

        // 2. Filter out used words
        let validPool = availablePool.filter(item => !usedWords.includes(item.word));

        // 3. Silent Recycle if empty
        if (validPool.length === 0) {
            // "Silent" loop: we just ignore the history effectively for this turn, 
            // BUT we should probably clear the history so we don't hit this every time.
            // Requirement was "reset deve essere silenzioso".
            // So we clear history and use the full pool.
            resetUsedWords();
            validPool = availablePool;
        }

        // 4. Pick random
        const selection = validPool[Math.floor(Math.random() * validPool.length)];
        const word = selection.word;
        const selectedCategory = selection.category;

        // 5. Track used
        addToUsedWords(word);

        setCategory(selectedCategory);
        setSecretWord(word);
        setTimeLeft(gameDuration);
        setEliminatedPlayerIds([]);
        setImpostorsFound(0);

        let roles: Role[] = Array(playerCount).fill('Citizen');
        for (let i = 0; i < impostorCount; i++) {
            roles[i] = 'Impostor';
        }
        roles = roles.sort(() => Math.random() - 0.5);

        const newPlayers: Player[] = roles.map((role, index) => ({
            id: index + 1,
            name: playerNames[index] || `Giocatore ${index + 1} `,
            role,
            word: role === 'Citizen' ? word : undefined,
            isRevealed: false,
        }));

        setPlayers(newPlayers);

        // Pick starter player
        // Reduce probability of Impostor starting by 50%
        let potentialStarters = newPlayers;
        if (Math.random() > 0.5) {
            potentialStarters = newPlayers.filter(p => p.role === 'Citizen');
            // Fallback if everyone is impostor (impossible typically)
            if (potentialStarters.length === 0) potentialStarters = newPlayers;
        }
        const starter = potentialStarters[Math.floor(Math.random() * potentialStarters.length)];
        setStarterPlayerId(starter.id);

        setStatus('revealing');
    };

    const markPlayerRevealed = (id: number) => {
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, isRevealed: true } : p));
    };

    const startPlaying = () => {
        setStatus('playing');
        setGameStartTime(Date.now());
    };

    const endGame = () => {
        setStatus('finished');
        resetGame();
    };

    const markPlayerEliminated = (id: number) => {
        setEliminatedPlayerIds(prev => [...prev, id]);
    };

    const incrementImpostorsFound = () => {
        setImpostorsFound(prev => prev + 1);
    };

    const resetGame = () => {
        setStatus('setup');
        setPlayers([]);
        setSecretWord('');
        setGameStartTime(null);
        setStarterPlayerId(null);
        setEliminatedPlayerIds([]);
        setImpostorsFound(0);
        setTimeLeft(gameDuration);
    };

    // Also update startGame to reset these just in case (e.g. restart game)
    // inside startGame function... (we need to find the right place to inject)

    return (
        <GameContext.Provider
            value={{
                playerCount,
                impostorCount,
                players,
                playerNames,
                status,
                secretWord,
                category,
                gameStartTime,
                setPlayerCount,
                setImpostorCount,
                setPlayerNames,
                startGame,
                resetGame,
                markPlayerRevealed,
                startPlaying,
                setCategory,
                setGameFinished: endGame,
                setGameStatus: setStatus,
                gameDuration,
                setGameDuration,
                starterPlayerId,
                timeLeft,
                setTimeLeft,
                eliminatedPlayerIds,
                markPlayerEliminated,
                impostorsFound,
                incrementImpostorsFound,
                soundEnabled,
                setSoundEnabled,
                vibrationEnabled,
                setVibrationEnabled,
                rulesSource,
                setRulesSource,
                enabledCategories,
                toggleCategory,
                toggleAllCategories,
                resetUsedWords,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
