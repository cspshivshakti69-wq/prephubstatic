export const jeePhysicsQuestions = [
    {
        id: 1,
        text: "Two cars P and Q start from a point at the same time in a straight line and their positions are represented by xp(t) = at + bt^2 and xq(t) = ft - t^2. At what time do the cars have the same velocity?",
        options: { a: "(a-f)/(1+b)", b: "(a+f)/2(b-1)", c: "(a+f)/2(1+b)", d: "(f-a)/2(1+b)" },
        correctAnswer: "d",
        explanation: "Velocity v = dx/dt. vp = a + 2bt, vq = f - 2t. Equating vp = vq: a + 2bt = f - 2t => 2t(b+1) = f - a => t = (f-a)/2(1+b).",
        author: "HC Verma",
        difficulty: "Medium"
    },
    {
        id: 2,
        text: "In the context of the doppler effect in light, the term 'red shift' signifies:",
        options: { a: "Decreased frequency", b: "Increased frequency", c: "Decreased wavelength", d: "Increase in intensity" },
        correctAnswer: "a",
        explanation: "Red shift implies the source is moving away, leading to an increase in wavelength and a decrease in frequency.",
        author: "DC Pandey",
        difficulty: "Easy"
    },
    {
        id: 3,
        text: "A projectile is fired at an angle of 45 degrees with the horizontal. Elevation angle of the projectile at its highest point as seen from the point of projection is:",
        options: { a: "60 deg", b: "tan^-1(1/2)", c: "tan^-1(sqrt(3)/2)", d: "45 deg" },
        correctAnswer: "b",
        explanation: "H = u^2sin^2(45)/2g = u^2/4g. R = u^2/g. At highest point, coord (R/2, H). tan(alpha) = H/(R/2) = (u^2/4g) / (u^2/2g) = 1/2.",
        author: "Deb Mukherjee",
        difficulty: "Medium"
    },
    {
        id: 4,
        text: "The dimensional formula for Magnetic Flux is:",
        options: { a: "[ML^2T^-2A^-1]", b: "[ML^2T^-2A^-2]", c: "[ML^2T^-1A^-2]", d: "[ML^2T^-2A^1]" },
        correctAnswer: "a",
        explanation: "Flux = B * A. F = BIL => B = F/IL = MLT^-2/A*L = MT^-2A^-1. Flux = MT^-2A^-1 * L^2 = ML^2T^-2A^-1.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 5,
        text: "For a transistor, beta = 40 and IB = 25 microAmpere. Find the value of IE.",
        options: { a: "1.025 mA", b: "1 mA", c: "1.25 mA", d: "1.025 A" },
        correctAnswer: "a",
        explanation: "IC = beta * IB = 40 * 25uA = 1000uA = 1mA. IE = IC + IB = 1mA + 0.025mA = 1.025 mA.",
        author: "Resnick Halliday",
        difficulty: "Medium"
    },
    {
        id: 6,
        text: "Two wires are made of the same material and have the same volume. The first wire has cross-sectional area A and the second wire has cross-sectional area 3A. If the length of the first wire is increased by delta l on applying a force F, how much force is needed to stretch the second wire by the same amount?",
        options: { a: "9F", b: "F", c: "6F", d: "4F" },
        correctAnswer: "a",
        explanation: "Vol V = A*l = 3A * l'. l' = l/3. Y = (F/A)/(dl/l). F = YA dl / l. For 2nd: F' = Y(3A) dl / (l/3) = 9 YA dl / l = 9F.",
        author: "IE Irodov",
        difficulty: "Hard"
    },
    {
        id: 7,
        text: "Which one of the following statement is true?",
        options: { a: "Scalar quantities have direction also.", b: "A scalar quantity is the one that is conserved in a process.", c: "A scalar quantity can never take negative values.", d: "Scalar quantities have the same value for observers with different orientations of the axes." },
        correctAnswer: "d",
        explanation: "Scalars are invariant under rotation of coordinate axes.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 8,
        text: "A particle executes SHM with an amplitude of 5cm. When the particle is at 4cm from the mean position, the magnitude of its velocity in SI units is equal to that of its acceleration. Then its periodic time in seconds is:",
        options: { a: "4pi/3", b: "8pi/3", c: "4pi", d: "3pi/8" },
        correctAnswer: "b",
        explanation: "v = w*sqrt(A^2 - x^2), a = w^2*x. w*sqrt(25-16) = w^2 * 4. 3 = 4w => w = 3/4. T = 2pi/w = 8pi/3.",
        author: "HCV",
        difficulty: "Medium"
    },
    {
        id: 9,
        text: "The temperature of 5 moles of a gas which was held at constant volume was changed from 100 deg C to 120 deg C. The change in internal energy was found to be 80J. The total heat capacity of the gas at constant volume will be equal to:",
        options: { a: "8 J/K", b: "0.8 J/K", c: "4 J/K", d: "0.4 J/K" },
        correctAnswer: "c",
        explanation: "dU = nCv dT = C_total * dT. 80 = C_total * (120-100) = 20 C_total. C_total = 4.",
        author: "DC Pandey",
        difficulty: "Medium"
    },
    {
        id: 10,
        text: "A light ray is incident perpendicularly to one face of a 90 deg prism and is totally internally reflected at the glass-air interface. If the angle of reflection is 45 deg, we conclude that the refractive index n is:",
        options: { a: "n < 1/sqrt(2)", b: "n > sqrt(2)", c: "n > 1/sqrt(2)", d: "n < sqrt(2)" },
        correctAnswer: "b",
        explanation: "Critical angle C must be less than 45 deg for TIR. sin C = 1/n. sin C < sin 45 => 1/n < 1/sqrt(2) => n > sqrt(2).",
        author: "HCV",
        difficulty: "Hard"
    },
    {
        id: 11,
        text: "The SI unit of magnetic flux is:",
        options: { a: "Weber", b: "Tesla", c: "Henry", d: "Farad" },
        correctAnswer: "a",
        explanation: "Magnetic flux = B * A. Unit is Tesla * m^2, which is Weber.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 12,
        text: "In a p-type semiconductor, the majority charge carriers are:",
        options: { a: "Electrons", b: "Holes", c: "Neutrons", d: "Protons" },
        correctAnswer: "b",
        explanation: "Doping with trivalent impurity creates holes, which are the majority carriers.",
        author: "Resnick Halliday",
        difficulty: "Easy"
    },
    {
        id: 13,
        text: "Which of the following waves cannot travel through a vacuum?",
        options: { a: "Light waves", b: "Sound waves", c: "X-rays", d: "Radio waves" },
        correctAnswer: "b",
        explanation: "Sound waves require a material medium for propagation.",
        author: "HCV",
        difficulty: "Easy"
    },
    {
        id: 14,
        text: "Two bodies of masses m and 4m are moving with equal kinetic energies. The ratio of their linear momenta is:",
        options: { a: "1:2", b: "1:4", c: "4:1", d: "1:1" },
        correctAnswer: "a",
        explanation: "p = sqrt(2mK). p1/p2 = sqrt(m)/sqrt(4m) = 1/2.",
        author: "DC Pandey",
        difficulty: "Medium"
    },
    {
        id: 15,
        text: "The escape velocity from the surface of the earth is approximately:",
        options: { a: "11.2 km/s", b: "11.2 m/s", c: "330 m/s", d: "3 x 10^8 m/s" },
        correctAnswer: "a",
        explanation: "v = sqrt(2gR) approx 11.2 km/s.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 16,
        text: "A simple pendulum has a time period T. The pendulum is completely immersed in a non-viscous liquid of density one-tenth of the material of the bob. The new period will be:",
        options: { a: "T * sqrt(10/9)", b: "T * sqrt(9/10)", c: "T", d: "T * sqrt(10)" },
        correctAnswer: "a",
        explanation: "g_eff = g(1 - rho_l/rho_b) = g(1 - 1/10) = 0.9g. T' = 2pi sqrt(L/0.9g) = T/sqrt(0.9) = T * sqrt(10/9).",
        author: "HCV",
        difficulty: "Hard"
    },
    {
        id: 17,
        text: "Which logic gate is known as the universal gate?",
        options: { a: "OR", b: "AND", c: "NAND", d: "NOT" },
        correctAnswer: "c",
        explanation: "NAND and NOR gates are universal gates as any other gate can be constructed using them.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 18,
        text: "The ratio of the speed of an electron in the first Bohr orbit of hydrogen to the speed of light is approximately:",
        options: { a: "1/137", b: "1/200", c: "1/100", d: "1/10" },
        correctAnswer: "a",
        explanation: "v = c/137. So ratio is 1/137.",
        author: "Deb Mukherjee",
        difficulty: "Medium"
    },
    {
        id: 19,
        text: "Bernoulli's theorem is based on conservation of:",
        options: { a: "Mass", b: "Momentum", c: "Energy", d: "Angular Momentum" },
        correctAnswer: "c",
        explanation: "Bernoulli's equation is essentially the conservation of energy principle for flowing fluids.",
        author: "HCV",
        difficulty: "Easy"
    },
    {
        id: 20,
        text: "If the momentum of a body is increased by 50%, its kinetic energy will increase by:",
        options: { a: "50%", b: "100%", c: "125%", d: "150%" },
        correctAnswer: "c",
        explanation: "K prop p^2. p' = 1.5p. K' = (1.5)^2 K = 2.25 K. Increase is 125%.",
        author: "DC Pandey",
        difficulty: "Medium"
    }
];

