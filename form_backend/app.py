from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import os, shutil
from extract import extract_fields
from validators import run_validation
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Claims Validation Demo")

# ✅ Allow frontend to call backend
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # CRA React dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # 👈 or ["*"] for demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TMP_DIR = "tmp"
os.makedirs(TMP_DIR, exist_ok=True)

@app.post("/claims/extract")
async def extract_claim(file: UploadFile = File(...), form_type: str = Form("cms1500")):
    file_path = os.path.join(TMP_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        fields = extract_fields(file_path, "form_fields.json")
        return {"status": "extracted", "fields": fields}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/claims/validate")
async def validate_claim(file: UploadFile = File(...), form_type: str = Form("cms1500")):
    file_path = os.path.join(TMP_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        fields = extract_fields(file_path, "form_fields.json")
        issues = run_validation(fields)
        status = "validated" if not issues else "pending"
        return {"status": status, "fields": fields, "issues": issues}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
