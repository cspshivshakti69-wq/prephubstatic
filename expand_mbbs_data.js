const fs = require('fs');
const path = require('path');

const QUIZZES_FILE = path.join(__dirname, 'src/data/quizzesData.js');
const VIDEOS_FILE = path.join(__dirname, 'src/data/videosData.js');
const NOTES_FILE = path.join(__dirname, 'src/data/notesData.js');
const QUESTIONS_FILE = path.join(__dirname, 'src/data/questions.js');

// --- MBBS/NEET PG Dummy Data ---

const mbbsQuizzes = [
    {
        quizId: "mbbs-anat-1",
        title: "Anatomy: Upper Limb (BD Chaurasia)",
        subject: "Anatomy",
        difficulty: "Hard",
        duration: "60 minutes",
        totalQuestions: 60,
        questions: Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1} about Upper Limb Anatomy derived from BD Chaurasia.`,
            options: { a: "Brachial Plexus", b: "Axillary Artery", c: "Radial Nerve", d: "Ulnar Nerve" },
            correctAnswer: "a",
            explanation: "The Brachial Plexus is the network of nerves supplying the upper limb.",
            author: "BD Chaurasia",
            difficulty: "Medium"
        }))
    },
    {
        quizId: "mbbs-physio-1",
        title: "Physiology: CNS (Guyton & Hall)",
        subject: "Physiology",
        difficulty: "Hard",
        duration: "60 minutes",
        totalQuestions: 60,
        questions: Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1} regarding Central Nervous System mechanisms.`,
            options: { a: "Synapse", b: "Action Potential", c: "Neurotransmitter", d: "Reflex Arc" },
            correctAnswer: "b",
            explanation: "Action potentials are rapid changes in membrane potential.",
            author: "Guyton & Hall",
            difficulty: "Hard"
        }))
    },
    {
        quizId: "neet-pg-patho-1",
        title: "NEET PG Pathology: General Pathology (Robbins)",
        subject: "Pathology",
        difficulty: "Hard",
        duration: "60 minutes",
        totalQuestions: 60,
        questions: Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1} on Inflammation and Repair (Robbins).`,
            options: { a: "Granuloma", b: "Apoptosis", c: "Necrosis", d: "Hyperplasia" },
            correctAnswer: "a",
            explanation: "Granulomatous inflammation is a distinctive pattern of chronic inflammation.",
            author: "Robbins",
            difficulty: "Hard"
        }))
    }
];

const mbbsVideos = [
    {
        id: "mbbs_v1",
        title: "General Anatomy Lectures - BD Chaurasia Line by Line",
        channel: "Asif Qureshi",
        videoId: "HcfVZzf1H3Y", // Placeholder
        thumbnail: "https://img.youtube.com/vi/HcfVZzf1H3Y/maxresdefault.jpg",
        views: "1.2M",
        rating: 4.9,
        duration: "01:00:00"
    },
    {
        id: "mbbs_v2",
        title: "Physiology One Shot: CNS",
        channel: "PW MedEd - Dr. Vivek",
        videoId: "dPEMLiey6F8",
        thumbnail: "https://img.youtube.com/vi/dPEMLiey6F8/maxresdefault.jpg",
        views: "900K",
        rating: 4.8,
        duration: "02:30:00"
    },
    {
        id: "mbbs_v3",
        title: "Biochemistry Full Course - Cycles Simplified",
        channel: "Dr. Rajesh Jambhulkar",
        videoId: "CoM_Tv9QMTM",
        thumbnail: "https://img.youtube.com/vi/CoM_Tv9QMTM/maxresdefault.jpg",
        views: "2.1M",
        rating: 4.9,
        duration: "01:45:00"
    },
    {
        id: "mbbs_v4",
        title: "Pathology of Inflammation (Robbins)",
        channel: "Dr. Devesh Mishra",
        videoId: "Y8w9g4F6z8Q",
        thumbnail: "https://img.youtube.com/vi/Y8w9g4F6z8Q/maxresdefault.jpg",
        views: "1.5M",
        rating: 4.9,
        duration: "03:00:00"
    },
    {
        id: "mbbs_v5",
        title: "Pharmacology: ANS Drugs",
        channel: "The Charsi of Medical Literature",
        videoId: "L6v3s8w8j8Q",
        thumbnail: "https://img.youtube.com/vi/L6v3s8w8j8Q/maxresdefault.jpg",
        views: "3M",
        rating: 4.8,
        duration: "00:45:00"
    },
    {
        id: "mbbs_v6",
        title: "General Medicine Fundamentals",
        channel: "Dr. Najeeb Lectures",
        videoId: "ZUrjM6slByo",
        thumbnail: "https://img.youtube.com/vi/ZUrjM6slByo/maxresdefault.jpg",
        views: "5M",
        rating: 5.0,
        duration: "04:00:00"
    }
];

const mbbsNotes = [
    {
        id: "mbbs_n1",
        title: "Anatomy Handwritten Notes (Upper Limb)",
        author: "Selfless Medic",
        description: "High yield handwritten notes for 1st Year MBBS.",
        pages: 120,
        type: "Download"
    },
    {
        id: "mbbs_n2",
        title: "Physiology Summaries (Guyton)",
        author: "Medicos PDF",
        description: "Chapter-wise summaries for rapid revision.",
        pages: 200,
        type: "Download"
    },
    {
        id: "mbbs_n3",
        title: "Pathology Color-Coded Notes",
        author: "Notespaedia",
        description: "Visual notes for General Pathology.",
        pages: 150,
        type: "Download"
    },
    {
        id: "mbbs_n4",
        title: "Pharmacology Mnemonics",
        author: "GRG",
        description: "Best mnemonics for drug classification.",
        pages: 80,
        type: "Download"
    }
];

const mbbsQuestions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    text: `MBBS University Question ${i + 1}: What is the clinical significance of structure X? (RGUHS 2023)`,
    options: { a: "Diagnosis A", b: "Diagnosis B", c: "Treatment C", d: "Prognosis D" },
    correctAnswer: "a",
    explanation: "Standard clinical reasoning based on Harrison's.",
    author: "RGUHS PYQ",
    difficulty: i % 3 === 0 ? "Hard" : "Medium"
}));


// --- helper to insert data ---

function updateFile(filePath, regex, replacement) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.match(regex)) {
        const newContent = content.replace(regex, replacement);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.warn(`Regex match failed for ${filePath}. Check if already updated.`);
    }
}

// 1. Update Quizzes
const quizzesInsert = `
    "MBBS": ${JSON.stringify(mbbsQuizzes, null, 4)},
    "NEET PG": ${JSON.stringify(mbbsQuizzes, null, 4)} // Reusing sample
    ]
};`;
// Look for the end of the quizzesBySubject object
// Standard end is array closing, then object closing.
// We will replace the last closing bracket of the last array item, but that's hard.
// We will replace "};" at the very end with ", MBBS data };"
// Assuming format ends with `    ]\n};`
updateFile(QUIZZES_FILE, /\n\s+\]\n\};/, `\n    ],\n    "MBBS": ${JSON.stringify(mbbsQuizzes, null, 4)},\n    "NEET PG": ${JSON.stringify(mbbsQuizzes, null, 4)}\n};`);


// 2. Update Videos
updateFile(VIDEOS_FILE, /\n\s+\]\n\};/, `\n    ],\n    "MBBS": ${JSON.stringify(mbbsVideos, null, 4)}\n};`);

// 3. Update Questions
// Insert MBBS export
const questionsExport = `
export const mbbsQuestions = ${JSON.stringify(mbbsQuestions, null, 4)};

