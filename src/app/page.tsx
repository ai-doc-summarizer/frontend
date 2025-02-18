import Summarizer from "@/components/Summarizer";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📄 AI Document Summarizer</h1>
      <Summarizer />
    </div>
  );
}
