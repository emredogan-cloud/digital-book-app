/* ════════════════════════════════════════════════════════════════
   mythology-data.js
   Civilization metadata, ordering, and palette mappings.
   ════════════════════════════════════════════════════════════════ */

window.MYTHOLOGY = window.MYTHOLOGY || {};

window.MYTHOLOGY.civilizations = [
    {
        id: "greek",
        name: "Hellenic",
        full: "Greek Mythology",
        epoch: "c. 800 BCE",
        sigil: "Ω",
        accent: "var(--civ-greek)",
        description: "Tales of capricious gods upon Olympus and the mortal heroes who dared the abyss between order and chaos."
    },
    {
        id: "egyptian",
        name: "Kemet",
        full: "Egyptian Mythology",
        epoch: "c. 3000 BCE",
        sigil: "𓂀",
        accent: "var(--civ-egyptian)",
        description: "From the silt of the Nile, a cosmology of sun-barques, scarab-rolled mornings, and weighing of hearts in the Hall of Two Truths."
    },
    {
        id: "norse",
        name: "Norðr",
        full: "Norse Mythology",
        epoch: "c. 800 CE",
        sigil: "ᚦ",
        accent: "var(--civ-norse)",
        description: "From the cold sagas of the North: a doomed pantheon nailed to the World-Tree, awaiting the wolf at the end of all winters."
    },
    {
        id: "japanese",
        name: "Yamato",
        full: "Japanese Mythology",
        epoch: "c. 700 CE",
        sigil: "神",
        accent: "var(--civ-japanese)",
        description: "Kami in every river-stone and pine, sun-sister and storm-brother quarreling across rice fields and sea-foam."
    },
    {
        id: "hindu",
        name: "Bharatiya",
        full: "Hindu Mythology",
        epoch: "c. 1500 BCE",
        sigil: "ॐ",
        accent: "var(--civ-hindu)",
        description: "Cosmic ages without count: gods that dance worlds into being and devas that churn oceans for the nectar of deathlessness."
    },
    {
        id: "celtic",
        name: "Ériu",
        full: "Celtic Mythology",
        epoch: "c. 500 BCE",
        sigil: "☘",
        accent: "var(--civ-celtic)",
        description: "Mist-bound islands of the Otherworld, salmon of wisdom, and a boy whose battle-frenzy could cool only in three vats of water."
    },
    {
        id: "mesopotamian",
        name: "Sumer",
        full: "Mesopotamian Mythology",
        epoch: "c. 2100 BCE",
        sigil: "𒀭",
        accent: "var(--civ-mesopotamian)",
        description: "The first written stories on earth, baked into clay: kings who would not die, queens who descended past seven gates."
    },
    {
        id: "aztec",
        name: "Mēxihcah",
        full: "Aztec Mythology",
        epoch: "c. 1300 CE",
        sigil: "☼",
        accent: "var(--civ-aztec)",
        description: "Suns made and unmade, feathered serpents of dawn, and a covenant of blood that the world might not stop turning."
    },
    {
        id: "roman",
        name: "Romana",
        full: "Roman Mythology",
        epoch: "c. 700 BCE",
        sigil: "SPQR",
        accent: "var(--civ-roman)",
        description: "Wolf-suckled twins, household gods at every threshold, and an empire that translated its borrowed Greek pantheon into a state religion of duty and fortune."
    },
    {
        id: "chinese",
        name: "Zhōnghuá",
        full: "Chinese Mythology",
        epoch: "c. 1500 BCE",
        sigil: "龍",
        accent: "var(--civ-chinese)",
        description: "Five elements turning under a Jade court, rivers carved by the spear of a hero, and a stone monkey who learned the ten thousand transformations."
    },
    {
        id: "korean",
        name: "Hangug",
        full: "Korean Mythology",
        epoch: "c. 100 BCE",
        sigil: "단",
        accent: "var(--civ-korean)",
        description: "A bear who fasted in a cave to become a woman, a princess who walked into the underworld for medicine, and shamanic songs older than the dynasties that wrote them down."
    },
    {
        id: "mayan",
        name: "Maya",
        full: "Mayan Mythology",
        epoch: "c. 1500 BCE",
        sigil: "𝋠",
        accent: "var(--civ-mayan)",
        description: "Hero twins descending into Xibalba to play ball with the lords of death, gods of maize who shaped men out of dough, and the long count that measured ages by the turning of jade gears."
    },
    {
        id: "slavic",
        name: "Slovjan",
        full: "Slavic Mythology",
        epoch: "c. 600 CE",
        sigil: "⚡",
        accent: "var(--civ-slavic)",
        description: "Forest crones in chicken-legged huts, firebirds that scorch the moonlit orchard, and a thunder-god whose hammer keeps falling on the snake at the root of the world tree."
    },
    {
        id: "african",
        name: "Yorùbá · Ashanti · Nyanga",
        full: "West & Central African Mythology",
        epoch: "ancient",
        sigil: "✺",
        accent: "var(--civ-african)",
        description: "A spider who bargained the Sky-God for all the world's stories, a smith-god who beat the road open with his iron, and a hero so small his mother kept him in her belt."
    },
    {
        id: "persian",
        name: "Pārs",
        full: "Persian Mythology",
        epoch: "c. 1000 BCE",
        sigil: "𐎩",
        accent: "var(--civ-persian)",
        description: "A bird as old as memory roosting in a nest of healing leaves, a king whose cup showed all the seven climes, and a champion who killed his own son before learning his name."
    },
    {
        id: "polynesian",
        name: "Mā'ohi",
        full: "Polynesian Mythology",
        epoch: "ancient",
        sigil: "ᴥ",
        accent: "var(--civ-polynesian)",
        description: "A trickster who fished islands out of the sea on a hook of his grandmother's jaw, a goddess of fire who carries her temple in a volcano, and a long voyaging across an ocean of stars."
    },
    {
        id: "inuit",
        name: "Inuit",
        full: "Inuit Mythology",
        epoch: "ancient",
        sigil: "ᐃ",
        accent: "var(--civ-inuit)",
        description: "A young woman thrown from a kayak who became the mother of every seal, and a raven who stole the sun out of a chest in a house where there had never been a sky."
    },
    {
        id: "turkish",
        name: "Türk",
        full: "Turkic & Tengri Mythology",
        epoch: "c. 500 CE",
        sigil: "☾",
        accent: "var(--civ-turkish)",
        description: "Sky-Father Tengri above, the dark lord Erlik Han below, and a she-wolf named Asena who guided a wounded boy to the valley that became a nation."
    },
    {
        id: "arabian",
        name: "ʿArab",
        full: "Arabian Mythology",
        epoch: "pre-Islamic & medieval",
        sigil: "☪",
        accent: "var(--civ-arabian)",
        description: "Snake-queens beneath the orchards, a roc whose wing puts out the sun, and lovers gone mad in the desert, named for the night and for the moon."
    }
];

window.MYTHOLOGY.book = {
    title: "Codex Mythologica",
    subtitle: "An Illuminated Archive of the Ancient World",
    series: "Volumen Primum",
    edition: "Folio Edition · MMXXVI",
    epigraph: "“The gods are not extinguished — they have only put on the costumes of stories, and wait for new mouths to speak them again.”",
    epilogueText: "Here ends the codex, though the myths do not. Whichever god you closed the book on, they remain. Whichever hero fell, they fell only into your remembering. Carry them out into the lit world.",
};

window.MYTHOLOGY.civilizationById = function(id) {
    return window.MYTHOLOGY.civilizations.find(c => c.id === id);
};
