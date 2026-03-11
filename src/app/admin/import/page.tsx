"use client";

import { useState } from "react";
import { processFabricJson } from "~/server/actions/import";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export default function ImportFabricsPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleImport() {
    if (!jsonInput) return;
    setIsPending(true);
    setStatus("Processing...");

    try {
      const count = await processFabricJson(jsonInput);
      setStatus(`Success! Updated details for ${count} fabrics.`);
      setJsonInput("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setStatus(`Error: ${errorMessage}`);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6 rounded-lg border bg-white p-6">
      <div>
        <h1 className="text-2xl font-bold">Import Fabric Details</h1>
        <p className="mt-2 text-slate-500">
          Paste your JSON array below. The system will match the &quot;MaIn
          DesIgn&quot; key to your existing fabric names and update their
          properties.
        </p>
      </div>

      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='[ { "MaIn DesIgn": "ACCENT", "COMPOSITION": "%100 PES", ... } ]'
        className="h-64 font-mono"
      />

      <div className="flex items-center gap-4">
        <Button onClick={handleImport} disabled={isPending || !jsonInput}>
          {isPending ? "Updating Database..." : "Run Update"}
        </Button>
        <p
          className={`text-sm font-medium ${status.includes("Error") ? "text-red-500" : "text-green-600"}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
