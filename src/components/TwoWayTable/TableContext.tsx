// components/TwoWayTable/TableContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { EventType, GroupType, eventsData } from "./data";

// Define the shape of the context
export interface TableContextProps {
    events: EventType[];
    toggleEventExpand: (eventId: number) => void;
    handleGroupUpdate: (
        groupId: number,
        field: keyof GroupType,
        value: string | number | boolean,
        level: number
    ) => void;
}

// Create the context with default values
export const TableContext = createContext<TableContextProps | undefined>(undefined);

// Provider component
interface TableProviderProps {
    children: ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
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
            updatedEvents = toggleGroupExpansion(updatedEvents, groupId, value as boolean);
        } else if (field === "headCount") {
            // Handle headCount updates
            updatedEvents = updateHeadCount(updatedEvents, groupId, value as number, level);
            console.log(updatedEvents)
        } else {
            // Handle other fields (origin, travelType, travelClass)
            updatedEvents = propagateChangeDownwards(updatedEvents, groupId, field, value);
            updatedEvents = propagateMixedUpwards(updatedEvents, groupId, field);
        }

        // Update the state with the new events data
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
        return eventsList.map((event) => ({
            ...event,
            groups: toggleGroupExpansionRecursive(event.groups, groupId, isExpanded),
        }));
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
            }
            if (group.groups && group.groups.length > 0) {
                return {
                    ...group,
                    groups: toggleGroupExpansionRecursive(group.groups, groupId, isExpanded),
                };
            }
            return group;
        });
    };

    /**
     * Recursively update headCount and propagate the sum upwards
     * @param eventsList - Current list of events
     * @param groupId - ID of the group to update
     * @param newHeadCount - New headCount value
     * @param level - Current level of the group being updated
     * @returns Updated list of events
     */
    const updateHeadCount = (
        eventsList: EventType[],
        groupId: number,
        newHeadCount: number,
        level: number
    ): EventType[] => {
        console.log(newHeadCount,"w")
        return eventsList.map((event) => ({
            ...event,
            groups: updateHeadCountRecursive(event.groups, groupId, newHeadCount, level),
        }));
    };

    /**
     * Recursive function to update headCount and propagate the sum upwards
     * @param groups - Current list of groups
     * @param groupId - ID of the group to update
     * @param newHeadCount - New headCount value
     * @param level - Current level of the group being updated
     * @returns Updated list of groups
     */
    const updateHeadCountRecursive = (
        groups: GroupType[],
        groupId: number,
        newHeadCount: number,
        level: number
    ): GroupType[] => {
        return groups.map((group) => {
            if (group.id === groupId) {
                // Allow updating headCount only if level >= 2 and it's a leaf node
                if (level >= 2 && group.groups.length === 0) {
                    return { ...group, headCount: newHeadCount };
                }
                // Prevent editing headCount of level 1 or non-leaf nodes
                return group;
            }

            if (group.groups && group.groups.length > 0) {
                const updatedChildren = updateHeadCountRecursive(group.groups, groupId, newHeadCount, level + 1);
                const totalHeadCount = updatedChildren.reduce((sum, child) => sum + child.headCount, 0);
                return { ...group, headCount: totalHeadCount, groups: updatedChildren };
            }

            return group;
        });
    };

    /**
     * Recursively propagate changes downwards for non-headCount fields
     * @param eventsList - Current list of events
     * @param groupId - ID of the group where the change originated
     * @param field - Field to propagate
     * @param value - Value to propagate
     * @returns Updated list of events
     */
    const propagateChangeDownwards = (
        eventsList: EventType[],
        groupId: number,
        field: keyof GroupType,
        value: string | number | boolean
    ): EventType[] => {
        return eventsList.map((event) => ({
            ...event,
            groups: propagateChangeRecursive(event.groups, groupId, field, value),
        }));
    };

    /**
     * Recursive helper to propagate field changes downwards
     * @param groups - Current list of groups
     * @param targetGroupId - ID of the group to start updating from
     * @param field - Field to update
     * @param value - New value for the field
     * @returns Updated list of groups
     */
    const propagateChangeRecursive = (
        groups: GroupType[],
        targetGroupId: number,
        field: keyof GroupType,
        value: string | number | boolean
    ): GroupType[] => {
        return groups.map((group) => {
            if (group.id === targetGroupId) {
                const updatedGroup = { ...group, [field]: value };
                if (group.groups && group.groups.length > 0) {
                    updatedGroup.groups = propagateChangeDownwardsField(field, value, group.groups);
                }
                return updatedGroup;
            }
            if (group.groups && group.groups.length > 0) {
                return {
                    ...group,
                    groups: propagateChangeRecursive(group.groups, targetGroupId, field, value),
                };
            }
            return group;
        });
    };

    /**
     * Helper function to propagate field changes to all descendants
     * @param field - Field to update
     * @param value - New value for the field
     * @param groups - Current list of groups
     * @returns Updated list of groups
     */
    const propagateChangeDownwardsField = (
        field: keyof GroupType,
        value: string | number | boolean,
        groups: GroupType[]
    ): GroupType[] => {
        return groups.map((group) => {
            const updatedGroup = { ...group, [field]: value };
            if (group.groups && group.groups.length > 0) {
                updatedGroup.groups = propagateChangeDownwardsField(field, value, group.groups);
            }
            return updatedGroup;
        });
    };

    /**
     * Propagate "Mixed" state upwards based on children's field values
     * @param eventsList - Current list of events
     * @param groupId - ID of the group that was updated
     * @param field - Field that was updated
     * @returns Updated list of events
     */
    const propagateMixedUpwards = (
        eventsList: EventType[],
        groupId: number,
        field: keyof GroupType
    ): EventType[] => {
        return eventsList.map((event) => ({
            ...event,
            groups: propagateMixedUpwardsRecursive(event.groups, groupId, field),
        }));
    };

    /**
     * Recursive helper to propagate "Mixed" state upwards
     * @param groups - Current list of groups
     * @param groupId - ID of the group that was updated
     * @param field - Field that was updated
     * @returns Updated list of groups
     */
    const propagateMixedUpwardsRecursive = (
        groups: GroupType[],
        groupId: number,
        field: keyof GroupType
    ): GroupType[] => {
        return groups.map((group) => {
            if (group.groups && group.groups.length > 0) {
                const updatedChildGroups = propagateMixedUpwardsRecursive(group.groups, groupId, field);
                const childFieldValues = updatedChildGroups.map((child) => child[field]);
                const uniqueValues = Array.from(new Set(childFieldValues));

                let updatedGroup = { ...group, groups: updatedChildGroups };

                if (uniqueValues.length === 1) {
                    // All children have the same value; set the parent to that value
                    if (updatedGroup[field] !== uniqueValues[0]) {
                        updatedGroup[field] = uniqueValues[0] as GroupType[keyof GroupType];
                    }
                } else {
                    // Children have mixed values; set the parent to 'Mixed'
                    if (updatedGroup[field] !== "Mixed") {
                        updatedGroup[field] = "Mixed";
                    }
                }

                return updatedGroup;
            }
            return group;
        });
    };

    return (
        <TableContext.Provider value={{ events, toggleEventExpand, handleGroupUpdate }}>
            {children}
        </TableContext.Provider>
    );
};
