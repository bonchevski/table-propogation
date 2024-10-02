import React, { useState } from 'react';
import EditableSelect from './EditableSelect';
import EditableNumber from './EditableNumber';

export interface Group {
  groupName: string;
  origin: string;
  travelType: string;
  classType: string;
  headCount: number;
  emissions: number;
  [key: string]: any; // Support for recursive fields
}

interface NestedTableProps {
  groups: Group[];
}

const NestedTable: React.FC<NestedTableProps> = ({ groups }) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const travelOptions = ['Car', 'Bus', 'Plane'];
  const classOptions = ['Business', 'Economy', 'First Class'];
  const originOptions = ['USA', 'France', 'Germany'];

  const handleExpandGroup = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Group Name</th>
          <th className="py-2 px-4 border-b">Origin</th>
          <th className="py-2 px-4 border-b">Travel Type</th>
          <th className="py-2 px-4 border-b">Class Type</th>
          <th className="py-2 px-4 border-b">Headcount</th>
          <th className="py-2 px-4 border-b">Emissions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <React.Fragment key={group.groupName}>
            <tr className="cursor-pointer">
              <td  onClick={() => handleExpandGroup(group.groupName)}  className="py-2 px-4 border-b">{group.groupName}</td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.origin}
                  options={originOptions}
                  onChange={(val) => (group.origin = val)} // Handle change
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.travelType}
                  options={travelOptions}
                  onChange={(val) => (group.travelType = val)} // Handle change
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableSelect
                  value={group.classType}
                  options={classOptions}
                  onChange={(val) => (group.classType = val)} // Handle change
                />
              </td>
              <td className="py-2 px-4 border-b">
                <EditableNumber
                  value={group.headCount}
                  onChange={(val) => (group.headCount = val)} // Handle change
                />
              </td>
              <td className="py-2 px-4 border-b">
                <div>
                    <span>{group.emissions}</span>
                </div>
                </td>
            </tr>

            {expandedGroup === group.groupName && (
              <tr>
                <td colSpan={5}>
                  <table className="min-w-full bg-gray-100 border border-gray-300 mt-2">
                    <thead>
                      <tr>
                        {Object.keys(group).map((key) => (
                          <th key={key} className="py-2 px-4 border-b">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(group).map((value, idx) => (
                          <td key={idx} className="py-2 px-4 border-b">
                            {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default NestedTable;
