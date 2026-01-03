export type Category = 
  | 'Animals' | 'Places' | 'Objects' | 'Food' | 'Jobs' | 'Sports' | 'Nature' | 'Clothing'
  | 'Anime' | 'BodyHealth' | 'Fantasy' | 'MoviesTV' | 'Games' | 'Brands' | 'FictionalChars'
  | 'Celebrities' | 'Technology' | 'AdultsOnly';

export const DICTIONARY: Record<Category, string[]> = {
    Animals: [
        'Leone', 'Elefante', 'Giraffa', 'Canguro', 'Tigre', 'Zebra', 'Gorilla', 'Panda', 
        'Lupo', 'Orso', 'Cane', 'Gatto', 'Cavallo', 'Mucca', 'Maiale', 'Coniglio', 
        'Topo', 'Scoiattolo', 'Volpe', 'Cervo', 'Ippopotamo', 'Rinoceronte',
        'Pinguino', 'Gufo', 'Aquila', 'Pappagallo', 'Polpo', 'Delfino', 'Squalo', 
        'Serpente', 'Coccodrillo', 'Ragno', 'Ape', 'Farfalla', 'Formica', 'Zanzara',
        // Nuove aggiunte
        'Bradipo', 'Ornitorinco', 'Koala', 'Cammello', 'Lama', 'Procione', 'Castoro',
        'Riccio', 'Pipistrello', 'Iena', 'Ghepardo', 'Leopardo', 'Scorpione', 'Medusa',
        'Stella Marina', 'Balena', 'Orca', 'Foca', 'Tricheco', 'Lontra', 'Camaleonte',
        'Iguana', 'Tartaruga', 'Rana', 'Rospo', 'Salamandra', 'Struzzo', 'Pavone',
        'Tacchino', 'Oca', 'Cigno', 'Avvoltoio', 'Falco', 'Libellula', 'Cavalletta'
    ],
    Places: [
        'Parigi', 'New York', 'Tokyo', 'Roma', 'Londra', 'Venezia', 'Scuola', 'Ospedale', 
        'Aeroporto', 'Stazione', 'Cinema', 'Palestra', 'Biblioteca', 'Museo', 'Banca', 
        'Ristorante', 'Supermercato', 'Hotel', 'Bar', 'Discoteca', 'Pizzeria', 'Zoo', 
        'Spiaggia', 'Parco', 'Bosco', 'Montagna', 'Grotta', 'Isola', 'Fattoria', 'Bagno Pubblico',
        // Nuove aggiunte
        'Cimitero', 'Prigione', 'Casinò', 'Circo', 'Stadio', 'Teatro', 'Università',
        'Farmacia', 'Panetteria', 'Macelleria', 'Benzinaio', 'Autolavaggio', 'Parcheggio',
        'Ponte', 'Galleria', 'Porto', 'Faro', 'Grattacielo', 'Castello', 'Torre Eiffel',
        'Colosseo', 'Muraglia Cinese', 'Piramidi', 'Polo Nord', 'Deserto', 'Giungla',
        'Vulcano', 'Spazio', 'Luna', 'Marte', 'Inferno', 'Paradiso', 'Sauna', 'Piscina'
    ],
    Objects: [
        'Sedia', 'Tavolo', 'Divano', 'Letto', 'Armadio', 'Lampada', 'Specchio', 'Orologio',
        'Ombrello', 'Zaino', 'Chiave', 'Portafoglio', 'Occhiali', 'Libro', 'Penna', 'Forbici',
        'Coltello', 'Bicchiere', 'Pentola', 'Chitarra', 'Pianoforte', 'Valigia', 'Cestino',
        // Nuove aggiunte
        'Tappeto', 'Cuscino', 'Coperta', 'Asciugamano', 'Sapone', 'Shampoo', 'Spazzolino',
        'Dentifricio', 'Carta Igienica', 'Pettine', 'Phon', 'Rasoio', 'Lavatrice', 'Frigorifero',
        'Forno', 'Microonde', 'Tostapane', 'Frullatore', 'Aspirapolvere', 'Ferro da stiro',
        'Martello', 'Cacciavite', 'Trapano', 'Sega', 'Chiodo', 'Vite', 'Luchetto',
        'Candela', 'Accendino', 'Posacenere', 'Vaso', 'Quadro', 'Statua', 'Bandiera'
    ],
    Food: [
        'Pizza', 'Sushi', 'Hamburger', 'Pasta', 'Bistecca', 'Pollo', 'Pesce', 'Riso', 'Insalata',
        'Gelato', 'Cioccolato', 'Torta', 'Biscotto', 'Patatine', 'Popcorn', 'Ciambella', 'Cornetto',
        'Mela', 'Banana', 'Fragola', 'Anguria', 'Limone', 'Formaggio', 'Uovo', 'Pane', 'Caffè', 'Vino',
        // Nuove aggiunte
        'Birra', 'Acqua', 'Succo', 'Arancia', 'Pera', 'Uva', 'Ciegia', 'Ananas', 'Melone',
        'Kiwi', 'Pesca', 'Albicocca', 'Pomodoro', 'Carota', 'Patata', 'Cipolla', 'Aglio',
        'Peperone', 'Melanzana', 'Zucchina', 'Fungo', 'Olive', 'Maionese', 'Ketchup',
        'Senape', 'Aceto', 'Olio', 'Sale', 'Pepe', 'Zucchero', 'Miele', 'Marmellata',
        'Nutella', 'Yogurt', 'Burro', 'Pancetta', 'Salsiccia', 'Prosciutto', 'Salame',
        'Lasagna', 'Ravioli', 'Tortellini', 'Gnocchi', 'Risotto', 'Kebab', 'Tacos'
    ],
    Jobs: [
        'Medico', 'Poliziotto', 'Insegnante', 'Pompiere', 'Avvocato', 'Giudice', 'Cuoco', 
        'Cameriere', 'Barbiere', 'Idraulico', 'Elettricista', 'Muratore', 'Architetto', 
        'Astronauta', 'Pilota', 'Contadino', 'Attore', 'Cantante', 'Influencer', 'Youtuber',
        // Nuove aggiunte
        'Dentista', 'Farmacista', 'Infermiere', 'Veterinario', 'Psicologo', 'Scienziato',
        'Soldato', 'Spia', 'Detective', 'Guardia', 'Ladro', 'Assassino', 'Politico',
        'Sindaco', 'Re', 'Regina', 'Papa', 'Suora', 'Prete', 'Monaco', 'Mago',
        'Clown', 'Ballerino', 'Pittore', 'Scultore', 'Scrittore', 'Giornalista',
        'Fotografo', 'Regista', 'DJ', 'Modella', 'Sarto', 'Calzolaio', 'Fabbro',
        'Falegname', 'Giardiniere', 'Bagnino', 'Hostess', 'Camionista', 'Taxista'
    ],
    Sports: [
        'Calcio', 'Basket', 'Pallavolo', 'Tennis', 'Nuoto', 'Ciclismo', 'Corsa', 'Golf', 
        'Boxe', 'Rugby', 'Sci', 'Snowboard', 'Pattinaggio', 'Danza', 'Ginnastica', 
        'Scherma', 'Judo', 'Karate', 'Formula 1', 'MotoGP', 'Surf', 'Bowling', 'Padel', 'Crossfit',
        // Nuove aggiunte
        'Atletica', 'Maratona', 'Salto in alto', 'Tuffi', 'Pallanuoto', 'Canottaggio', 'Vela',
        'Baseball', 'Cricket', 'Hockey', 'Badminton', 'Ping Pong', 'Squash', 'Arrampicata',
        'Alpinismo', 'Trekking', 'Paracadutismo', 'Bungee Jumping', 'Skateboard', 'Pattinaggio a rotelle',
        'Equitazione', 'Ippica', 'Polo', 'Freccette', 'Biliardo', 'Scacchi', 'eSports',
        'Wrestling', 'Sumo', 'Taekwondo', 'Kickboxing', 'MMA', 'Yoga', 'Pilates'
    ],
    Nature: [
        'Sole', 'Luna', 'Stella', 'Nuvola', 'Pioggia', 'Neve', 'Grandine', 'Vento', 'Fulmine', 
        'Arcobaleno', 'Fuoco', 'Acqua', 'Terra', 'Sabbia', 'Albero', 'Fiore', 'Rosa', 'Erba', 
        'Fiume', 'Lago', 'Mare', 'Oceano', 'Cascata', 'Vulcano', 'Terremoto', 'Uragano',
        // Nuove aggiunte
        'Tornado', 'Tsunami', 'Valanga', 'Frana', 'Eclissi', 'Aurora Boreale', 'Cometa',
        'Asteroide', 'Meteora', 'Galassia', 'Universo', 'Buco Nero', 'Pianeta', 'Cielo',
        'Tramonto', 'Alba', 'Notte', 'Giorno', 'Estate', 'Inverno', 'Autunno', 'Primavera',
        'Ghiaccio', 'Nebbia', 'Rugiada', 'Fango', 'Polvere', 'Roccia', 'Pietra', 'Sasso',
        'Diamante', 'Oro', 'Argento', 'Foresta', 'Giungla', 'Savana', 'Tundra'
    ],
    Clothing: [
        'Maglietta', 'Pantaloni', 'Jeans', 'Gonna', 'Vestito', 'Camicia', 'Felpa', 'Giacca', 
        'Cappotto', 'Sciarpa', 'Guanti', 'Cappello', 'Scarpe', 'Stivali', 'Tacchi a spillo', 
        'Sandali', 'Ciabatte', 'Calzini', 'Mutande', 'Reggiseno', 'Cravatta', 'Cintura', 'Bikini',
        // Nuove aggiunte
        'Costume da bagno', 'Accappatoio', 'Pigiama', 'Camicia da notte', 'Pantofole',
        'Infradito', 'Sneakers', 'Mocassini', 'Papillon', 'Bretelle', 'Gilet', 'Cardigan',
        'Maglione', 'Dolcevita', 'Tuta', 'Leggings', 'Collant', 'Calze a rete', 'Body',
        'Corsetto', 'Kimono', 'Sari', 'Turbante', 'Velo', 'Berretto', 'Cappuccio',
        'Occhiali da sole', 'Orologio', 'Braccialetto', 'Collana', 'Orecchini', 'Anello', 'Borsa'
    ],
    Anime: [
        'Dragon Ball', 'Naruto', 'One Piece', 'Pokemon', 'L\'Attacco dei Giganti', 'Death Note',
        'Sailor Moon', 'Demon Slayer', 'Evangelion', 'My Hero Academia', 'Goku', 'Pikachu',
        'Vegeta', 'Luffy', 'Manga', 'Cosplay', 'Otaku', 'Doraemon', 'Holly e Benji', 'Totoro',
        // Nuove aggiunte
        'One Punch Man', 'Jojo', 'Fullmetal Alchemist', 'Hunter x Hunter', 'Bleach',
        'Fairy Tail', 'Sword Art Online', 'Tokyo Ghoul', 'Jujutsu Kaisen', 'Chainsaw Man',
        'Studio Ghibli', 'La Città Incantata', 'Il Castello Errante di Howl', 'Akira',
        'Ghost in the Shell', 'Cowboy Bebop', 'Gundam', 'Digimon', 'Yu-Gi-Oh',
        'BeyBlade', 'Mila e Shiro', 'Lupin III', 'Detective Conan', 'Inuyasha',
        'Ken il Guerriero', 'Cavalieri dello Zodiaco', 'Waifu', 'Senpai'
    ],
    BodyHealth: [
        'Cuore', 'Cervello', 'Stomaco', 'Polmoni', 'Occhio', 'Orecchio', 'Naso', 'Bocca', 
        'Dente', 'Lingua', 'Mano', 'Piede', 'Gamba', 'Braccio', 'Schiena', 'Sedere', 
        'Sangue', 'Febbre', 'Raffreddore', 'Tosse', 'Vitamina', 'Ospedale', 'Dottore', 'DNA',
        // Nuove aggiunte
        'Fegato', 'Rene', 'Intestino', 'Pelle', 'Capelli', 'Unghia', 'Osso', 'Muscolo',
        'Scheletro', 'Cranio', 'Gola', 'Collo', 'Spalla', 'Gomito', 'Polso', 'Dito',
        'Ginocchio', 'Caviglia', 'Tallone', 'Ombelico', 'Seno', 'Costola', 'Vena',
        'Arteria', 'Virus', 'Batterio', 'Influenza', 'Mal di testa', 'Mal di pancia',
        'Ferita', 'Cicatrice', 'Livido', 'Gesso', 'Sedia a rotelle', 'Stampelle',
        'Medicinale', 'Pillola', 'Vaccino', 'Cerotto', 'Benda'
    ],
    Fantasy: [
        'Drago', 'Mago', 'Strega', 'Elfo', 'Orco', 'Nano', 'Fantasma', 'Vampiro', 'Licantropo',
        'Zombie', 'Sirena', 'Unicorno', 'Fata', 'Pozione', 'Bacchetta Magica', 'Castello',
        'Spada', 'Incantesimo', 'Alieno', 'Mostro', 'Scheletro', 'Tesoro',
        // Nuove aggiunte
        'Goblin', 'Troll', 'Gigante', 'Ciclope', 'Minotauro', 'Centauro', 'Pegaso',
        'Fenice', 'Grifone', 'Idra', 'Cerbero', 'Medusa', 'Kraken', 'Mummia',
        'Spirito', 'Demone', 'Angelo', 'Diavolo', 'Dio', 'Dea', 'Semidio',
        'Eroe', 'Principessa', 'Principe', 'Re Stregone', 'Negromante', 'Druido',
        'Alchimista', 'Grimorio', 'Sfera di Cristallo', 'Tappeto Volante', 'Lampada Magica',
        'Dungeon', 'Labirinto', 'Portale', 'Runa', 'Amuleto', 'Anello Magico'
    ],
    MoviesTV: [
        'Harry Potter', 'Star Wars', 'Il Signore degli Anelli', 'Titanic', 'Il Padrino', 'Avatar',
        'Avengers', 'Batman', 'Spiderman', 'Joker', 'Game of Thrones', 'Stranger Things',
        'Squid Game', 'La Casa di Carta', 'Friends', 'I Simpson', 'Netflix', 'Cinema', 'Oscar', 'Regista',
        // Nuove aggiunte
        'Breaking Bad', 'The Walking Dead', 'Black Mirror', 'Peaky Blinders', 'The Crown',
        'Grey\'s Anatomy', 'Doctor House', 'Lost', 'X-Files', 'Twin Peaks', 'Buffy',
        'How I Met Your Mother', 'The Big Bang Theory', 'The Office', 'Modern Family',
        'Griffin', 'Futurama', 'South Park', 'Rick and Morty', 'Disney', 'Pixar', 'Marvel', 'DC',
        'Film Horror', 'Film d\'Azione', 'Commedia', 'Documentario', 'Cartone Animato',
        'Attore Protagonista', 'Comparsa', 'Stuntman', 'Effetti Speciali', 'Popcorn', 'Biglietto'
    ],
    Games: [
        'Super Mario', 'Minecraft', 'Fortnite', 'GTA', 'Call of Duty', 'FIFA', 'League of Legends',
        'Zelda', 'PlayStation', 'Xbox', 'Nintendo', 'Joystick', 'Game Over', 'Scacchi', 'Monopoli',
        'Poker', 'Carte', 'Dadi', 'Domino', 'Risiko', 'Nascondino',
        // Nuove aggiunte
        'Among Us', 'Clash Royale', 'Brawl Stars', 'Candy Crush', 'Tetris', 'Pac-Man',
        'Sonic', 'Donkey Kong', 'Crash Bandicoot', 'Spyro', 'Tomb Raider', 'Assassin\'s Creed',
        'God of War', 'Halo', 'The Sims', 'Animal Crossing', 'Red Dead Redemption',
        'Cyberpunk', 'Elden Ring', 'Dark Souls', 'Wii Sports', 'Just Dance', 'Guitar Hero',
        'Dama', 'Tombola', 'Uno', 'Battaglia Navale', 'Puzzle', 'Indovinello',
        'Gioco di Ruolo', 'Dungeons & Dragons', 'Escape Room', 'Paintball', 'Laser Tag'
    ],
    Brands: [
        'Apple', 'Samsung', 'Nike', 'Adidas', 'Coca Cola', 'McDonald\'s', 'Amazon', 'Google',
        'Facebook', 'Instagram', 'TikTok', 'Tesla', 'Ferrari', 'Fiat', 'Lamborghini', 'Mercedes',
        'Gucci', 'Louis Vuitton', 'Rolex', 'Ikea', 'Disney', 'Netflix', 'PlayStation', 'Lego',
        // Nuove aggiunte
        'Microsoft', 'Sony', 'Nintendo', 'Spotify', 'YouTube', 'Twitter', 'X', 'WhatsApp',
        'Telegram', 'Snapchat', 'Uber', 'Airbnb', 'Booking', 'TripAdvisor', 'Ryanair', 'EasyJet',
        'Starbucks', 'Burger King', 'KFC', 'Subway', 'Domino\'s', 'Nutella', 'Kinder', 'Ferrero',
        'Barilla', 'Nestlé', 'Red Bull', 'Pepsi', 'Sprite', 'Heineken', 'Corona',
        'Zara', 'H&M', 'Prada', 'Versace', 'Armani', 'Dolce & Gabbana', 'Chanel', 'Dior',
        'Ford', 'Toyota', 'BMW', 'Audi', 'Volkswagen', 'Porsche', 'Jeep', 'Vespa'
    ],
    FictionalChars: [
        'Topolino', 'Paperino', 'Babbo Natale', 'Cenerentola', 'Biancaneve', 'Pinocchio',
        'Sherlock Holmes', 'James Bond', 'Dracula', 'Frankenstein', 'Tarzan', 'Zorro',
        'Super Mario', 'Sonic', 'Barbie', 'Homer Simpson', 'Darth Vader', 'Joker', 'Thanos',
        // Nuove aggiunte
        'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Wonder Woman', 'Superman',
        'Aquaman', 'Flash', 'Wolverine', 'Deadpool', 'Gandalf', 'Frodo', 'Gollum', 'Aragorn',
        'Legolas', 'Harry Potter', 'Hermione', 'Ron Weasley', 'Voldemort', 'Silente',
        'Luke Skywalker', 'Yoda', 'Obi-Wan Kenobi', 'Han Solo', 'Chewbacca', 'Jack Sparrow',
        'Willy Wonka', 'Forrest Gump', 'Rocky Balboa', 'Terminator', 'Rambo', 'Indiana Jones',
        'Pippi Calzelunghe', 'Peter Pan', 'Capitan Uncino', 'Alice nel Paese delle Meraviglie'
    ],
    Celebrities: [
        'Cristiano Ronaldo', 'Messi', 'Maradona', 'Pelé', 'Michael Jordan', 'LeBron James',
        'Donald Trump', 'Barack Obama', 'Regina Elisabetta', 'Papa Francesco', 'Elon Musk',
        'Mark Zuckerberg', 'Chiara Ferragni', 'Fedez', 'Michael Jackson', 'Freddie Mercury',
        'Marilyn Monroe', 'Leonardo DiCaprio', 'Brad Pitt', 'Dante Alighieri', 'Giulio Cesare',
        // Nuove aggiunte
        'Einstein', 'Leonardo da Vinci', 'Michelangelo', 'Galileo Galilei', 'Cristoforo Colombo',
        'Napoleone', 'Hitler', 'Mussolini', 'Stalin', 'Churchill', 'Kennedy', 'Mandela',
        'Gandhi', 'Madre Teresa', 'Gesù', 'Maometto', 'Buddha', 'Shakespeare', 'Picasso',
        'Van Gogh', 'Beethoven', 'Mozart', 'Elvis Presley', 'Madonna', 'Beyoncé', 'Rihanna',
        'Shakira', 'Jennifer Lopez', 'Tom Cruise', 'Johnny Depp', 'Will Smith', 'Angelina Jolie',
        'Kim Kardashian', 'Kylie Jenner', 'Justin Bieber', 'Eminem', 'Snoop Dogg'
    ],
    Technology: [
        'Internet', 'Wi-Fi', 'Bluetooth', 'Smartphone', 'Tablet', 'Computer', 'Mouse', 'Tastiera',
        'Batteria', 'Caricabatterie', 'Intelligenza Artificiale', 'Robot', 'Drone', 'Realtà Virtuale',
        'App', 'Social Network', 'Password', 'Hacker', 'Virus', 'GPS', '5G', 'Blockchain', 'Bitcoin',
        // Nuove aggiunte
        'Server', 'Cloud', 'Database', 'Algoritmo', 'Codice', 'Programmatore', 'Email', 'Spam',
        'Chat', 'Videochiamata', 'Webcam', 'Microfono', 'Schermo', 'Touchscreen', 'Pixel', 'HD',
        '4K', 'Streaming', 'Download', 'Upload', 'Link', 'Browser', 'Motore di Ricerca',
        'Chiavetta USB', 'Hard Disk', 'Scheda SD', 'Stampante', 'Scanner', 'Proiettore',
        'Smartwatch', 'Cuffie Bluetooth', 'Assistente Vocale', 'Alexa', 'Siri', 'Google Home',
        'Auto Elettrica', 'Guida Autonoma', 'Razzo', 'Satellite', 'Telescopio', 'Microscopio'
    ],
    AdultsOnly: [
        'Sesso', 'Orgasmo', 'Preservativo', 'Vibratore', 'Pornhub', 'Kamasutra', 'Nudisti',
        'Striptease', 'Lingerie', 'Manette', 'Frusta', 'Benda', 'Lubrificante', 'Viagra',
        'Sbronza', 'Ubriaco', 'Tequila', 'Vodka', 'Marijuana', 'Sigaretta', 'Canna',
        'Tradimento', 'Amante', 'Vergine', 'Milf', 'Ginecologo', 'Urologo',
        // Nuove aggiunte
        'Tinder', 'OnlyFans', 'Sexting', 'Nudes', 'Dick Pic', 'Limone', 'Pomiciare',
        'Preliminari', '69', 'Ménage à trois', 'Orgia', 'Scambisti', 'BDSM', 'Fetish',
        'Piedi', 'Lato B', 'Décolleté', 'Perizoma', 'Reggicalze', 'Autolesionismo',
        'Droga', 'Cocaina', 'Eroina', 'LSD', 'Ecstasy', 'Fungo Allucinogeno',
        'Narcos', 'Spacciatore', 'Prigione', 'Reato', 'Omicidio', 'Cadavere',
        'Hangover', 'Vomito', 'Postumi', 'Walk of Shame', 'One Night Stand', 'Friendzone',
        'Red Flag', 'Ghosting', 'Catfish', 'Sugar Daddy', 'Sugar Baby','Hentai'
    ]
};