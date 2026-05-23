from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from gemini_sinhala_corrector_v3_IDE import process_text, verify_and_fix

app = FastAPI(title="Sinhala Text Corrector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Sinhala Text Corrector API is running"}

@app.post("/correct-file")
async def correct_file(file: UploadFile = File(...)):
    content = await file.read()
    noisy_text = content.decode("utf-8", errors="ignore")

    first_pass = process_text(
        noisy_text,
        max_chars=1500,
        retries=3,
        delay_between_chunks=1
    )

    final_output = verify_and_fix(noisy_text, first_pass)

    return {
        "original": noisy_text,
        "first_pass": first_pass,
        "corrected": final_output
    }