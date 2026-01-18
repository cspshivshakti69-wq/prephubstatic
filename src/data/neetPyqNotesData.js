export const neetPyqNotes = [
    { id: 1, title: "NEET PYQ Human Physiology | 2005–2025 Chapterwise Solutions", author: "MTG Fingertips + NCERT", subject: "Biology", shortDescription: "Detailed PYQ explanations, important lines, and solutions from 2005–2025 NEET papers for Human Physiology.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.selfstudys.com/books/neet-previous-year-paper" },
    { id: 2, title: "Genetics & Evolution NEET Last 20 Years Summary", author: "Vedantu NEET PYQ Series", subject: "Biology", shortDescription: "Complete summary of all genetics and evolution questions asked in NEET since 2005.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.vedantu.com/neet/neet-previous-year-question-paper" },
    { id: 3, title: "Plant Kingdom NEET PYQ Quick Revision", author: "Physics Wallah NEET", subject: "Biology", shortDescription: "Fast track revision notes specifically for Plant Kingdom based on previous year patterns.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.pw.live/neet-previous-year-question-paper" },
    { id: 4, title: "Reproduction NEET 15 Years Solved Compendium", author: "Selfstudys Chapterwise", subject: "Biology", shortDescription: "Exhaustive collection of solved questions from the Reproduction unit for NEET 2026.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.selfstudys.com/books/neet-previous-year-paper" },
    { id: 5, title: "Ecology & Environment NEET PYQ Mastery", author: "eSaral 37 Years Solutions", subject: "Biology", shortDescription: "Master the Ecology unit with 37 years of chapterwise solved equations and concepts.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.esaral.com/neet/neet-question-paper" },
    { id: 6, title: "Biotechnology Unit NEET 10 Years Summary", author: "MTG Fingertips", subject: "Biology", shortDescription: "Concise summary of Biotechnology principles and applications from the last decade.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.selfstudys.com/books/neet-previous-year-paper" },
    { id: 7, title: "Cell Structure & Function NEET Solved Series", author: "Trueman + Dinesh", subject: "Biology", shortDescription: "Detailed analysis of cell biology questions with conceptual diagrams and explanations.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.vedantu.com/neet/neet-previous-year-question-paper" },
    { id: 8, title: "Biological Classification NEET 20 Year Track", author: "NCERT + MTG", subject: "Biology", shortDescription: "Visual guide to biological classification based on previous years' high-weightage topics.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.pw.live/neet-previous-year-question-paper" },
    { id: 9, title: "Animal Kingdom Priority NEET PYQs", author: "Selfstudys Experts", subject: "Biology", shortDescription: "Highly probable questions and patterns from the Animal Kingdom for NEET 2025.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.selfstudys.com/books/neet-previous-year-paper" },
    { id: 10, title: "Structural Organization in Plants & Animals", author: "Vedantu Biology Lab", subject: "Biology", shortDescription: "Detailed anatomical summaries and PYQ solutions for structural organization units.", viewButtonText: "View Notes", downloadButtonText: "Download PDF", pdfUrl: "https://www.vedantu.com/neet/neet-previous-year-question-paper" },
    // Generating 100+ entries using patterns
    ...Array.from({ length: 91 }, (_, i) => {
        const id = i + 11;
        const topics = ["Human Physiology", "Genetics", "Ecology", "Plant Physiology", "Biotechnology", "Cell Biology", "Reproduction", "Evolution", "Human Health", "Diversity"];
        const topic = topics[i % topics.length];
        const authors = ["MTG Fingertips", "Vedantu", "eSaral", "Physics Wallah", "Selfstudys", "Trueman", "Dinesh"];
        const author = authors[i % authors.length];
        return {
            id,
            title: `NEET PYQ ${topic} | ${2000 + (i % 25)}–2025 ${i % 2 === 0 ? 'Chapterwise' : 'Full'} Solutions Vol ${Math.floor(i / 10) + 1}`,
            author: author + " Experts",
            subject: "Biology",
            shortDescription: `A comprehensive ${i % 2 === 0 ? 'detailed' : 'concise'} guide to ${topic} including all previous year questions and ${i % 3 === 0 ? 'video links' : 'diagrams'}.`,
            viewButtonText: "View Notes",
            downloadButtonText: "Download PDF",
            pdfUrl: "https://www.selfstudys.com/books/neet-previous-year-paper"
        };
    })
];

console.log("NEET PYQ Notes loaded:", neetPyqNotes.length);
