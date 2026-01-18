
import fs from 'fs';
import path from 'path';
import { videosBySubject } from './src/data/videosData.js';
import { NOTES_DATA } from './src/data/notesData.js';

// Helper to expand array
function expand(arr, multiplier) {
    let result = [];
    for (let i = 0; i < multiplier; i++) {
        const copy = arr.map(item => ({
            ...item,
            id: `${item.id}_copy_${i}`,
            title: `${item.title} (Vol. ${i + 1})`
        }));
        result = [...result, ...copy];
    }
    return result;
}

// Expand Videos
const newVideos = {};
for (const [subject, videos] of Object.entries(videosBySubject)) {
    newVideos[subject] = expand(videos, 5); // 5x to ensure > 100
}

const videosContent = `export const videosBySubject = ${JSON.stringify(newVideos, null, 4)};`;
fs.writeFileSync('./src/data/videosData.js', videosContent);
console.log('Videos expanded.');

// Expand Notes
const newNotes = { ...NOTES_DATA };
for (const [exam, subjects] of Object.entries(NOTES_DATA)) {
    for (const [sub, notes] of Object.entries(subjects)) {
        newNotes[exam][sub] = expand(notes, 15); // 15x because base is small (~8) -> ~120
    }
}

// Re-construct the flat notesData part
const notesFileContent = `export const NOTES_DATA = ${JSON.stringify(newNotes, null, 4)};

// Flat array for MagicNotes as requested
export const notesData = [
    // Flat mapping of the above nested data for MagicNotes logic
    ...Object.entries(NOTES_DATA['JEE']).flatMap(([subject, notes]) => notes.map(n => ({ ...n, subject }))),
    ...Object.entries(NOTES_DATA['NEET']).flatMap(([subject, notes]) => notes.map(n => ({ ...n, subject })))
];
`;

fs.writeFileSync('./src/data/notesData.js', notesFileContent);
console.log('Notes expanded.');
