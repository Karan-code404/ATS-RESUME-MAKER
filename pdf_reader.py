import os
import json
import io
import streamlit as st
from dotenv import load_dotenv
from groq import Groq
from pypdf import PdfReader
import chromadb
from sentence_transformers import SentenceTransformer

load_dotenv()

# --- CACHING ---
@st.cache_resource
def load_embedding_model():
    return SentenceTransformer('all-MiniLM-L6-v2')

@st.cache_resource
def get_chroma_client():
    return chromadb.Client()

# --- CORE LOGIC ---
def process_resume(pdf_file, job_description):
    # PDF ko padho
    reader = PdfReader(pdf_file)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"
    
    # Chunks banao
    chunk_size = 300
    chunks = [full_text[i:i+chunk_size] for i in range(0, len(full_text), chunk_size)]

    # Model aur DB setup
    embed_model = load_embedding_model()
    client = get_chroma_client()
    
    # Har baar naya collection banao (taaki purana data mix na ho)
    collection_name = "resume_" + str(hash(pdf_file.name))
    
    try:
        client.delete_collection(name=collection_name)
    except:
        pass
        
    collection = client.create_collection(name=collection_name)

    # Save to DB
    for i, chunk in enumerate(chunks):
        embedding = embed_model.encode(chunk).tolist()
        collection.add(ids=[str(i)], embeddings=[embedding], documents=[chunk])

    # Search relevant chunks
    jd_embedding = embed_model.encode(job_description).tolist()
    results = collection.query(query_embeddings=[jd_embedding], n_results=3)
    
    relevant_chunks = results['documents'][0]
    context = "\n\n".join(relevant_chunks)
    
    # Groq AI se analysis karwao
    groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) and technical recruiter. 
    Analyze this resume against the job description.
    
    JOB DESCRIPTION:
    {job_description}
    
    RELEVANT RESUME EXTRACTS:
    {context}
    
    Provide your analysis in this EXACT JSON format:
    {{
        "ats_score": <number out of 100>,
        "strengths": ["point 1", "point 2"],
        "gaps": ["point 1", "point 2"],
        "recommendations": [
            {{
                "section": "<name of resume section like Skills, Experience, Projects, etc>",
                "advice": "<specific actionable advice for this section>"
            }}
        ],
        "verdict": "<one line summary>"
    }}
    
    Note: Provide at least 2-3 section-wise recommendations. The section name should be exactly what it appears in a resume (e.g., "Skills", "Experience", "Education").
    """
    
    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)


# --- UI BANANA ---
st.set_page_config(page_title="AI Resume Matcher", page_icon="📄")

st.title("📄 AI Resume Matcher")
st.write("Apna resume upload karo, job description daalo, aur AI se ATS score nikalwao!")

# Sidebar mein PDF upload karo
with st.sidebar:
    st.header("1. Upload Resume")
    uploaded_file = st.file_uploader("Apni PDF file choose karo", type="pdf")

st.header("2. Job Description")
job_desc = st.text_area("Yahan Job Description paste karo:", height=200)

# Button dabane pe kya karna hai
if st.button("Analyze Match 🚀", use_container_width=True):
    if uploaded_file is None or not job_desc:
        st.error("Bhai, pehle PDF upload karo aur Job Description daalo!")
    else:
        with st.spinner("AI analyze kar raha hai... (thoda time lagega)"):
            try:
                # Analysis function call karo
                result = process_resume(uploaded_file, job_desc)
                
                st.success("Analysis Complete!")
                
                # 1. ATS SCORE (Progress bar aur Metric ke saath)
                st.subheader("📊 ATS Compatibility Score")
                ats_score = result['ats_score']
                st.metric(label="Total ATS Score", value=f"{ats_score}%")
                st.progress(ats_score / 100) # Progress bar 0-100 ke beech
                
                st.divider() # Ek line kheench dega
                
                # 2. Strengths aur Gaps (2 columns mein)
                col1, col2 = st.columns(2)
                
                with col1:
                    st.subheader("✅ Strengths")
                    for s in result['strengths']:
                        st.write(f"- {s}")
                        
                with col2:
                    st.subheader("❌ Gaps")
                    for g in result['gaps']:
                        st.write(f"- {g}")
                
                st.divider()
                
                # 3. Recommendations (Section-wise Boxes mein)
                st.subheader("💡 Section-wise Recommendations")
                for rec in result['recommendations']:
                    # Har recommendation ko ek border wale box mein dikhao
                    with st.container(border=True):
                        st.markdown(f"**📌 Section: {rec['section']}**")
                        st.write(f"👉 {rec['advice']}")
                
                st.divider()
                
                # 4. Final Verdict
                st.success(f"**Final Verdict:** {result['verdict']}")
                
            except Exception as e:
                st.error(f"Kuch error aaya: {e}")