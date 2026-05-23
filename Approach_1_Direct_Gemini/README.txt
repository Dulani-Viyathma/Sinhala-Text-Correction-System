# How To Run The Project

## 1. Install Required Software

Install:

- Python 3.10+
- Node.js LTS
- VS Code

Check installation:

```bash
python --version
node --version
npm --version
```

---

## 2. Open Project Folder

Open terminal inside:

```txt
sinhala-corrector-app
```

---

# RUN BACKEND

## 3. Open Backend Terminal

```bash
cd backend
```

## 4. Install Python Packages

```bash
pip install -r requirements.txt
```

## 5. Start Backend

```bash
python -m uvicorn app:app --reload
```

If successful:

```txt
Uvicorn running on http://127.0.0.1:8000
```

---

# RUN FRONTEND

## 6. Open Another Terminal

```bash
cd frontend
```

## 7. Install Node Packages

```bash
npm install
npm install lucide-react
```

## 8. Start Frontend

```bash
npm run dev
```

If successful:

```txt
Local: http://localhost:5173
```

---

# USE THE SYSTEM

## 9. Open Browser

Go to:

```txt
http://localhost:5173
```

## 10. Use Application

- Upload Sinhala `.txt` file
- Click:

```txt
Correct Sinhala Text
```

- Wait for AI correction
- View corrected Sinhala output
- Copy or download output

---

# IMPORTANT

Both terminals must stay running:

Terminal 1:
```txt
Backend
```

Terminal 2:
```txt
Frontend
```