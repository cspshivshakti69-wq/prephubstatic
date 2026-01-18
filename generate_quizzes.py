
import random

def get_physics_questions(count, subject_name):
    questions = []
    templates = [
        ("A body of mass {m} kg is moving with a velocity of {v} m/s. Its kinetic energy is:", 
         lambda m, v: 0.5 * m * v**2, "J", "K.E = 1/2 mv^2"),
        ("A force of {f} N acts on a body of mass {m} kg. The acceleration produced is:",
         lambda f, m: f / m, "m/s^2", "a = F/m"),
        ("The work done in moving a charge of {q} C through a potential difference of {v} V is:",
         lambda q, v: q * v, "J", "W = qV"),
        ("A circuit has a resistance of {r} ohms and a current of {i} A. The power dissipated is:",
         lambda r, i: i**2 * r, "W", "P = I^2R"),
        ("An object is placed at a distance of {u} cm from a concave mirror of focal length {f} cm. The image distance is:",
         lambda u, f: (f * u) / (u - f), "cm", "1/v + 1/u = 1/f"),
        ("The de Broglie wavelength of an electron moving with speed {v} m/s is (h=6.6e-34, m=9.1e-31):",
         lambda v: 6.6e-34 / (9.1e-31 * v), "m", "lambda = h/mv"),
        ("A capacitor of {c} microFarad is charged to {v} V. The energy stored is:",
         lambda c, v: 0.5 * c * 1e-6 * v**2, "J", "E = 1/2 CV^2"),
        ("The escape velocity from a planet with mass {m} and radius {r} is (G=6.67e-11):",
         lambda m, r: (2 * 6.67e-11 * m / r)**0.5, "m/s", "v = sqrt(2GM/R)"),
    ]
    
    for i in range(count):
        template, calc, unit, expl = random.choice(templates)
        # Randomize values
        params = []
        if "{m}" in template: params.append(random.randint(2, 20))
        if "{v}" in template: params.append(random.randint(5, 50))
        if "{f}" in template and "mirror" not in template: params.append(random.randint(10, 100))
        if "{q}" in template: params.append(random.randint(1, 10))
        if "{r}" in template and "radius" not in template: params.append(random.randint(5, 50))
        if "{i}" in template: params.append(random.randint(1, 15))
        if "{u}" in template: params.append(random.randint(15, 60))
        if "{f}" in template and "mirror" in template: params.append(random.randint(5, 20))
        if "{c}" in template: params.append(random.randint(1, 100))
        if "{m}" in template and "planet" in template: params.append(6e24) # Earth-like
        if "{r}" in template and "planet" in template: params.append(6.4e6) # Earth-like
        
        # This is a bit complex to do generic, so let's simplify for the demo
        # I'll just hardcode 60 good questions per quiz for a few subjects and then use a loop for the rest.
        pass

# Actually, I'll just write a JS script that generates the data and run it with node, 
# then read the output and write it to the file.
