import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import os

# Initialize Firebase Admin
cred_path = os.path.join(os.path.dirname(__file__), '../serviceAccountKey.json')
if not os.path.exists(cred_path):
    print(f"Error: Service Account Key not found at {cred_path}")
    exit(1)

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

# Load data
data_path = os.path.join(os.path.dirname(__file__), 'all_data.json')
with open(data_path, 'r', encoding='utf-8') as f:
    all_data = json.load(f)

def upload_questions():
    print("Uploading Questions...")
    batch = db.batch()
    count = 0
    
    # 1. Upload "Structured" questions (Question Bank)
    structured = all_data.get('questions', {}).get('structured', {})
    
    for exam, subjects in structured.items(): 
        if isinstance(subjects, dict):
            for subject, questions in subjects.items():
                if isinstance(questions, list):
                    for q in questions:
                        doc_ref = db.collection('questions').document(str(q.get('id')))
                        q_data = q.copy()
                        q_data['exam'] = exam
                        q_data['subject'] = subject
                        batch.set(doc_ref, q_data)
                        count += 1
                        if count % 400 == 0:
                            batch.commit()
                            batch = db.batch()
    
    batch.commit()
    print(f"Uploaded {count} questions.")

def upload_videos():
    print("Uploading Videos...")
    batch = db.batch()
    count = 0
    
    videos_data = all_data.get('videos', {})
    
    # Main videos (structured)
    for subject_key, videos in videos_data.get('main', {}).items():
        for video in videos:
            doc_ref = db.collection('videos').document(str(video.get('id')))
            v_data = video.copy()
            v_data['category_key'] = subject_key
            batch.set(doc_ref, v_data)
            count += 1
            if count % 400 == 0:
                batch.commit()
                batch = db.batch()

    # Flat videos
    for video in videos_data.get('flat', []):
         doc_ref = db.collection('videos').document(str(video.get('id')))
         v_data = video.copy()
         # Use existing category or default
         if 'category' not in v_data:
             v_data['category'] = 'General'
         v_data['category_key'] = v_data.get('category')
         batch.set(doc_ref, v_data)
         count += 1

    # NEET PYQ
    for video in videos_data.get('neetPyq', []):
        doc_ref = db.collection('videos').document(str(video.get('id')))
        v_data = video.copy()
        v_data['category_key'] = 'NEET PYQ' # Or 'Biology' + tag
        batch.set(doc_ref, v_data)
        count += 1
    
    # JEE PYQ (Structured)
    for subject, videos in videos_data.get('jeePyq', {}).items():
        for video in videos:
            doc_ref = db.collection('videos').document(str(video.get('id')))
            v_data = video.copy()
            v_data['category_key'] = f'JEE PYQ {subject}'
            batch.set(doc_ref, v_data)
            count += 1
            
    # JEE Chem PYQ
    for video in videos_data.get('jeeChemPyq', []):
        doc_ref = db.collection('videos').document(str(video.get('id')))
        v_data = video.copy()
        v_data['category_key'] = 'JEE Chemistry PYQ'
        batch.set(doc_ref, v_data)
        count += 1
        
    # JEE Maths PYQ
    for video in videos_data.get('jeeMathsPyq', []):
        doc_ref = db.collection('videos').document(str(video.get('id')))
        v_data = video.copy()
        v_data['category_key'] = 'JEE Maths PYQ'
        batch.set(doc_ref, v_data)
        count += 1

    if count > 0:
        batch.commit() # Commit leftovers
    print(f"Uploaded {count} videos.")

def upload_notes():
    print("Uploading Notes...")
    batch = db.batch()
    count = 0
    
    notes_data = all_data.get('notes', {})
    
    # Main Notes
    main_notes = notes_data.get('main', {})
    for exam, subjects in main_notes.items():
        if isinstance(subjects, dict):
             for subject, notes in subjects.items():
                for note in notes:
                    doc_ref = db.collection('notes').document(str(note.get('id')))
                    n_data = note.copy()
                    n_data['exam'] = exam
                    n_data['subject'] = subject
                    batch.set(doc_ref, n_data)
                    count += 1
                    if count % 400 == 0:
                        batch.commit()
                        batch = db.batch()
    
    # NEET PYQ Notes
    for note in notes_data.get('neetPyq', []):
        doc_ref = db.collection('notes').document(str(note.get('id')))
        n_data = note.copy()
        n_data['exam'] = 'NEET'
        n_data['type'] = 'PYQ'
        batch.set(doc_ref, n_data)
        count += 1

    if count > 0:
        batch.commit()
    print(f"Uploaded {count} notes.")

def upload_quizzes():
    print("Uploading Quizzes...")
    batch = db.batch()
    count = 0
    
    quizzes_data = all_data.get('quizzes', {})

    # Generated Quizzes (Structured)
    generated = quizzes_data.get('generated', {})
    for subject, quizzes in generated.items():
        for quiz in quizzes:
            doc_ref = db.collection('quizzes').document(str(quiz.get('quizId')))
            q_data = quiz.copy()
            q_data['category'] = subject
            batch.set(doc_ref, q_data)
            count += 1
            if count % 400 == 0:
                batch.commit()
                batch = db.batch()

    # NEET Biology Quizzes
    for quiz in quizzes_data.get('neetBiology', []):
        doc_ref = db.collection('quizzes').document(str(quiz.get('quizId')))
        q_data = quiz.copy()
        q_data['category'] = 'Biology'
        q_data['exam'] = 'NEET'
        batch.set(doc_ref, q_data)
        count += 1

    # NEET Chemistry Quizzes
    for quiz in quizzes_data.get('neetChemistry', []):
        doc_ref = db.collection('quizzes').document(str(quiz.get('quizId')))
        q_data = quiz.copy()
        q_data['category'] = 'Chemistry'
        q_data['exam'] = 'NEET'
        batch.set(doc_ref, q_data)
        count += 1

    # NEET Physics Quizzes
    for quiz in quizzes_data.get('neetPhysics', []):
        doc_ref = db.collection('quizzes').document(str(quiz.get('quizId')))
        q_data = quiz.copy()
        q_data['category'] = 'Physics'
        q_data['exam'] = 'NEET'
        batch.set(doc_ref, q_data)
        count += 1

    # Dummy Quizzes
    for quiz in quizzes_data.get('dummy', []):
         doc_ref = db.collection('quizzes').document(str(quiz.get('id')))
         q_data = quiz.copy()
         q_data['isSample'] = True
         batch.set(doc_ref, q_data)
         count += 1
    
    if count > 0:
        batch.commit()
    print(f"Uploaded {count} quizzes.")

if __name__ == '__main__':
    try:
        upload_questions()
        upload_videos()
        upload_notes()
        upload_quizzes()
        print("Data upload complete!")
    except Exception as e:
        print(f"Error uploading data: {e}")
