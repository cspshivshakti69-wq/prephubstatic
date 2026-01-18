import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importing all data files
import { jeePhysicsQuestions, jeeChemistryQuestions, jeeMathsQuestions, neetBiologyQuestions, QUESTION_DATA } from '../src/data/questions.js';
import { videosBySubject } from '../src/data/videosData.js';
import { NOTES_DATA } from '../src/data/notesData.js';
import { exams, quizzes as dummyQuizzes, videoResources } from '../src/data/dummyData.js';
import { quizzesBySubject } from '../src/data/quizzesData.js';

// New imports for missing data
import { VIDEO_DATA } from '../src/data/videos.js';
import { neetPyqNotes } from '../src/data/neetPyqNotesData.js';
import { neetPyqVideos } from '../src/data/neetPyqVideosData.js';
import { pyqVideosBySubject } from '../src/data/pyqVideosData.js';
import { jeeChemistryPyqVideos } from '../src/data/jeeChemistryPyqVideosData.js';
import { jeeMathsPyqVideos } from '../src/data/jeeMathsPyqVideosData.js';
import { neetBiologyQuizzes } from '../src/data/neetBiologyQuizzesData.js';
import { neetChemistryQuizzes } from '../src/data/neetChemistryQuizzesData.js';
import { neetPhysicsQuizzes } from '../src/data/neetPhysicsQuizzesData.js';

// Aggregate all data
const allData = {
    questions: {
        jeePhysics: jeePhysicsQuestions,
        jeeChemistry: jeeChemistryQuestions,
        jeeMaths: jeeMathsQuestions,
        neetBiology: neetBiologyQuestions,
        structured: QUESTION_DATA
    },
    videos: {
        main: videosBySubject, // Structured { Subject: [videos] }
        flat: VIDEO_DATA,      // Flat array [videos]
        neetPyq: neetPyqVideos, // Array
        jeePyq: pyqVideosBySubject, // Structured { Subject: [videos] }
        jeeChemPyq: jeeChemistryPyqVideos, // Array
        jeeMathsPyq: jeeMathsPyqVideos // Array
    },
    notes: {
        main: NOTES_DATA,
        neetPyq: neetPyqNotes
    },
    quizzes: {
        generated: quizzesBySubject,
        dummy: dummyQuizzes,
        neetBiology: neetBiologyQuizzes,
        neetChemistry: neetChemistryQuizzes,
        neetPhysics: neetPhysicsQuizzes
    },
    dummyData: {
        exams,
        videoResources
    }
};

const outputPath = path.join(__dirname, 'all_data.json');

try {
    fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
    console.log(`Successfully exported all data to ${outputPath}`);
} catch (error) {
    console.error('Error exporting data:', error);
}
