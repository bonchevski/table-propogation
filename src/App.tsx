// App.tsx
import React, { useState } from "react";
import './components/TwoWayTable/styles.css';
import { eventsData, EventType, GroupType } from "./components/TwoWayTable/data";
import MainTable from "./components/TwoWayTable/MainTable";

const TOTAL_LEVELS = 7; // Define the total number of levels available

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>(eventsData);

  /**
   * Toggle expand/collapse for events
   * @param eventId - ID of the event to toggle
   */
  const toggleEventExpand = (eventId: number) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, isExpanded: !event.isExpanded }
        : event
    );
    setEvents(updatedEvents);
  };

  /**
   * Handle updates from NestedTable
   * @param groupId - ID of the group being updated
   * @param field - Field being updated (e.g., 'origin', 'travelType', etc.)
   * @param value - New value for the field
   * @param level - Current level of the group being updated
   */
  const handleGroupUpdate = (
    groupId: number,
    field: keyof GroupType,
    value: string | number | boolean,
    level: number
  ) => {
    let updatedEvents = [...events];

    if (field === "isExpanded") {
      // Special handling for toggling expansion
      updatedEvents = toggleGroupExpansion(updatedEvents, groupId, value);
    } else {
      // Handle propagation for other fields
      // Step 1: Propagate the change downwards from the current level
      updatedEvents = propagateDownwards(updatedEvents, groupId, field, value, level);

      // Step 2: Propagate the change upwards from the current level
      updatedEvents = propagateUpwards(updatedEvents, groupId, field, level);
    }

    // Step 3: Update the state with the new events data
    setEvents(updatedEvents);
  };

  /**
   * Toggle expand/collapse for a group
   * @param eventsList - Current list of events
   * @param groupId - ID of the group to toggle
   * @param isExpanded - New expanded state
   * @returns Updated list of events
   */
  const toggleGroupExpansion = (
    eventsList: EventType[],
    groupId: number,
    isExpanded: boolean
  ): EventType[] => {
    return eventsList.map((event) => {
      const updatedEvent = { ...event };
      updatedEvent.groups = toggleGroupExpansionRecursive(event.groups, groupId, isExpanded);
      return updatedEvent;
    });
  };

  /**
   * Recursive helper to toggle group expansion
   * @param groups - Current list of groups
   * @param groupId - ID of the group to toggle
   * @param isExpanded - New expanded state
   * @returns Updated list of groups
   */
  const toggleGroupExpansionRecursive = (
    groups: GroupType[],
    groupId: number,
    isExpanded: boolean
  ): GroupType[] => {
    return groups.map((group) => {
      if (group.id === groupId) {
        return { ...group, isExpanded };
      } else if (group.groups && group.groups.length > 0) {
        return { ...group, groups: toggleGroupExpansionRecursive(group.groups, groupId, isExpanded) };
      }
      return group;
    });
  };

  /**
   * Recursively propagate changes downwards to all child groups
   * @param eventsList - Current list of events
   * @param groupId - ID of the group where the change originated
   * @param field - Field to update
   * @param value - New value for the field
   * @param currentLevel - Current level of the group being updated
   * @returns Updated list of events
   */
  const propagateDownwards = (
    eventsList: EventType[],
    groupId: number,
    field: keyof GroupType,
    value: string | number | boolean,
    currentLevel: number
  ): EventType[] => {
    return eventsList.map((event) => {
      const updatedEvent = { ...event };
      updatedEvent.groups = updateGroupDownwards(
        event.groups,
        groupId,
        field,
        value,
        currentLevel
      );
      return updatedEvent;
    });
  };

  /**
   * Helper function to recursively update groups downwards
   * @param groups - Current list of groups
   * @param targetGroupId - ID of the group to start updating from
   * @param field - Field to update
   * @param value - New value for the field
   * @param currentLevel - Current level of the group being updated
   * @returns Updated list of groups
   */
  const updateGroupDownwards = (
    groups: GroupType[],
    targetGroupId: number,
    field: keyof GroupType,
    value: string | number | boolean,
    currentLevel: number
  ): GroupType[] => {
    return groups.map((group) => {
      if (group.id === targetGroupId) {
        // Update the current group
        const updatedGroup = { ...group, [field]: value };

        // If the field is one that requires propagation
        if (
          field === "origin" ||
          field === "travelType" ||
          field === "travelClass"
        ) {
          // Propagate the change to all child groups
          if (updatedGroup.groups && updatedGroup.groups.length > 0) {
            updatedGroup.groups = propagateChange(
              updatedGroup.groups,
              field,
              value
            );
          }
        }

        return updatedGroup;
      } else {
        // Recursively traverse to find the target group
        const updatedGroup = { ...group };
        if (group.groups && group.groups.length > 0) {
          updatedGroup.groups = updateGroupDownwards(
            group.groups,
            targetGroupId,
            field,
            value,
            currentLevel + 1
          );
        }
        return updatedGroup;
      }
    });
  };

  /**
   * Recursively propagate changes upwards to parent groups
   * @param eventsList - Current list of events
   * @param groupId - ID of the group where the change originated
   * @param field - Field that was updated
   * @param currentLevel - Current level of the group being updated
   * @returns Updated list of events
   */
  const propagateUpwards = (
    eventsList: EventType[],
    groupId: number,
    field: keyof GroupType,
    currentLevel: number
  ): EventType[] => {
    return eventsList.map((event) => {
      const updatedEvent = { ...event };
      updatedEvent.groups = updateGroupUpwards(
        event.groups,
        groupId,
        field,
        currentLevel
      );
      return updatedEvent;
    });
  };

  /**
   * Helper function to recursively update groups upwards
   * @param groups - Current list of groups
   * @param targetGroupId - ID of the group that was updated
   * @param field - Field that was updated
   * @param currentLevel - Current level of the group being updated
   * @returns Updated list of groups
   */
  const updateGroupUpwards = (
    groups: GroupType[],
    targetGroupId: number,
    field: keyof GroupType,
    currentLevel: number
  ): GroupType[] => {
    return groups.map((group) => {
      if (group.groups && group.groups.length > 0) {
        // Recursively traverse to find and update the parent groups
        const updatedChildGroups = updateGroupUpwards(
          group.groups,
          targetGroupId,
          field,
          currentLevel - 1
        );

        // Determine if parent should be updated based on children's values
        if (group.groups.length > 1) { // Only proceed if there are multiple child groups
          const uniqueValues = [
            ...new Set(updatedChildGroups.map((child) => child[field]))
          ];

          const updatedGroup = { ...group, groups: updatedChildGroups };

          if (uniqueValues.length === 1) {
            // All children have the same value; set the parent to that value
            if (updatedGroup[field] !== uniqueValues[0]) {
              updatedGroup[field] = uniqueValues[0] as GroupType[keyof GroupType];
            }
          } else {
            // Children have mixed values; set the parent to 'Mixed'
            if (updatedGroup[field] !== "Mixed") {
              console.log("Setting to mixed");
              updatedGroup[field] = "Mixed";
            }
          }

          return updatedGroup;
        } else {
          // If there's only one child group, do NOT change the parent group's field
          const updatedGroup = { ...group, groups: updatedChildGroups };
          return updatedGroup;
        }
      }
      return group;
    });
  };

  // If All Children are the same of a nested level - it should propogate to the containing parent only, not the containing parent's siblings or parents

  // TODO: we should add a propogation / aggregation method for the input fields that are the headcounts 

  /**
   * Recursively propagate changes to all descendants for a specific field
   * @param groups - Current list of groups
   * @param field - Field to propagate
   * @param value - Value to propagate
   * @returns Updated list of groups
   */
  const propagateChange = (
    groups: GroupType[],
    field: keyof GroupType,
    value: string | number | boolean
  ): GroupType[] => {
    return groups.map((group) => {
      const updatedGroup = { ...group, [field]: value };
      if (group.groups && group.groups.length > 0) {
        updatedGroup.groups = propagateChange(group.groups, field, value);
      }
      return updatedGroup;
    });
  };

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
