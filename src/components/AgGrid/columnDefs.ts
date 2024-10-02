// columnDefs.ts
import { ColDef } from 'ag-grid-community';

export const eventColumns: ColDef[] = [
  { field: 'eventName', headerName: 'Event Name', resizable: true },
  { field: 'location', headerName: 'Location', resizable: true },
  { field: 'time', headerName: 'Time', resizable: true },
];

export const groupColumns: ColDef[] = [
  { field: 'groupName', headerName: 'Group Name', resizable: true },
  {
    field: 'origin',
    headerName: 'Origin',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['City A', 'City B', 'City C'],
    },
    editable: true,
  },
  {
    field: 'travelType',
    headerName: 'Travel Type',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Car', 'Bus', 'Plane'],
    },
    editable: true,
  },
  {
    field: 'classType',
    headerName: 'Class',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Economy', 'Business', 'First Class'],
    },
    editable: true,
  },
  {
    field: 'headCount',
    headerName: 'Head Count',
    editable: true,
    valueParser: (params) => Number(params.newValue),
  },
  { field: 'emissions', headerName: 'Emissions (kg)', editable: false },
];

export const partnerColumns: ColDef[] = [
  { field: 'partnerName', headerName: 'Partner Name', resizable: true },
  { field: 'contact', headerName: 'Contact', resizable: true },
];
