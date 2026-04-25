import React, { useEffect, useMemo, useState } from "react";
import { Button, Input } from "antd";
import api from "../api.jsx";
import { useLocation } from "react-router-dom";
import { getAgentSubFolderById } from "../services/agentSubFolder.js";

export default function Agent () { 
  const location = useLocation();

  const [agentId, setAgentId] = useState("");
  const [runId, setRunId] = useState<string | null>(null);
  const [agentSubFolderId, setAgentSubFolderId] = useState<string | null>(null);

  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant" | "system"; content: string }>
  >([]);

  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resolve agentSubFolderId from URL, then load linked agentId from backend.
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const subId = sp.get("agentSubFolderId");
    setAgentSubFolderId(subId);
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      setAgentId("");
      setRunId(null);
      setMessages([]);

      if (!agentSubFolderId) {
        setError("Missing agentSubFolderId in URL.");
        return;
      }

      try {
        const sub = await getAgentSubFolderById(agentSubFolderId);
        const linkedAgentId = sub?.agentId;
        if (!linkedAgentId) {
          setError("This agent interface has no linked AI agent yet.");
          return;
        }
        if (!cancelled) setAgentId(linkedAgentId);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Failed to load agent interface";
        if (!cancelled)
          setError(typeof msg === "string" ? msg : JSON.stringify(msg, null, 2));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [agentSubFolderId]);

  const canSubmit = useMemo(() => {
    return !!agentId && !!userText.trim() && !isRunning;
  }, [agentId, userText, isRunning]);

  async function handleSubmit() {
    const text = userText.trim();
    if (!agentId) {
      setError("Missing agentId (create/select an agent first).");
      return;
    }
    if (!text) return;

    setError(null);
    setIsRunning(true);

    // optimistic UI update
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setUserText("");

    try {
      const { data } = await api.post("/AI/agent/turn", {
        agentId,
        runId: runId || undefined,
        userText: text,
      });

      if (data?.runId) setRunId(data.runId);

      const assistant = data?.assistantMessage?.content;
      if (assistant) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistant },
        ]);
      } else if (Array.isArray(data?.toolCalls) && data.toolCalls.length) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Tool calls executed: ${data.toolCalls
              .map((t) => t.toolName)
              .join(", ")}`,
          },
        ]);
      }
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Failed to run agent turn";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg, null, 2));
    } finally {
      setIsRunning(false);
    }
  }

return (
  <div>
  <div className="flex flex-col gap-10 pt-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold">
       Agent
      </h1>
      <div className="text-xs opacity-70">
        Interface: {agentSubFolderId || "(missing)"}{" "}
        {runId ? `• Run: ${runId}` : "• Run: (new)"}
      </div>
      <div className="flex flex-row gap-4">
      <Input
        placeholder="Enter your prompt"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        onPressEnter={() => {
          if (canSubmit) handleSubmit();
        }}
        disabled={isRunning}
      />
      <Button type="primary" onClick={handleSubmit} disabled={!canSubmit}>
        Submit
      </Button>
      </div>
      </div>

      <div className="mt-10"> 
        {error ? (
          <pre className="whitespace-pre-wrap text-sm text-red-500">{error}</pre>
        ) : null}

        <div className="flex flex-col gap-3">
          {messages.map((m, idx) => (
            <div key={idx} className="rounded-md border border-white/10 p-3">
              <div className="text-xs opacity-60">{m.role}</div>
              <div className="whitespace-pre-wrap text-sm opacity-90">
                {m.content}
              </div>
            </div>
          ))}
          {isRunning ? (
            <div className="text-sm opacity-70">Running…</div>
          ) : null}
        </div>
      </div>
      </div>


); 

} 