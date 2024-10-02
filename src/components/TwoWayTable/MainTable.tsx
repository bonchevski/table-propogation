// MainTable.jsx
import React from "react";
import NestedTable from "./NestedTable";

// Define the prop types for MainTable
/**
 * @typedef {Object} MainTableProps
 * @property {Array} events - Array of event objects
 * @property {Function} toggleEventExpand - Function to toggle event expansion
 * @property {Function} onGroupUpdate - Callback function for group updates
 * @property {number} totalLevels - Total number of levels for propagation
 */

/**
 * MainTable Component
 * Renders the main events table and conditionally displays nested tables for expanded events.
 *
 * @param {MainTableProps} props - The props for the component
 * @returns {JSX.Element} The rendered component
 */
const MainTable = ({ events, toggleEventExpand, onGroupUpdate, totalLevels }) => {
  return (
    <table border={1} cellPadding="10" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location</th>
          <th>Date</th>
          <th>Emissions Of Event</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <tr>
              <td>
                <button onClick={() => toggleEventExpand(event.id)}>
                  {event.isExpanded ? "▼" : "▶"} {event.eventName}
                </button>
              </td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.emissions}</td>
            </tr>
            {event.isExpanded && (
              <tr>
                <td colSpan={4}>
                  {/* 
                    Pass the following props to NestedTable:
                    - groups: The groups of the current event
                    - level: Starting level (1 for the first nested table)
                    - onGroupUpdate: Callback function to handle updates
                    - totalLevels: Total number of levels allowed for propagation
                  */}
                  <NestedTable
                    groups={event.groups}
                    level={1}
                    onGroupUpdate={onGroupUpdate}
                    totalLevels={totalLevels}
                  />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