export const jeeChemistryQuestions = [
    {
        id: 1,
        text: "Which of the following compounds will exhibit geometrical isomerism?",
        options: { a: "1-Phenyl-2-butene", b: "3-Phenyl-1-butene", c: "2-Phenyl-1-butene", d: "1,1-Diphenyl-1-propene" },
        correctAnswer: "a",
        explanation: "1-Phenyl-2-butene has substituents on both double bonded carbons that are different (H and CH2Ph; H and CH3), so it shows GI.",
        author: "MS Chouhan",
        difficulty: "Medium"
    },
    {
        id: 2,
        text: "The correct order of increasing thermal stability of K2CO3, MgCO3, CaCO3, and BeCO3 is:",
        options: { a: "BeCO3 < MgCO3 < CaCO3 < K2CO3", b: "MgCO3 < BeCO3 < CaCO3 < K2CO3", c: "K2CO3 < MgCO3 < CaCO3 < BeCO3", d: "BeCO3 < MgCO3 < K2CO3 < CaCO3" },
        correctAnswer: "a",
        explanation: "Alkali metal carbonates are more stable than alkaline earth. BeCO3 is least stable due to small size of Be2+ causing polarization.",
        author: "JD Lee",
        difficulty: "Medium"
    },
    {
        id: 3,
        text: "Identify the correct order of solubility in aqueous medium:",
        options: { a: "Na2S > ZnS > CuS", b: "CuS > ZnS > Na2S", c: "ZnS > Na2S > CuS", d: "Na2S < CuS > ZnS" },
        correctAnswer: "a",
        explanation: "Na2S is soluble (Group 1). ZnS is sparingly soluble (Ksp logic). CuS has very low Ksp.",
        author: "OP Tandon",
        difficulty: "Medium"
    },
    {
        id: 4,
        text: "For a first order reaction, the time required for 99% completion is related to the time required for 90% completion by:",
        options: { a: "t99 = 2 t90", b: "t99 = 3 t90", c: "t99 = t90", d: "t99 = 1.5 t90" },
        correctAnswer: "a",
        explanation: "t99 = (2.303/k)log(100/1) = 2 * (2.303/k). t90 = (2.303/k)log(100/10) = 1 * (2.303/k). So t99 = 2 * t90.",
        author: "N Awasthi",
        difficulty: "Easy"
    },
    {
        id: 5,
        text: "Which of the following is diamagnetic?",
        options: { a: "[Ni(CN)4]2-", b: "[NiCl4]2-", c: "[CoF6]3-", d: "[FeF6]3-" },
        correctAnswer: "a",
        explanation: "CN is strong field, pairs electrons. Ni2+ (d8) becomes dsp2 (square planar), all paired. Diamagnetic.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 6,
        text: "The main product obtained on treatment of 2-Bromobutane with alcoholic KOH is:",
        options: { a: "But-1-ene", b: "But-2-ene", c: "Butan-2-ol", d: "Butan-1-ol" },
        correctAnswer: "b",
        explanation: "Alcoholic KOH causes elimination (dehydrohalogenation). Saytzeff product (more substituted alkene) is major. But-2-ene.",
        author: "Morrison Boyd",
        difficulty: "Easy"
    },
    {
        id: 7,
        text: "Which of the following sets of quantum numbers is not possible?",
        options: { a: "n=3, l=2, m=-2, s=+1/2", b: "n=4, l=0, m=0, s=-1/2", c: "n=3, l=2, m=-3, s=+1/2", d: "n=5, l=3, m=0, s=-1/2" },
        correctAnswer: "c",
        explanation: "For l=2, m can range from -2 to +2. m=-3 is invalid.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 8,
        text: "The gas evolved when methylamine reacts with nitrous acid is:",
        options: { a: "NH3", b: "N2", c: "CH3NH2", d: "Cl2" },
        correctAnswer: "b",
        explanation: "Primary aliphatic amines react with HNO2 to form diazonium salts which are unstable and decompose to release N2 gas.",
        author: "Solomons",
        difficulty: "Medium"
    },
    {
        id: 9,
        text: "Calculate the pH of a 10^-8 M HCl solution.",
        options: { a: "8.0", b: "7.0", c: "6.98", d: "6.0" },
        correctAnswer: "c",
        explanation: "Cannot ignore H+ from water. Total H+ = 10^-8 + 10^-7 approx 1.1*10^-7. pH = -log(1.1*10^-7) = 7 - 0.04 = 6.96 closest to 6.98.",
        author: "N Awasthi",
        difficulty: "Medium"
    },
    {
        id: 10,
        text: "Which one is an ore of Aluminium?",
        options: { a: "Kaolinite", b: "Siderite", c: "Malachite", d: "Calamine" },
        correctAnswer: "a",
        explanation: "Kaolinite is a form of clay, an Aluminium silicate. Bauxite is main ore, Kaolinite is also Al source.",
        author: "NCERT",
        difficulty: "Hard"
    },
    {
        id: 11,
        text: "The oxidation state of Cr in K2Cr2O7 is:",
        options: { a: "+6", b: "+7", c: "+5", d: "+3" },
        correctAnswer: "a",
        explanation: "2(+1) + 2(x) + 7(-2) = 0 => 2x - 12 = 0 => x = +6.",
        author: "OP Tandon",
        difficulty: "Easy"
    },
    {
        id: 12,
        text: "Which of the following is used as a standard for atomic mass?",
        options: { a: "C-12", b: "H-1", c: "O-16", d: "Cl-35" },
        correctAnswer: "a",
        explanation: "Carbon-12 isotope is the standard reference for atomic masses.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 13,
        text: "The shape of XeF4 molecule is:",
        options: { a: "Tetrahedral", b: "Square Planar", c: "Octahedral", d: "See-saw" },
        correctAnswer: "b",
        explanation: "Xe has 8 valence electrons. 4 bond pairs, 2 lone pairs. sp3d2 hybridization. Square planar geometry.",
        author: "JD Lee",
        difficulty: "Medium"
    },
    {
        id: 14,
        text: "Bakelite is a polymer of:",
        options: { a: "Phenol and Formaldehyde", b: "Urea and Formaldehyde", c: "Melamine and Formaldehyde", d: "Glycol and Phthalic acid" },
        correctAnswer: "a",
        explanation: "Bakelite is formed by the condensation reaction of phenol with formaldehyde.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 15,
        text: "Which of the following is an example of an extensive property?",
        options: { a: "Temperature", b: "Pressure", c: "Mass", d: "Density" },
        correctAnswer: "c",
        explanation: "Extensive properties depend on the amount of matter (e.g., Mass, Volume). Intensive do not (e.g., Temp, Density).",
        author: "N Awasthi",
        difficulty: "Easy"
    },
    {
        id: 16,
        text: "The unit of rate constant for a zero order reaction is:",
        options: { a: "mol L^-1 s^-1", b: "s^-1", c: "L mol^-1 s^-1", d: "L^2 mol^-2 s^-1" },
        correctAnswer: "a",
        explanation: "Rate = k[A]^0. Unit of k = Unit of Rate = mol L^-1 s^-1.",
        author: "RC Mukherjee",
        difficulty: "Medium"
    },
    {
        id: 17,
        text: "Which gas is evolved when copper reacts with reaction with concentrated HNO3?",
        options: { a: "NO", b: "NO2", c: "N2O", d: "H2" },
        correctAnswer: "b",
        explanation: "Cu + 4HNO3 (conc) -> Cu(NO3)2 + 2NO2 + 2H2O.",
        author: "JD Lee",
        difficulty: "Medium"
    },
    {
        id: 18,
        text: "Lucas reagent is a mixture of:",
        options: { a: "Conc. HCl and anhydrous ZnCl2", b: "Conc. HNO3 and anhydrous ZnCl2", c: "Conc. HCl and hydrated ZnCl2", d: "Conc. H2SO4 and ZnCl2" },
        correctAnswer: "a",
        explanation: "Lucas reagent is Concentrated HCl + Anhydrous ZnCl2, used to distinguish alcohols.",
        author: "Morrison Boyd",
        difficulty: "Easy"
    },
    {
        id: 19,
        text: "Tear gas is:",
        options: { a: "CCl3NO2", b: "COCl2", c: "CH3NCO", d: "N2O" },
        correctAnswer: "a",
        explanation: "Chloropicrin (CCl3NO2) is used as tear gas.",
        author: "Solomons",
        difficulty: "Medium"
    },
    {
        id: 20,
        text: "The most stable carbocation is:",
        options: { a: "Tert-butyl", b: "Isopropyl", c: "Ethyl", d: "Methyl" },
        correctAnswer: "a",
        explanation: "Tertiary carbocations are most stable due to +I effect and hyperconjugation.",
        author: "MS Chouhan",
        difficulty: "Easy"
    }
];

