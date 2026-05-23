import { useState } from "react";
import {
    Upload,
    FileText,
    Sparkles,
    Copy,
    Download,
    Loader2,
} from "lucide-react";

import "./App.css";

const API_URL = "http://127.0.0.1:8000/correct-file";

function App() {
    const [file, setFile] = useState(null);
    const [originalText, setOriginalText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (!selectedFile.name.endsWith(".txt")) {
            setMessage("Please upload a .txt file only.");
            return;
        }

        setFile(selectedFile);
        setCorrectedText("");
        setMessage("");

        const text = await selectedFile.text();
        setOriginalText(text);
    };

    const handleCorrect = async () => {
        if (!file) {
            setMessage("Please upload a txt file first.");
            return;
        }

        setLoading(true);
        setCorrectedText("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            setCorrectedText(data.corrected || "");
            setMessage("Correction completed.");
        } catch (error) {
            setMessage("Backend connection failed.");
        } finally {
            setLoading(false);
        }
    };

    const copyText = async () => {
        if (!correctedText) return;

        await navigator.clipboard.writeText(correctedText);
        setMessage("Copied successfully.");
    };

    const downloadText = () => {
        if (!correctedText) return;

        const blob = new Blob([correctedText], {
            type: "text/plain;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "corrected_output.txt";
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <main className="app">
            <section className="hero">
                <div className="badge">
                    <Sparkles size={16} />
                    Sinhala AI Corrector
                </div>

                <h1>Gemini Sinhala Text Correction</h1>

                <p>
                    Upload noisy Sinhala text files and generate clean, natural Sinhala
                    output using AI.
                </p>
            </section>

            <section className="card upload-card">
                <label className="upload-box">
                    <Upload size={40} />

                    <h3>Select TXT File</h3>

                    <p>
                        {file
                            ? file.name
                            : "Click here to upload your Sinhala text file"}
                    </p>

                    <input type="file" accept=".txt" onChange={handleFileChange} />
                </label>

                <button
                    className="main-btn"
                    onClick={handleCorrect}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="spin" size={20} />
                            Correcting...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Correct Sinhala Text
                        </>
                    )}
                </button>

                {message && <p className="message">{message}</p>}
            </section>

            <section className="grid">
                <div className="card text-card">
                    <div className="card-title">
                        <FileText size={20} />
                        <h2>Original Text</h2>
                    </div>

                    <textarea
                        value={originalText}
                        readOnly
                        placeholder="Uploaded text will appear here..."
                    />
                </div>

                <div className="card text-card">
                    <div className="card-title between">
                        <div className="title-left">
                            <Sparkles size={20} />
                            <h2>Corrected Output</h2>
                        </div>

                        <div className="actions">
                            <button onClick={copyText}>
                                <Copy size={16} />
                            </button>

                            <button onClick={downloadText}>
                                <Download size={16} />
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={correctedText}
                        readOnly
                        placeholder="Corrected Sinhala output will appear here..."
                    />
                </div>
            </section>
        </main>
    );
}

export default App;