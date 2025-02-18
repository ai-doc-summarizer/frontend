"use client";

import { useState } from "react";

export default function Summarizer() {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [length, setLength ] = useState<string>("medium");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null);
    setErrorMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setErrorMessage("Only PDF files are allowed.");
        setFile(null);
      } else {
        setFile(e.target.files[0]);
        setText("");
        setErrorMessage(null);
      }
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(e.target.value);
  };

  const generateSummary = async () => {
    setLoading(true);
    setSummary("");
    setKeyPoints([]);
    setErrorMessage(null);

    try {
      let response;
      if (text) {
        response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, length }),
        });
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("length", length);

        response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        setSummary(data.summary);
        setKeyPoints(data.key_points || []);
      } else {
        throw new Error("Error getting the summary.");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold">Add text or a PDF you want to summarize</h2>
        <textarea
          className="w-full border rounded-lg p-3 mt-3"
          rows={4}
          placeholder="Paste the text you want to summarize here..."
          value={text}
          onChange={handleTextChange}
        />
        {!text && (
          <input
            type="file"
            accept=".pdf,.txt"
            className="mt-3"
            onChange={handleFileChange}
          />
        )}
        <label className="block mt-3 text-sm font-medium">Summary Size:</label>
        <select
          className="border rounded-lg p-2 w-full mt-1"
          value={length}
          onChange={handleLengthChange}
        >
          <option value="short">Short Summary</option>
          <option value="medium">Medium Summary</option>
          <option value="large">Long Summary</option>
        </select>
      </div>
      <button
        onClick={generateSummary}
        disabled={(!text && !file) || loading || !!errorMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 disabled:opacity-50"
      >
        {loading ? "Generando..." : "Generate Summary"}
      </button>
      {errorMessage && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg">
          <p>{errorMessage}</p>
          <button
            onClick={generateSummary}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            {"Please try again"}
          </button>
        </div>
      )}
      {summary && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Summary:</h3>
          <p>{summary}</p>
          {keyPoints.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