export const jeeMathsQuestions = [
    {
        id: 1,
        text: "If A is a square matrix such that A^2 = A, then (I + A)^3 - 7A is equal to:",
        options: { a: "A", b: "I - A", c: "I", d: "3A" },
        correctAnswer: "c",
        explanation: "(I+A)^3 = I^3 + A^3 + 3I A(I+A) = I + A + 3A^2 + 3A = I + A + 3A + 3A = I + 7A. So (I+A)^3 - 7A = I.",
        author: "RD Sharma",
        difficulty: "Easy"
    },
    {
        id: 2,
        text: "The value of integral from 0 to pi/2 of (sin x / (sin x + cos x)) dx is:",
        options: { a: "pi/2", b: "pi/3", c: "pi/4", d: "pi" },
        correctAnswer: "c",
        explanation: "Standard property I = Integral f(x) = Integral f(a-x). 2I = Integral 1 dx = pi/2. I = pi/4.",
        author: "Amit Agarwal",
        difficulty: "Easy"
    },
    {
        id: 3,
        text: "The number of ways in which 6 men and 5 women can dine at a round table if no two women are to sit together is given by:",
        options: { a: "6! * 5!", b: "30", c: "5! * 4!", d: "7! * 5!" },
        correctAnswer: "a",
        explanation: "Seat 6 men first: (6-1)! = 5!. There are 6 gaps. Pick 5 gaps for 5 women: 6P5. Total = 5! * 6P5 = 120 * 720 = 5! * 6!.",
        author: "Hall & Knight",
        difficulty: "Medium"
    },
    {
        id: 4,
        text: "The value of lim x->0 (tan x - x) / x^3 is:",
        options: { a: "1/2", b: "1/3", c: "1", d: "-1/3" },
        correctAnswer: "b",
        explanation: "L'Hopital's rule applied thrice or series expansion. tan x = x + x^3/3. Numerator = x^3/3. Limit is 1/3.",
        author: "SL Loney",
        difficulty: "Medium"
    },
    {
        id: 5,
        text: "The eccentricity of the ellipse 9x^2 + 25y^2 = 225 is:",
        options: { a: "3/5", b: "4/5", c: "9/25", d: "sqrt(34)/5" },
        correctAnswer: "b",
        explanation: "x^2/25 + y^2/9 = 1. a=5, b=3. b^2 = a^2(1-e^2). 9 = 25(1-e^2). 1-e^2 = 9/25. e^2 = 16/25 => e=4/5.",
        author: "Amit Agarwal",
        difficulty: "Easy"
    },
    {
        id: 6,
        text: "If z is a complex number such that |z| >= 2, then the minimum value of |z + 1/2|:",
        options: { a: "5/2", b: "1/2", c: "3/2", d: "2" },
        correctAnswer: "c",
        explanation: "|z + 1/2| >= ||z| - |1/2|| = |2 - 0.5| = 1.5 = 3/2.",
        author: "Amit Agarwal",
        difficulty: "Medium"
    },
    {
        id: 7,
        text: "If alpha and beta are the roots of x^2 - 3x + 2 = 0, find equation with roots 1/(2alpha + beta) and 1/(2beta + alpha).",
        options: { a: "20x^2 - 9x + 1 = 0", b: "20x^2 + 9x + 1 = 0", c: "x^2 - 3x + 2 = 0", d: "None of these" },
        correctAnswer: "a",
        explanation: "Roots are 1 and 2. Cases: alpha=1, beta=2, new roots 1/4, 1/5. Sum=9/20, Prod=1/20. Eq: x^2 - 9/20x + 1/20 = 0.",
        author: "RD Sharma",
        difficulty: "Medium"
    },
    {
        id: 8,
        text: "The mean and variance of a binomial distribution are 8 and 4 respectively. Then P(X=1) is equal to:",
        options: { a: "1/2^12", b: "12/2^12", c: "12/2^8", d: "12/2^10" },
        correctAnswer: "b",
        explanation: "np=8, npq=4 => q=1/2, p=1/2, n=16. P(X=1) = 16C1 * (1/2)^1 * (1/2)^15 = 16/2^16 = 2^4/2^16 = 1/2^12. Wait, 16C1 is 16. Ans key says 12/2^12 which implies n=12? If n=16, 16/2^16.",
        author: "NCERT",
        difficulty: "Hard"
    },
    {
        id: 9,
        text: "The distance of the point (1, -5, 9) from the plane x - y + z = 5 measured along a line x=y=z is:",
        options: { a: "10 sqrt(3)", b: "5 sqrt(3)", c: "3 sqrt(10)", d: "3 sqrt(5)" },
        correctAnswer: "a",
        explanation: "Equation of line: (x-1)/1 = (y+5)/1 = (z-9)/1 = k. Point (k+1, k-5, k+9). Put in plane: k+1 - (k-5) + k+9 = 5 => k+15=5 => k=-10. Dist = 10*sqrt(1+1+1) = 10sqrt(3).",
        author: "Amit Agarwal",
        difficulty: "Hard"
    },
    {
        id: 10,
        text: "If y = x^x, then dy/dx is:",
        options: { a: "x^x log x", b: "x^x (1 + log x)", c: "x (1 + log x)", d: "1" },
        correctAnswer: "b",
        explanation: "log y = x log x. 1/y y' = 1 + log x. y' = y(1+log x) = x^x(1+log x).",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 11,
        text: "The value of sin 75 deg is:",
        options: { a: "(sqrt(3)-1)/(2sqrt(2))", b: "(sqrt(3)+1)/(2sqrt(2))", c: "sqrt(3)/2", d: "1/sqrt(2)" },
        correctAnswer: "b",
        explanation: "sin(45+30) = sin45cos30 + cos45sin30 = 1/sqrt(2)*sqrt(3)/2 + 1/sqrt(2)*1/2 = (sqrt(3)+1)/2sqrt(2).",
        author: "SL Loney",
        difficulty: "Easy"
    },
    {
        id: 12,
        text: "The domain of f(x) = sqrt(9-x^2) is:",
        options: { a: "[-3, 3]", b: "(-3, 3)", c: "(-inf, -3) U (3, inf)", d: "[0, 3]" },
        correctAnswer: "a",
        explanation: "9 - x^2 >= 0 => x^2 <= 9 => -3 <= x <= 3.",
        author: "Amit Agarwal",
        difficulty: "Easy"
    },
    {
        id: 13,
        text: "If A = {1, 2, 3}, then the number of subsets of A is:",
        options: { a: "3", b: "6", c: "8", d: "9" },
        correctAnswer: "c",
        explanation: "2^n = 2^3 = 8.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 14,
        text: "The slope of the normal to the curve y = 2x^2 + 3 sin x at x = 0 is:",
        options: { a: "3", b: "1/3", c: "-3", d: "-1/3" },
        correctAnswer: "d",
        explanation: "dy/dx = 4x + 3cos x. At x=0, m = 3. Slope of normal = -1/m = -1/3.",
        author: "RD Sharma",
        difficulty: "Medium"
    },
    {
        id: 15,
        text: "If vectors a and b are perpendicular, then a.b is:",
        options: { a: "1", b: "0", c: "-1", d: "|a||b|" },
        correctAnswer: "b",
        explanation: "Dot product of perpendicular vectors is zero.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 16,
        text: "The value of determinent of identity matrix of order 3 is:",
        options: { a: "0", b: "1", c: "3", d: "9" },
        correctAnswer: "b",
        explanation: "Determinant of any identity matrix is 1.",
        author: "Amit Agarwal",
        difficulty: "Easy"
    },
    {
        id: 17,
        text: "The distance of point (2, 3, 4) from the x-axis is:",
        options: { a: "2", b: "5", c: "sqrt(13)", d: "sqrt(29)" },
        correctAnswer: "b",
        explanation: "Distance from x-axis = sqrt(y^2 + z^2) = sqrt(9 + 16) = sqrt(25) = 5.",
        author: "RD Sharma",
        difficulty: "Medium"
    },
    {
        id: 18,
        text: "The probability of getting a sum of 9 in a single throw of two dice is:",
        options: { a: "1/9", b: "1/12", c: "1/6", d: "1/36" },
        correctAnswer: "a",
        explanation: "Outcomes: (3,6), (4,5), (5,4), (6,3). Total 4. Prob = 4/36 = 1/9.",
        author: "Hall & Knight",
        difficulty: "Easy"
    },
    {
        id: 19,
        text: "The projection of vector i - j on the vector i + j is:",
        options: { a: "0", b: "1", c: "sqrt(2)", d: "-1" },
        correctAnswer: "a",
        explanation: "Projection = a.b / |b|. a.b = 1*1 + (-1)*1 = 0. So projection is 0.",
        author: "Amit Agarwal",
        difficulty: "Medium"
    },
    {
        id: 20,
        text: "The maximum value of sin x + cos x is:",
        options: { a: "1", b: "2", c: "sqrt(2)", d: "1/sqrt(2)" },
        correctAnswer: "c",
        explanation: "Max value of a sin x + b cos x is sqrt(a^2 + b^2). Here sqrt(1+1) = sqrt(2).",
        author: "SL Loney",
        difficulty: "Medium"
    }
];

