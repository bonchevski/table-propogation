import { useState, useRef } from 'react';
import { Group } from './ExpandableTable';

// Function to propagate changes downward
const propagateDownward = (group: Group, travelType: string): Group => {
  const updatedGroup = { ...group, travelType };
  if (updatedGroup.subGroups) {
    updatedGroup.subGroups = updatedGroup.subGroups.map(subGroup =>
      propagateDownward(subGroup, travelType)
    );
  }
  return updatedGroup;
};

// Function to propagate changes upward
const propagateUpward = (groups: Group[], selectedLevel: number, newTravelType: string): Group[] => {
    console.log(groups, selectedLevel, newTravelType, 'upward');
  const updateAboveLevel = (groups: Group[], currentLevel: number): Group[] => {
    return groups.map(group => {
      const updatedGroup = { ...group };
      if (updatedGroup.subGroups) {
        updatedGroup.subGroups = updateAboveLevel(updatedGroup.subGroups, currentLevel + 1);

        // If any sub-group's travelType differs from newTravelType, set current group to "Mixed"
        const allTravelTypesMatch = updatedGroup.subGroups.every(
          subGroup => subGroup.travelType === newTravelType
        );
        updatedGroup.travelType = allTravelTypesMatch || currentLevel >= selectedLevel 
          ? newTravelType 
          : "Mixed";
      }
      return updatedGroup;
    });
  };

  // Update groups above the selected level to "Mixed" if any discrepancy is found
  return updateAboveLevel(groups, selectedLevel);
};

export const useExpandableTable = (initialGroups: Group[], level: number, onUpdateGroup: (updatedGroups: Group[]) => void) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const selectedLevelRef = useRef<number | null>(null);

  // Predefined options for select fields
  const travelOptions = ['Car', 'Bus', 'Plane'];
  const classOptions = ['Business', 'Economy', 'First Class'];
  const originOptions = ['USA', 'France', 'Germany'];

  // Toggle group expansion
  const handleExpandGroup = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  // Handle changes to travel type
  const handleTravelTypeChange = (index: number, travelType: string) => {
    // Track the selected level
    selectedLevelRef.current = level;

    // Create a copy of groups and apply downward propagation
    const downwardGroups = propagateDownward(initialGroups[index], travelType);

    console.log(downwardGroups, 'downward');

    let updatedGroups = initialGroups.map((group, idx) =>
      idx === index ? downwardGroups : group
    );

    // Perform upward propagation only if the current level is greater than 1
    if (selectedLevelRef.current && selectedLevelRef.current > 1) {
      // Create a copy of the original groups and apply upward propagation
      const upwardGroups = propagateUpward(initialGroups, selectedLevelRef.current, travelType);

      console.log(upwardGroups, 'upward');

      // Merge downward and upward changes
      updatedGroups = updatedGroups.map((group, index) => {
        const upwardGroup = upwardGroups[index];
        return { ...group, ...upwardGroup };
      });

      console.log(updatedGroups, 'merged');
    }

    // Update the parent component with the final results
    onUpdateGroup(updatedGroups);
  };

  // Handle changes to other properties (origin, class type, head count)
  const handleOriginChange = (index: number, origin: string) => {
    const updatedGroups = [...initialGroups];
    updatedGroups[index] = { ...updatedGroups[index], origin };
    onUpdateGroup(updatedGroups);
  };

  const handleClassTypeChange = (index: number, classType: string) => {
    const updatedGroups = [...initialGroups];
    updatedGroups[index] = { ...updatedGroups[index], classType };
    onUpdateGroup(updatedGroups);
  };

  const handleHeadCountChange = (index: number, headCount: number) => {
    const updatedGroups = [...initialGroups];
    updatedGroups[index] = { ...updatedGroups[index], headCount };
    onUpdateGroup(updatedGroups);
  };

  // Update the group in the list
  const handleGroupChange = (index: number, updatedGroup: Group) => {
    const updatedGroups = [...initialGroups];
    updatedGroups[index] = updatedGroup;
    onUpdateGroup(updatedGroups);
  };

  return {
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
  };
};
