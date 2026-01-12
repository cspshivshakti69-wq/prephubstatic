export const exams = ['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'GMAT', 'SAT', 'GATE', 'BITSAT', 'AIIMS'];

export const quizzes = [
    {
        id: 1,
        title: 'JEE Main Chemistry - Organic',
        exam: 'JEE Main',
        subject: 'Chemistry',
        time: 30, // minutes
        questionsCount: 5,
        description: 'Organic chemistry fundamentals. Most repeated topics.',
        difficulty: 'Medium',
        questions: [
            {
                id: 101,
                text: 'What is the product of benzene + Cl2 in FeCl3?',
                options: ['Chlorobenzene', 'Dichlorobenzene', 'Benzene Hexachloride', 'No Reaction'],
                correct: 0,
                explanation: 'In the presence of a Lewis acid catalyst (FeCl3), benzene undergoes electrophilic substitution with chlorine to form chlorobenzene.'
            },
            {
                id: 102,
                text: 'Which of the following is most acidic?',
                options: ['Phenol', 'Ethanol', 'Acetic Acid', 'Picric Acid'],
                correct: 3,
                explanation: 'Picric acid (2,4,6-trinitrophenol) is the most acidic due to the strong electron-withdrawing -NO2 groups.'
            },
            {
                id: 103,
                text: 'Hybridization of carbon in ethene is:',
                options: ['sp', 'sp2', 'sp3', 'dsp2'],
                correct: 1,
                explanation: 'Each carbon atom in ethene (C2H4) is attached to 3 atoms (2 H and 1 C) and has one pi bond, so it is sp2 hybridized.'
            },
            {
                id: 104,
                text: 'Which test is used to distinguish primary amines?',
                options: ['Lucas Test', 'Carbylamine Test', 'Tollen\'s Test', 'Fehling\'s Test'],
                correct: 1,
                explanation: 'Carbylamine reaction is given only by primary amines (aliphatic and aromatic).'
            },
            {
                id: 105,
                text: 'The monomer of Teflon is:',
                options: ['Tetrafluoroethene', 'Styrene', 'Ethene', 'Vinyl Chloride'],
                correct: 0,
                explanation: 'Teflon (Polytetrafluoroethylene) is formed by the polymerization of tetrafluoroethene (CF2=CF2).'
            }
        ]
    },
    {
        id: 2,
        title: 'NEET Biology - Human Physiology',
        exam: 'NEET',
        subject: 'Biology',
        time: 30,
        questionsCount: 5,
        description: 'Key concepts of Digestion and Breathing.',
        difficulty: 'Easy',
        questions: [
            { id: 201, text: 'Which hormone regulates blood sugar?', options: ['Insulin', 'Adrenaline', 'Thyroxin', 'Estrogen'], correct: 0, explanation: 'Insulin (secreted by pancreas) lowers blood blood glucose levels.' },
            { id: 202, text: 'The structural and functional unit of kidney is:', options: ['Neuron', 'Nephron', 'Alveoli', 'Villi'], correct: 1, explanation: 'Nephrons are the filtration units of the kidney.' },
            { id: 203, text: 'Heart of cockroach is:', options: ['4 chambered', '13 chambered', '3 chambered', '2 chambered'], correct: 1, explanation: 'Cockroaches have a 13-chambered tubular heart.' },
            { id: 204, text: 'Total number of bones in human face:', options: ['14', '22', '12', '8'], correct: 0, explanation: 'The human face consists of 14 skeletal bones.' },
            { id: 205, text: 'Which blood group is universal donor?', options: ['A', 'B', 'AB', 'O-'], correct: 3, explanation: 'O negative blood type has no antigens and can be donated to anyone.' }
        ]
    },
    {
        id: 3,
        title: 'JEE Advanced Physics - Mechanics',
        exam: 'JEE Advanced',
        subject: 'Physics',
        time: 60,
        questionsCount: 5,
        description: 'Rotational motion and high level mechanics problems.',
        difficulty: 'Hard',
        questions: [
            { id: 301, text: 'Moment of inertia of a disc about its diameter is:', options: ['MR^2', 'MR^2/2', 'MR^2/4', '2MR^2/5'], correct: 2, explanation: 'About axis perpendicular is MR^2/2. By perpendicular axis theorem, Ix + Iy = Iz => 2Id = MR^2/2 => Id = MR^2/4.' },
            { id: 302, text: 'Bernoulli principle is based on conservation of:', options: ['Mass', 'Energy', 'Momentum', 'Charge'], correct: 1, explanation: 'Bernoulli\'s equation is essentially the conservation of mechanical energy for flowing fluids.' },
            { id: 303, text: 'Escape velocity from Earth surface is approx:', options: ['9.8 km/s', '11.2 km/s', '13.6 km/s', '15 km/s'], correct: 1, explanation: 'Escape velocity ve = sqrt(2gR) ≈ 11.2 km/s.' },
            { id: 304, text: 'Unit of surface tension is:', options: ['N/m', 'N/m^2', 'J/m', 'N.m'], correct: 0, explanation: 'Surface Tension is Force per unit Length (N/m).' },
            { id: 305, text: 'Time period of seconds pendulum is:', options: ['1 sec', '2 sec', '4 sec', '0.5 sec'], correct: 1, explanation: 'A seconds pendulum has a time period of exactly 2 seconds.' }
        ]
    },
    {
        id: 4, title: 'CAT Quantitative Aptitude', exam: 'CAT', subject: 'Math', time: 30, questionsCount: 5, description: 'Arithmetic, Algebra and Geometry mix.', difficulty: 'Medium',
        questions: [
            { id: 401, text: 'If 2x + 3y = 12, find x when y=2.', options: ['2', '3', '4', '0'], correct: 1, explanation: '2x + 3(2) = 12 => 2x = 6 => x = 3.' },
            { id: 402, text: 'Sum of first n odd numbers is:', options: ['n', 'n^2', '2n', 'n(n+1)'], correct: 1, explanation: 'The sum of the first n odd natural numbers is n^2.' },
            { id: 403, text: 'Train 120m long crosses a pole in 6s. Speed is:', options: ['20 m/s', '72 km/h', 'Both A and B', '25 m/s'], correct: 2, explanation: 'Speed = Dist/Time = 120/6 = 20 m/s. 20 * 18/5 = 72 km/h.' },
            { id: 404, text: 'Which is a prime number?', options: ['91', '1', '2', '51'], correct: 2, explanation: '2 is the only even prime number. 91=13*7, 51=17*3.' },
            { id: 405, text: 'Probability of getting sum 7 in two dice throw:', options: ['1/6', '1/12', '5/36', '1/36'], correct: 0, explanation: 'Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. Prob = 6/36 = 1/6.' }
        ]
    }
];

export const videoResources = [
    // Physics Wallah
    {
        id: 'pw-1',
        title: 'JEE Main 2025 Revision - Complete Physics',
        platform: 'Physics Wallah',
        exam: 'JEE Main',
        subject: 'Physics',
        url: 'https://www.youtube.com/embed/videoseries?list=PLF_7kfnwLFCEobOz9WXb5_yB2O9DhBpI', // Placeholder playlist ID
        thumbnail: 'https://img.youtube.com/vi/placeholder/hqdefault.jpg'
    },
    {
        id: 'pw-2',
        title: 'NEET Biology - Digestion One Shot',
        platform: 'Physics Wallah',
        exam: 'NEET',
        subject: 'Biology',
        url: 'https://www.youtube.com/embed/abcd123?si=example',
        thumbnail: 'https://img.youtube.com/vi/abcd123/hqdefault.jpg'
    },
    // Unacademy
    {
        id: 'un-1',
        title: 'Complete Inorganic Chemistry - JEE Nexus',
        platform: 'Unacademy',
        exam: 'JEE Main',
        subject: 'Chemistry',
        url: 'https://www.youtube.com/embed/lAPNQ4J8oXI',
        thumbnail: 'https://img.youtube.com/vi/lAPNQ4J8oXI/hqdefault.jpg'
    }
];
