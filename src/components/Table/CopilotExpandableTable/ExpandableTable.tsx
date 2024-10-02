import React from 'react';
import useExpandable from './useExpandable';

interface Group {
  groupName: string;
  travelType: string;
  subGroups?: Group[];
}

interface ExpandableTableProps {
  groups: Group[];
  onUpdateGroup: (updatedGroups: Group[]) => void;
  level?: number;
  allGroups: Group[]; // Reference to the entire group structure
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ groups, onUpdateGroup, level = 0, allGroups }) => {
  const { expandedGroup, setExpandedGroup, handleGroupChange } = useExpandable(allGroups, onUpdateGroup); // Pass allGroups to useExpandable

  return (
    <table>
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Travel Type</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <React.Fragment key={group.groupName}>
            <tr onClick={() => setExpandedGroup(expandedGroup === group.groupName ? null : group.groupName)}>
              <td>{group.groupName}</td>
              <td>
                <select
                  value={group.travelType}
                  onChange={(e) => handleGroupChange(allGroups, { ...group, travelType: e.target.value })}
                >
                  <option value="car">Car</option>
                  <option value="plane">Plane</option>
                  <option value="bus">Bus</option>
                </select>
              </td>
            </tr>

            {expandedGroup === group.groupName && group.subGroups && (
              <tr>
                <td colSpan={2} className="pl-8">
                  <ExpandableTable
                    groups={group.subGroups}
                    onUpdateGroup={(updatedSubGroups) => {
                      const updatedGroup = { ...group, subGroups: updatedSubGroups };
                      handleGroupChange(allGroups, updatedGroup);
                    }}
                    level={level + 1}
                    allGroups={allGroups} // Pass allGroups to nested ExpandableTable
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

export default ExpandableTable;