export const QUESTION_DATA = {
    'JEE': {
        'Physics': jeePhysicsQuestions,
        'Chemistry': jeeChemistryQuestions,
        'Maths': jeeMathsQuestions
    },
    'NEET': {
        'Biology': neetBiologyQuestions
    },
    'MBBS': {
        'University': mbbsQuestions
    }
};
`;
// Replace the QUESTION_DATA export part entirely
updateFile(QUESTIONS_FILE, /export const QUESTION_DATA = \{[\s\S]*?\};/, questionsExport);


// 4. Update Notes
// We need to insert inside NOTES_DATA and then update notesData export
const notesInsert = `
    'MBBS': {
        'Anatomy': ${JSON.stringify(mbbsNotes.slice(0, 1), null, 4)},
        'Physiology': ${JSON.stringify(mbbsNotes.slice(1, 2), null, 4)},
        'Pathology': ${JSON.stringify(mbbsNotes.slice(2, 3), null, 4)},
        'Pharmacology': ${JSON.stringify(mbbsNotes.slice(3, 4), null, 4)}
    }
    };`;

updateFile(NOTES_FILE, /\n\s+\}\n\};/, `\n    },\n${notesInsert}`);

// Update flat export
const flatExportRegex = /export const notesData = \[\n([\s\S]*?)\];/;
const flatExportReplacement = `export const notesData = [
$1,
    ...Object.entries(NOTES_DATA['MBBS'] || {}).flatMap(([subject, notes]) => notes.map(n => ({ ...n, subject })))
];`;

updateFile(NOTES_FILE, flatExportRegex, flatExportReplacement);

console.log("Data expansion complete.");
