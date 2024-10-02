// src/components/ExpandableTable.tsx
import React from 'react';
import EditableSelect from './EditableSelect';
import EditableNumber from './EditableNumber';
import { useExpandableTable } from './useExpandableTable';
// src/types/index.ts

export interface Group {
  groupName: string;
  origin: string;
  travelType: string;
  classType: string;
  headCount: number;
  emissions: number;
  subGroups?: Group[];
}

interface ExpandableTableProps {
  groups: Group[];
  onUpdateGroup: (updatedGroups: Group[]) => void;
  level?: number; // Current level in the hierarchy
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({
  groups,
  onUpdateGroup,
  level = 1,
}) => {
  const {
    expandedGroup,
    travelOptions,
    classOptions,
    originOptions,
    handleExpandGroup,
    handleTravelTypeChange,
    handleOriginChange,
    handleClassTypeChange,
    handleHeadCountChange,
    handleGroupChange
  } = useExpandableTable(groups, level, onUpdateGroup);

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Group Name</th>
          <th className="py-2 px-4 border-b">Origin</th>
          <th className="py-2 px-4 border-b">Travel Type</th>
          <th className="py-2 px-4 border-b">Class Type</th>
          <th className="py-2 px-4 border-b">Headcount</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <React.Fragment key={group.groupName}>
            <tr
              className="cursor-pointer"
            >
              <td 
              onClick={() => handleExpandGroup(group.groupName)}
              
              className="py-2 px-4 border-b">{group.groupName}</td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.origin}
                  options={originOptions}
                  onChange={(val) => handleOriginChange(index, val)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.travelType}
                  options={travelOptions}
                  onChange={(val) => handleTravelTypeChange(index, val)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.classType}
                  options={classOptions}
                  onChange={(val) => handleClassTypeChange(index, val)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableNumber
                  value={group.headCount}
                  onChange={(val) => handleHeadCountChange(index, val)}
                />
              </td>
            </tr>

            {expandedGroup === group.groupName && group.subGroups && (
              <tr>
                <td colSpan={5} className="pl-8">
                  <ExpandableTable
                    groups={group.subGroups}
                    onUpdateGroup={(updatedSubGroups) => {
                      const updatedGroup = { ...group, subGroups: updatedSubGroups };
                      handleGroupChange(index, updatedGroup);
                    }}
                    level={level + 1}
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
