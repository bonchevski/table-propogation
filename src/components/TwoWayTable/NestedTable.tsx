// components/TwoWayTable/NestedTable.jsx
import React from "react";
import { GroupType } from "./data";

interface NestedTableProps {
    groups: GroupType[];
    level: number;
    onGroupUpdate: (
        groupId: number,
        field: keyof GroupType,
        value: string | number | boolean,
        level: number
    ) => void;
    totalLevels: number;
}

const NestedTable: React.FC<NestedTableProps> = ({
    groups,
    level,
    onGroupUpdate,
    totalLevels
}) => {
    /**
     * Toggle expand/collapse for a group
     * @param groupId - ID of the group to toggle
     */
    const toggleGroupExpand = (groupId: number) => {
        const targetGroup = findGroupById(groups, groupId);
        if (targetGroup) {
            onGroupUpdate(groupId, "isExpanded", !targetGroup.isExpanded, level);
        }
    };

    /**
     * Helper function to find a group by ID
     * @param groupsList - Current list of groups
     * @param groupId - ID of the group to find
     * @returns The group if found, else undefined
     */
    const findGroupById = (
        groupsList: GroupType[],
        groupId: number
    ): GroupType | undefined => {
        for (let group of groupsList) {
            if (group.id === groupId) return group;
            if (group.groups && group.groups.length > 0) {
                const found = findGroupById(group.groups, groupId);
                if (found) return found;
            }
        }
        return undefined;
    };

    /**
     * Handle changes to select inputs and headcount
     * @param groupId - ID of the group being updated
     * @param field - Field being updated
     * @param value - New value for the field
     */
    const handleChange = (
        groupId: number,
        field: keyof GroupType,
        value: string | number | boolean
    ) => {
      console.log(groupId, field, value, level);
        onGroupUpdate(groupId, field, value, level);
    };

    return (
        <table
            border={1}
            cellPadding="10"
            cellSpacing="0"
            width="100%"
            style={{ marginLeft: `${level * 20}px`, marginTop: "10px" }}
        >
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Origin</th>
                    <th>Travel Type</th>
                    <th>Travel Class</th>
                    <th>HeadCount</th>
                </tr>
            </thead>
            <tbody>
                {groups.map((group) => {
                    const isLeaf = group.groups.length === 0;
                    const isLevelEditable = level >= 2; // Editable from level 2 onwards

                    return (
                        <React.Fragment key={group.id}>
                            <tr>
                                <td>
                                    {group.groups && group.groups.length > 0 ? (
                                        <button onClick={() => toggleGroupExpand(group.id)}>
                                            {group.isExpanded ? "▼" : "▶"} {group.groupName}
                                        </button>
                                    ) : (
                                        group.groupName
                                    )}
                                </td>
                                <td>
                                    <select
                                        value={group.origin}
                                        onChange={(e) =>
                                            handleChange(group.id, "origin", e.target.value)
                                        }
                                    >
                                        {["Air", "Car", "Train", "Mixed"].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={group.travelType}
                                        onChange={(e) =>
                                            handleChange(group.id, "travelType", e.target.value)
                                        }
                                    >
                                        {["Air", "Car", "Train", "Mixed"].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={group.travelClass}
                                        onChange={(e) =>
                                            handleChange(group.id, "travelClass", e.target.value)
                                        }
                                    >
                                        {["Economy", "Business", "First Class", "Mixed"].map(
                                            (option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={group.headCount}
                                        onChange={(e) =>
                                            handleChange(group.id, "headCount", Number(e.target.value))
                                        }
                                        min="0"
                                        disabled={!(isLevelEditable)} // Disable if not editable or not a leaf node
                                    />
                                </td>
                            </tr>
                            {group.isExpanded && group.groups && group.groups.length > 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        {level < totalLevels && (
                                            <NestedTable
                                                groups={group.groups}
                                                level={level + 1}
                                                onGroupUpdate={onGroupUpdate}
                                                totalLevels={totalLevels}
                                            />
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
};

export default NestedTable;
