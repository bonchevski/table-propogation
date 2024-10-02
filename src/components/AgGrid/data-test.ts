export const data = [
    {
      ID: 1,
      eventName: 'Annual Kickoff',
      startDate: '02/04/2025',
      location: 'London, UK',
      headcount: 6600,
      emissions: 5280000,
      groupName: 'Berlin Office',
      origin: 'BER',
      travelMethod: 'Air',
      travelClass: 'Business',
      groupHeadcount: 780,
      groupEmissions: 624000,
      subGroups: [
        { groupName: 'Partners', origin: 'BER', travelMethod: 'Air', travelClass: 'First', headcount: 164, emissions: 65000 },
        { groupName: 'Managers', origin: 'BER', travelMethod: 'Air', travelClass: 'Business', headcount: 168, emissions: 67000 },
        { groupName: 'Consultants', origin: 'BER', travelMethod: 'Air', travelClass: 'Business', headcount: 348, emissions: 139200 },
        { groupName: 'Guests', origin: 'BER', travelMethod: 'Air', travelClass: 'Premium', headcount: 100, emissions: 40000 },
      ],
]