// data.ts
export interface GroupType {
    id: number;
    groupName: string;
    origin: string;
    travelType: string;
    travelClass: string;
    headCount: number;
    isExpanded?: boolean;
    groups: GroupType[];
  }
  
  export interface EventType {
    id: number;
    eventName: string;
    location: string;
    date: string;
    emissions: number;
    isExpanded?: boolean;
    groups: GroupType[];
  }
  
  // Initialize a unique ID generator
  let uniqueId = 1;
  const generateUniqueId = () => uniqueId++;
  
  // Recursively assign unique IDs to all groups
  const assignUniqueIds = (groups: Omit<GroupType, 'id'>[]): GroupType[] => {
    return groups.map(group => {
      const newGroup: GroupType = {
        ...group,
        id: generateUniqueId(),
        groups: assignUniqueIds(group.groups)
      };
      return newGroup;
    });
  };
  
  export const eventsData: EventType[] = [
    {
      id: generateUniqueId(),
      eventName: "Event A",
      location: "Location A",
      date: "2024-05-20",
      emissions: 1000,
      isExpanded: false,
      groups: assignUniqueIds([
        {
          groupName: "Berlin Office",
          origin: "Air",
          travelType: "Air",
          travelClass: "Economy",
          headCount: 0,
          isExpanded: false,
          groups: [
            {
              groupName: "Group A1.1",
              origin: "Air",
              travelType: "Air",
              travelClass: "Economy",
              headCount: 0,
              isExpanded: false,
              groups: [
                {
                  groupName: "Group A1.1.1",
                  origin: "Air",
                  travelType: "Air",
                  travelClass: "Economy",
                  headCount: 0,
                  isExpanded: false,
                  groups: [
                    {
                      groupName: "Group A1.1.1.1",
                      origin: "Air",
                      travelType: "Air",
                      travelClass: "Economy",
                      headCount: 0,
                      isExpanded: false,
                      groups: [
                        {
                          groupName: "Group A1.1.1.1.1",
                          origin: "Air",
                          travelType: "Air",
                          travelClass: "Economy",
                          headCount: 0,
                          isExpanded: false,
                          groups: [
                            {
                              groupName: "Group A1.1.1.1.1.1",
                              origin: "Air",
                              travelType: "Air",
                              travelClass: "Economy",
                              headCount: 0,
                              isExpanded: false,
                              groups: []
                            },
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  groupName: "Group A1.1.2",
                  origin: "Air",
                  travelType: "Air",
                  travelClass: "Economy",
                  headCount: 0,
                  isExpanded: false,
                  groups: [
                    {
                      groupName: "Group A1.1.2.1",
                      origin: "Air",
                      travelType: "Air",
                      travelClass: "Economy",
                      headCount: 0,
                      isExpanded: false,
                      groups: [
                        {
                          groupName: "Group A1.1.2.1.1",
                          origin: "Air",
                          travelType: "Air",
                          travelClass: "Economy",
                          headCount: 0,
                          isExpanded: false,
                          groups: [
                            {
                              groupName: "Group A1.1.2.1.1.1",
                              origin: "Air",
                              travelType: "Air",
                              travelClass: "Economy",
                              headCount: 0,
                              isExpanded: false,
                              groups: [
                                {
                                  groupName: "Group A1.1.2.1.1.1.1",
                                  origin: "Air",
                                  travelType: "Air",
                                  travelClass: "Economy",
                                  headCount: 0,
                                  isExpanded: false,
                                  groups: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              groupName: "Group A1.2",
              origin: "Air",
              travelType: "Air",
              travelClass: "Economy",
              headCount: 0,
              isExpanded: false,
              groups: [
                {
                  groupName: "Group A1.2.2",
                  origin: "Air",
                  travelType: "Air",
                  travelClass: "Economy",
                  headCount: 0,
                  isExpanded: false,
                  groups: [
                    {
                      groupName: "Group A1.2.2.2",
                      origin: "Air",
                      travelType: "Air",
                      travelClass: "Economy",
                      headCount: 0,
                      isExpanded: false,
                      groups: [
                        {
                          groupName: "Group A1.2.2.2.2",
                          origin: "Air",
                          travelType: "Air",
                          travelClass: "Economy",
                          headCount: 0,
                          isExpanded: false,
                          groups: [
                            {
                              groupName: "Group A1.2.2.2.2.2",
                              origin: "Air",
                              travelType: "Air",
                              travelClass: "Economy",
                              headCount: 0,
                              isExpanded: false,
                              groups: [
                                {
                                  groupName: "Group A1.2.2.2.2.2.2",
                                  origin: "Air",
                                  travelType: "Air",
                                  travelClass: "Economy",
                                  headCount: 0,
                                  isExpanded: false,
                                  groups: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          groupName: "Group A2",
          origin: "Land",
          travelType: "Bus",
          travelClass: "Standard",
          headCount: 0,
          isExpanded: false,
          groups: []
        }
      ])
    },
    {
      id: generateUniqueId(),
      eventName: "Event B",
      location: "Location B",
      date: "2024-06-15",
      emissions: 1500,
      isExpanded: false,
      groups: assignUniqueIds([
        {
          groupName: "Group B1",
          origin: "Sea",
          travelType: "Ship",
          travelClass: "First Class",
          headCount: 0,
          isExpanded: false,
          groups: []
        },
        {
          groupName: "Group B2",
          origin: "Land",
          travelType: "Train",
          travelClass: "Business",
          headCount: 40,
          isExpanded: false,
          groups: []
        }
      ])
    },
    {
      id: generateUniqueId(),
      eventName: "Event C",
      location: "Location C",
      date: "2024-07-10",
      emissions: 2000,
      isExpanded: false,
      groups: assignUniqueIds([
        {
          groupName: "Group C1",
          origin: "Air",
          travelType: "Air",
          travelClass: "Business",
          headCount: 60,
          isExpanded: false,
          groups: []
        },
        {
          groupName: "Group C2",
          origin: "Land",
          travelType: "Car",
          travelClass: "Standard",
          headCount: 0,
          isExpanded: false,
          groups: []
        }
      ])
    }
  ];
  