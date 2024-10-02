import { useState } from 'react';

interface Group {
  groupName: string;
  travelType: string;
  subGroups?: Group[];
}

const useExpandable = (allGroups: Group[], onUpdateGroup: (updatedGroups: Group[]) => void) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Propagate changes downwards to all subgroups
  const propagateChangesDownwards = (group: Group, travelType: string): Group => {
    if (group.subGroups) {
      group.subGroups = group.subGroups.map(subGroup => propagateChangesDownwards({ ...subGroup, travelType }, travelType));
    }
    return { ...group, travelType };
  };

  // Propagate changes upwards to all parent groups
  const propagateChangesUpwards = (groups: Group[]): Group[] => {
    return groups.map(group => {
      if (group.subGroups) {
        const updatedSubGroups = propagateChangesUpwards(group.subGroups);
        const allSubGroupsHaveSameTravelType = updatedSubGroups.every(subGroup => subGroup.travelType === updatedSubGroups[0].travelType);
        return {
          ...group,
          travelType: allSubGroupsHaveSameTravelType ? updatedSubGroups[0].travelType : 'mixed',
          subGroups: updatedSubGroups,
        };
      }
      return group;
    });
  };

  // Find and update the group in the nested structure
  const updateNestedGroup = (groups: Group[], updatedGroup: Group): Group[] => {
    return groups.map(group => {
      if (group.groupName === updatedGroup.groupName) {
        return updatedGroup;
      } else if (group.subGroups) {
        return {
          ...group,
          subGroups: updateNestedGroup(group.subGroups, updatedGroup),
        };
      }
      return group;
    });
  };

  // Handle group change and propagate changes
  const handleGroupChange = (allGroups: Group[], updatedGroup: Group) => {
    let updatedGroups = [...allGroups];
    updatedGroups = updateNestedGroup(updatedGroups, updatedGroup);

    // Find the index of the updated group
    const findGroupIndex = (groups: Group[], groupName: string): number | null => {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].groupName === groupName) {
          return i;
        } else if (groups[i].subGroups) {
          const subGroupIndex = findGroupIndex(groups[i].subGroups!, groupName);
          if (subGroupIndex !== null) {
            return i;
          }
        }
      }
      return null;
    };

    const index = findGroupIndex(updatedGroups, updatedGroup.groupName);
    if (index !== null) {
      // Propagate changes downwards
      updatedGroups[index] = propagateChangesDownwards(updatedGroup, updatedGroup.travelType);

      // Propagate changes upwards
      updatedGroups = propagateChangesUpwards(updatedGroups);

      onUpdateGroup(updatedGroups);
    }
  };

  return {
    expandedGroup,
    setExpandedGroup,
    handleGroupChange,
  };
};

export default useExpandable;