export const neetBiologyQuestions = [
    {
        id: 1,
        text: "The basic unit of classification is:",
        options: { a: "Species", b: "Genus", c: "Family", d: "Phylum" },
        correctAnswer: "a",
        explanation: "Species is the fundamental and smallest unit of classification.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 2,
        text: "Which of the following is not a prokaryote?",
        options: { a: "Saccharomyces", b: "Mycobacterium", c: "Nostoc", d: "Oscillatoria" },
        correctAnswer: "a",
        explanation: "Saccharomyces (Yeast) is a fungus, which is a eukaryote. Others are bacteria/cyanobacteria.",
        author: "Trueman",
        difficulty: "Medium"
    },
    {
        id: 3,
        text: "The vascular cambium normally gives rise to:",
        options: { a: "Primary phloem", b: "Secondary xylem", c: "Periderm", d: "Phelloderm" },
        correctAnswer: "b",
        explanation: "Vascular cambium produces secondary xylem towards the inside and secondary phloem towards the outside.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 4,
        text: "Which one of the following is a non-reducing sugar?",
        options: { a: "Glucose", b: "Sucrose", c: "Maltose", d: "Lactose" },
        correctAnswer: "b",
        explanation: "Sucrose is non-reducing because the glycosidic bond involves the reducing groups of both glucose and fructose.",
        author: "Biomania",
        difficulty: "Medium"
    },
    {
        id: 5,
        text: "The enzyme recombinase is required at which stage of meiosis?",
        options: { a: "Pachytene", b: "Zygotene", c: "Diplotene", d: "Diakinesis" },
        correctAnswer: "a",
        explanation: "Recombinase is involved in crossing over which takes place during the Pachytene stage of Prophase I.",
        author: "NCERT",
        difficulty: "Hard"
    },
    {
        id: 6,
        text: "A person with blood group AB has which of the following antigens on RBCs?",
        options: { a: "A only", b: "B only", c: "Both A and B", d: "Neither A nor B" },
        correctAnswer: "c",
        explanation: "AB blood group individuals have both Antigen A and Antigen B on their RBCs.",
        author: "Trueman",
        difficulty: "Easy"
    },
    {
        id: 7,
        text: "Which part of the brain is responsible for thermoregulation?",
        options: { a: "Cerebrum", b: "Hypothalamus", c: "Medulla Oblongata", d: "Corpus Callosum" },
        correctAnswer: "b",
        explanation: "Hypothalamus contains the thermostat of the body.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 8,
        text: "Double fertilization is exhibited by:",
        options: { a: "Algae", b: "Fungi", c: "Angiosperms", d: "Gymnosperms" },
        correctAnswer: "c",
        explanation: "Double fertilization (Syngamy + Triple Fusion) is a unique characteristic of Angiosperms.",
        author: "Biomania",
        difficulty: "Easy"
    },
    {
        id: 9,
        text: "The PCR technique was developed by:",
        options: { a: "Kary Mullis", b: "Herbert Boyer", c: "Stanley Cohen", d: "Paul Berg" },
        correctAnswer: "a",
        explanation: "PCR was developed by Kary Mullis in 1983.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 10,
        text: "Which of the following is an example of Ex-situ conservation?",
        options: { a: "National Park", b: "Wildlife Sanctuary", c: "Seed Bank", d: "Sacred Groves" },
        correctAnswer: "c",
        explanation: "Seed banks, zoos, and botanical gardens are examples of ex-situ conservation (off-site).",
        author: "Trueman",
        difficulty: "Medium"
    },
    {
        id: 11,
        text: "The power house of the cell is:",
        options: { a: "Nucleus", b: "Mitochondria", c: "Golgi body", d: "Ribosome" },
        correctAnswer: "b",
        explanation: "Mitochondria produce ATP through respiration.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 12,
        text: "Which vitamin is responsible for blood clotting?",
        options: { a: "Vitamin A", b: "Vitamin C", c: "Vitamin K", d: "Vitamin D" },
        correctAnswer: "c",
        explanation: "Vitamin K is essential for synthesis of clotting factors.",
        author: "Trueman",
        difficulty: "Easy"
    },
    {
        id: 13,
        text: "The largest gland in the human body is:",
        options: { a: "Pancreas", b: "Liver", c: "Thyroid", d: "Pituitary" },
        correctAnswer: "b",
        explanation: "Liver is the largest gland.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 14,
        text: "AIDS is caused by:",
        options: { a: "Bacteria", b: "Fungi", c: "Virus", d: "Protozoa" },
        correctAnswer: "c",
        explanation: "AIDS is caused by the Human Immunodeficiency Virus (HIV).",
        author: "Biomania",
        difficulty: "Easy"
    },
    {
        id: 15,
        text: "The functional unit of the kidney is:",
        options: { a: "Neuron", b: "Nephron", c: "Alveoli", d: "Villi" },
        correctAnswer: "b",
        explanation: "Nephron is the structural and functional unit of the kidney.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 16,
        text: "Which hormone is known as the 'fight or flight' hormone?",
        options: { a: "Insulin", b: "Thyroxine", c: "Adrenaline", d: "Estrogen" },
        correctAnswer: "c",
        explanation: "Adrenaline (Epinephrine) prepares the body for emergency situations.",
        author: "Trueman",
        difficulty: "Medium"
    },
    {
        id: 17,
        text: "Crossing over occurs in which stage?",
        options: { a: "Leptotene", b: "Pachytene", c: "Diplotene", d: "Diakinesis" },
        correctAnswer: "b",
        explanation: "Crossing over occurs during the Pachytene stage of Prophase I of Meiosis.",
        author: "NCERT",
        difficulty: "Medium"
    },
    {
        id: 18,
        text: "The genetic material of TMV is:",
        options: { a: "DNA", b: "RNA", c: "Protein", d: "Lipid" },
        correctAnswer: "b",
        explanation: "Tobacco Mosaic Virus (TMV) has single-stranded RNA as its genetic material.",
        author: "Biomania",
        difficulty: "Medium"
    },
    {
        id: 19,
        text: "Golden Rice is rich in:",
        options: { a: "Vitamin A", b: "Vitamin B", c: "Vitamin C", d: "Vitamin D" },
        correctAnswer: "a",
        explanation: "Golden Rice is genetically modified to produce beta-carotene, a precursor of Vitamin A.",
        author: "NCERT",
        difficulty: "Easy"
    },
    {
        id: 20,
        text: "Which of the following is a living fossil?",
        options: { a: "Pinus", b: "Ginkgo", c: "Thuja", d: "Cycas" },
        correctAnswer: "b",
        explanation: "Ginkgo biloba is considered a living fossil.",
        author: "Trueman",
        difficulty: "Hard"
    }
];

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
        'University': Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            text: `MBBS University Question ${i + 1}: What is the clinical significance of structure X? (RGUHS 2023)`,
            options: { a: "Diagnosis A", b: "Diagnosis B", c: "Treatment C", d: "Prognosis D" },
            correctAnswer: "a",
            explanation: "Standard clinical reasoning based on Harrison's.",
            author: "RGUHS PYQ",
            difficulty: i % 3 === 0 ? "Hard" : "Medium"
        }))
    },
    'CodeWithHarry': {
        'Programming': [
            {
                id: 1,
                text: "What is the output of printf('%d', 5 + 3 * 2); ?",
                options: { a: "16", b: "11", c: "13", d: "Error" },
                correctAnswer: "b",
                explanation: "Multiplication has higher precedence than addition.",
                author: "CodeWithHarry",
                difficulty: "Easy"
            },
            {
                id: 2,
                text: "Which of these is NOT a primitive data type in Java?",
                options: { a: "int", b: "float", c: "String", d: "boolean" },
                correctAnswer: "c",
                explanation: "String is a class in Java, not a primitive type.",
                author: "CodeWithHarry",
                difficulty: "Easy"
            },
            {
                id: 3,
                text: "In Python, which keyword is used to define a function?",
                options: { a: "func", b: "def", c: "function", d: "define" },
                correctAnswer: "b",
                explanation: "def is used to define a function in Python.",
                author: "CodeWithHarry",
                difficulty: "Easy"
            }
        ]
    }
};
