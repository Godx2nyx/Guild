 "use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createRaw() {
    setError(""); setUrl(""); setLoading(true);
    try {
      const res = await fetch("/api/create-raw", {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "สร้าง Raw ไม่สำเร็จ");
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally { setLoading(false); }
  }

  return <main className="wrap"><section className="card">
    <div className="title">🐷 Pig Guard</div>
    <div className="sub">Luau Raw Generator</div>
    <textarea className="field" value={code} onChange={e=>setCode(e.target.value)}
      placeholder="วาง Luau ของคุณที่นี่..." />
    <button className="btn" disabled={!code.trim() || loading} onClick={createRaw}>
      {loading ? "กำลังสร้าง..." : "สร้าง RAW"}
    </button>
    {error && <div className="error">{error}</div>}
    {url && <div className="result"><b>RAW URL</b><div className="url">{url}</div></div>}
  </section></main>;
}
