export const eventsMockData = [
    {
      groupName: "Group Alpha",
      origin: "USA",
      travelType: "Plane",
      classType: "Business",
      headCount: 100,
      emissions: 1000,
      subGroups: [
        {
          groupName: "Group Alpha1",
          origin: "Canada",
          travelType: "Car",
          classType: "Economy",
          headCount: 40,
          emissions: 400,
          subGroups: [
            {
              groupName: "Group Alpha1.1",
              origin: "Mexico",
              travelType: "Bus",
              classType: "First Class",
              headCount: 20,
              emissions: 200,
              subGroups: [
                {
                  groupName: "Group Alpha1.2",
                  origin: "Brazil",
                  travelType: "Plane",
                  classType: "Economy",
                  headCount: 30,
                  emissions: 300,
                  subGroups: [
                    {
                      groupName: "Group Alpha1.3",
                      origin: "Argentina",
                      travelType: "Car",
                      classType: "Business",
                      headCount: 25,
                      emissions: 250,
                      subGroups: [
                        {
                          groupName: "Group Alpha1.4",
                          origin: "Chile",
                          travelType: "Bus",
                          classType: "Economy",
                          headCount: 15,
                          emissions: 150,
                          subGroups: [
                            {
                              groupName: "Group Alpha1.5",
                              origin: "Peru",
                              travelType: "Plane",
                              classType: "First Class",
                              headCount: 10,
                              emissions: 100,
                              subGroups: [
                                {
                                  groupName: "Group Alpha1.6",
                                  origin: "Colombia",
                                  travelType: "Bus",
                                  classType: "Economy",
                                  headCount: 8,
                                  emissions: 80,
                                  subGroups: [
                                    {
                                      groupName: "Group Alpha1.7",
                                      origin: "Venezuela",
                                      travelType: "Car",
                                      classType: "First Class",
                                      headCount: 5,
                                      emissions: 50
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
            }
          ]
        }
      ]
    }
  ];
  