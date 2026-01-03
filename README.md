# 🎭 Mimic: Trova l'Impostore

**Mimic** è un party game locale (Pass & Play) ispirato a classici come *Undercover*. L'obiettivo è scoprire chi tra i giocatori è l'impostore, e per l'impostore, indovinare la parola segreta o passare inosservato.

Costruito con **React Native**, **Expo** e **NativeWind**.

---

## ✨ Funzionalità

*   **🕵️ Modalità Pass & Play**: Gioca con 3-20 persone su un unico dispositivo.
*   **📦 Pacchetti Tematici**: Tantissime categorie tra cui Animali, Mestieri, Luoghi, Film, e Sport.
*   **🎲 Ruoli Multipli**:
    *   **Civili**: Conoscono la parola segreta.
    *   **Impostori**: Ricevono una parola simile ma diversa (o nessuna, a seconda della variante).
    *   **Mr. White**: Non ha nessuna parola e deve improvvisare (Non ancora implementato).
*   **🧠 Memoria Storica**: Il gioco ricorda le parole usate per evitare ripetizioni (con reset manuale o automatico al termine delle parole).
*   **🔊 Effetti Sonori**: Feedback audio per interazioni e fasi di gioco (Non ancora implementato).
*   **🎨 Design Moderno**: Interfaccia scura, gradienti al neon e animazioni fluide.
*   **🇮🇹 Completamente in Italiano**.

## 🛠️ Tecnologie

*   **Framework**: [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
*   **Styling**: [NativeWind (Tailwind CSS)](https://www.nativewind.dev/)
*   **State Management**: React Context API
*   **Navigation**: React Navigation (Stack)
*   **Icons**: Ionicons (@expo/vector-icons)
*   **Audio**: Expo AV
*   **Storage**: Async Storage (per le preferenze e la storia delle parole)


## 📂 Struttura del Progetto

```
src/
├── components/   # Componenti UI riutilizzabili (Button, Card, Hero...)
├── context/      # GameContext e SoundContext per lo stato globale
├── data/         # Dizionario delle parole e categorie
├── hooks/        # Custom hooks (e.g., useSounds)
├── screens/      # Schermate principali (Home, Setup, Game, Voting...)
└── theme/        # Costanti di stile e colori
assets/
└── sounds/       # File audio (mp3)
```

## 📝 Come Giocare

1.  Seleziona il numero di giocatori e imposta quanti Impostori/Mr. White vuoi.
2.  Scegli i **Pacchetti** di parole che preferisci.
3.  Passa il telefono a ogni giocatore per rivelare il proprio ruolo segreto.
4.  A turno, ogni giocatore dice una parola o una breve frase descrittiva.
5.  Dopo il giro di discussione, si **Vota** per eliminare il sospetto impostore.
6.  Il gioco continua finché tutti gli impostori sono eliminati o rimangono troppi pochi civili!

---

Sviluppato con ❤️ per serate tra amici.
