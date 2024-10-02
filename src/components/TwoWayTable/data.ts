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

  export interface GroupTypeFromDB {
    id: number;
    groupName: string;
    groupsFromDb: GroupTypeFromDB[];
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
// data.ts
export const eventsData: EventType[] = [
    {
        id: 1,
        eventName: "Event A",
        location: "Location A",
        date: "2024-05-20",
        emissions: 1000,
        groups: [
            {
                id: 11,
                groupName: "Berlin Office",
                origin: "Air",
                travelType: "Air",
                travelClass: "Economy",
                headCount: 50,
                isExpanded: false,
                groups: [
                    {
                        id: 852848231,
                        groupName: "Group A1.1",
                        origin: "Air",
                        travelType: "Air",
                        travelClass: "Economy",
                        headCount: 50,
                        isExpanded: false,
                        groups: [
                            {
                                id: 31,
                                groupName: "Group A1.1.1",
                                origin: "Air",
                                travelType: "Air",
                                travelClass: "Economy",
                        isExpanded: false,
                                headCount: 50,
                                groups: [
                                    {
                                        id: 41,
                                        groupName: "Group A1.1.1.1",
                                        origin: "Air",
                                        travelType: "Air",
                                        travelClass: "Economy",
                                        headCount: 50,
                                        isExpanded: false,
                                        groups: [
                                            {
                                                id: 51,
                                                groupName: "Group A1.1.1.1.1",
                                                origin: "Air",
                                                travelType: "Air",
                                                travelClass: "Economy",
                                                headCount: 50,
                                                isExpanded: false,
                                                groups: [
                                                    {
                                                        id: 61,
                                                        groupName: "Group A1.1.1.1.1.1",
                                                        origin: "Air",
                                                        travelType: "Air",
                                                        travelClass: "Economy",
                                                        headCount: 50,
                                                        isExpanded: false,
                                                        groups: [
                                                            {
                                                                id: 71,
                                                                groupName: "Group A1.1.1.1.1.1.1",
                                                                origin: "Air",
                                                                travelType: "Air",
                                                                travelClass: "Economy",
                                                                headCount: 50,
                                                                groups: [],
                                                                isExpanded: false
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
                                id: 81928439717427,
                                groupName: "Group A1.1.2",
                                origin: "Air",
                                travelType: "Air",
                                travelClass: "Economy",
                        isExpanded: false,
                                headCount: 50,
                                groups: [
                                    {
                                        id: 127401892794821,
                                        groupName: "Group A1.1.2.1",
                                        origin: "Air",
                                        travelType: "Air",
                                        travelClass: "Economy",
                                        headCount: 50,
                                        isExpanded: false,
                                        groups: [
                                            {
                                                id: 987196291,
                                                groupName: "Group A1.1.1.1.1",
                                                origin: "Air",
                                                travelType: "Air",
                                                travelClass: "Economy",
                                                headCount: 50,
                                                isExpanded: false,
                                                groups: [
                                                    {
                                                        id: 4237847318,
                                                        groupName: "Group A1.1.1.1.1.1",
                                                        origin: "Air",
                                                        travelType: "Air",
                                                        travelClass: "Economy",
                                                        headCount: 50,
                                                        isExpanded: false,
                                                        groups: [
                                                            {
                                                                id: 87483217,
                                                                groupName: "Group A1.1.1.1.1.1.1",
                                                                origin: "Air",
                                                                travelType: "Air",
                                                                travelClass: "Economy",
                                                                headCount: 50,
                                                                groups: [],
                                                                isExpanded: false
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
                        id: 34,
                        groupName: "Group A1.2",
                        origin: "Air",
                        travelType: "Air",
                        travelClass: "Economy",
                        headCount: 50,
                        groups: [
                            {
                                id: 23,
                                groupName: "Group A1.2.2",
                                origin: "Air",
                                travelType: "Air",
                                travelClass: "Economy",
                                headCount: 50,
                                groups: [
                                    {
                                        id: 211,
                                        groupName: "Group A1.2.2.2",
                                        origin: "Air",
                                        travelType: "Air",
                                        travelClass: "Economy",
                                        headCount: 50,
                                        groups: [
                                            {
                                                id: 443,
                                                groupName: "Group A1.2.2.2.2",
                                                origin: "Air",
                                                travelType: "Air",
                                                travelClass: "Economy",
                                                headCount: 50,
                                                groups: [
                                                    {
                                                        id: 3124,
                                                        groupName: "Group A1.2.2.2.2.2",
                                                        origin: "Air",
                                                        travelType: "Air",
                                                        travelClass: "Economy",
                                                        headCount: 50,
                                                        groups: [
                                                            {
                                                                id: 7511,
                                                                groupName: "Group A1.2.2.2.2.2.2",
                                                                origin: "Air",
                                                                travelType: "Air",
                                                                travelClass: "Economy",
                                                                headCount: 50,
                                                                groups: [],
                                                                isExpanded: false
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
                id: 12,
                groupName: "Group A2",
                origin: "Land",
                travelType: "Bus",
                travelClass: "Standard",
                headCount: 30,
                groups: [],
                isExpanded: false
            }
        ]
    },
    {
        id: 2,
        eventName: "Event B",
        location: "Location B",
        date: "2024-06-15",
        emissions: 1500,
        groups: [
            {
                id: 13,
                groupName: "Group B1",
                origin: "Sea",
                travelType: "Ship",
                travelClass: "First Class",
                headCount: 20,
                groups: [],
                isExpanded: false
            },
            {
                id: 14,
                groupName: "Group B2",
                origin: "Land",
                travelType: "Train",
                travelClass: "Business",
                headCount: 40,
                groups: [],
                isExpanded: false
            }
        ]
    },
    {
        id: 3,
        eventName: "Event C",
        location: "Location C",
        date: "2024-07-10",
        emissions: 2000,
        groups: [
            {
                id: 15,
                groupName: "Group C1",
                origin: "Air",
                travelType: "Air",
                travelClass: "Business",
                headCount: 60,
                groups: [],
                isExpanded: false
            },
            {
                id: 16,
                groupName: "Group C2",
                origin: "Land",
                travelType: "Car",
                travelClass: "Standard",
                headCount: 10,
                groups: [],
                isExpanded: false
            }
        ]
    }
];