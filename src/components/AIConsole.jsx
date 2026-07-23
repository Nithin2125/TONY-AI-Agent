import { useState } from "react";
import axios from "axios";
import { Send, BrainCircuit, User } from "lucide-react";
import { motion } from "framer-motion";

import VoiceControl from "./VoiceControl";
import VoiceOutput from "./VoiceOutput";
import AgentBrain from "./AgentBrain";

function AIConsole({ activeAgent, setActiveAgent }) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "TONY online. Autonomous agent selection enabled.",
    },
  ]);

  const [thinking, setThinking] = useState(false);

  const brain = AgentBrain({
    message: input,
    setActiveAgent,
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const command = input;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: command,
      },
    ]);

    setInput("");
    setThinking(true);

    brain.analyzeCommand(command);

    try {
      const response = await axios.post(
  "https://fluffy-fortnight-pjpjv9xx4pr5c66x6-8000.app.github.dev/chat",
        {
          message: command,
          agent: activeAgent.name,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "⚠ Unable to connect to TONY backend.",
        },
      ]);
    }

    setThinking(false);
  };

  return (
    <section className="ai-console">
      <div className="console-header">
        <BrainCircuit size={25} />
        <div>
          <h2>TONY Intelligence Console</h2>
          <p>Autonomous Multi-Agent Brain</p>
        </div>
      </div>

      <div className="message-area">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={
              msg.type === "ai"
                ? "message ai-message"
                : "message user-message"
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.type === "ai" ? (
              <BrainCircuit size={18} />
            ) : (
              <User size={18} />
            )}

            <span>{msg.text}</span>

            {msg.type === "ai" && <VoiceOutput text={msg.text} />}
          </motion.div>
        ))}

        {thinking && (
          <div className="thinking">
            TONY Brain analyzing command...
          </div>
        )}
      </div>

      <div className="console-input">
        <VoiceControl setVoiceText={setInput} />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Command TONY..."
        />

        <button onClick={sendMessage}>
          <Send size={20} />
        </button>
      </div>
    </section>
  );
}

export default AIConsole;