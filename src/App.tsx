// App.tsx
import React, { useState } from "react";
import './components/TwoWayTable/styles.css';
import MainTable from "./components/TwoWayTable/MainTable";
import { useTableContext } from "./components/TwoWayTable/useTableContext";

const TOTAL_LEVELS = 7; // Define the total number of levels available

const App: React.FC = () => {
  // use context from the useTableContext hook
  const { events, toggleEventExpand, handleGroupUpdate } = useTableContext();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nested Bi-Directional Table</h1>
      <MainTable
        events={events}
        toggleEventExpand={toggleEventExpand}
        onGroupUpdate={handleGroupUpdate}
        totalLevels={TOTAL_LEVELS}
      />
    </div>
  );
};

export default App;
