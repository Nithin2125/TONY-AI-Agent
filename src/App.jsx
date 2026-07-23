import { useState } from "react";

import {
  Activity,
  Database
} from "lucide-react";

import NeuralCore from "./components/NeuralCore";
import CursorParallax from "./components/CursorParallax";
import AIConsole from "./components/AIConsole";
import AgentPanel from "./components/AgentPanel";
import MemorySystem from "./components/MemorySystem";

function App(){

  const [activeAgent,setActiveAgent] = useState({
    name:"Developer Core",
    description:"Code Intelligence",
    mode:"Programming Assistant"
  });

  // Temporary demo user
  const user = {
    displayName: "Nithin (Developer Mode)"
  };

  return(

    <CursorParallax>

      <div className="tony-interface">

        <header className="top-header">

          <div>
            <h1>TONY</h1>
            <p>Autonomous Intelligence System</p>
          </div>

          <div className="system-online">
            <Activity size={18}/>
            <span>SYSTEM ACTIVE</span>
          </div>

        </header>

        <main className="main-grid">

          <AgentPanel
            activeAgent={activeAgent}
            setActiveAgent={setActiveAgent}
          />

          <NeuralCore />

          <section className="panel status-panel">

            <h2>System Intelligence</h2>

            <div className="metric">
              <span>Operator</span>
              <div>{user.displayName}</div>
            </div>

            <div className="metric">
              <span>Active Agent</span>
              <div>{activeAgent.name}</div>
            </div>

            <div className="metric">
              <span>Operating Mode</span>
              <div>{activeAgent.mode}</div>
            </div>

            <div className="memory-status">
              <Database size={20}/>
              Memory Connected
            </div>

          </section>

        </main>

        <AIConsole
          activeAgent={activeAgent}
          setActiveAgent={setActiveAgent}
        />

        <MemorySystem activeAgent={activeAgent}/>

      </div>

    </CursorParallax>
  );
}

export default App;