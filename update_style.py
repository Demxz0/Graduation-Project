import re

path = r'c:\Users\User\ajleek-mental-health\src\pages\AnxietyDetail.jsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace 'Cairo' with 'Tajawal' globally
text = text.replace("'Cairo'", "'Tajawal'")

# 2. Hero Background
target_hero = 'padding: "5rem 1.5rem 4rem", position: "relative", overflow: "hidden"'
replace_hero = target_hero + ', background: "#efd9b6"'
text = text.replace(target_hero, replace_hero)

# 3. maxWidth: 860 to 1200
text = text.replace('maxWidth: 860', 'maxWidth: 1200')

# 4. Treatment Title "التعافي"
text = text.replace('طريقك نحو <span style={{ color: COLORS.teal }}>التعافي</span>', 'طريقك نحو <span style={{ color: "#d6936a" }}>التعافي</span>')

# 5. Symptoms Box Shadow
target_symptoms = 'fontSize: "0.9rem", color: "#552269", fontWeight: "bold" }}'
replace_symptoms = 'fontSize: "0.9rem", color: "#552269", fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}'
text = text.replace(target_symptoms, replace_symptoms)

# 6. Causes text color for env tags
text = re.sub(r'color:\s*"#fff",\s*borderRadius:\s*50,\s*padding:\s*"4px 12px",', 'color: "#5d5c5d", borderRadius: 50, padding: "4px 12px",', text)

# 7. Maladaptive emoji margin
text = text.replace('fontSize: 22, marginBottom: 10', 'fontSize: 22, marginBottom: 0, lineHeight: 1')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated successfully")
