"use strict";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import './ag-grid.css';
import './ag-theme-quartz.css';
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  IGroupCellRendererParams,
  IDetailCellRendererParams,
  ModuleRegistry,
  GetRowIdParams,
  GridReadyEvent,
} from "@ag-grid-community/core";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

// SimpleCellRenderer Component
const SimpleCellRenderer = (props: any) => {
  return <span>{props.value}</span>;
};

// Data Generation Function with Nested Groups
export function getData(): any[] {
  const rowData: any[] = [];

  // Sample data for events with nested travel groups
  const events = [
    {
      eventName: "Tech Conference 2024",
      location: "New York",
      date: "2024-05-20",
      emissions: "5000 kg",
      travelGroups: [
        {
          groupName: "Group A",
          travelType: "Air",
          travelClass: "Economy",
          headCount: 100,
          emissions: "2000 kg",
          subTravelGroups: [
            {
              groupName: "Group A.1",
              travelType: "Air",
              travelClass: "Mixed",
              headCount: 50,
              emissions: "1000 kg",
              subTravelGroups: [
                {
                  groupName: "Group A.1.1",
                  travelType: "Air",
                  travelClass: "First",
                  headCount: 25,
                  emissions: "500 kg",
                },
                {
                  groupName: "Group A.1.2",
                  travelType: "Air",
                  travelClass: "Business",
                  headCount: 25,
                  emissions: "500 kg",
                },
              ],
            },
            {
              groupName: "Group A.2",
              travelType: "Air",
              travelClass: "Economy",
              headCount: 50,
              emissions: "1000 kg",
            },
          ],
        },
        {
          groupName: "Group B",
          travelType: "Train",
          travelClass: "First",
          headCount: 50,
          emissions: "1000 kg",
          subTravelGroups: [
            {
              groupName: "Group B.1",
              travelType: "Train",
              travelClass: "Standard",
              headCount: 25,
              emissions: "500 kg",
            },
            {
              groupName: "Group B.2",
              travelType: "Train",
              travelClass: "First",
              headCount: 25,
              emissions: "500 kg",
            },
          ],
        },
      ],
    },
    {
      eventName: "Health Summit 2024",
      location: "London",
      date: "2024-06-15",
      emissions: "3000 kg",
      travelGroups: [
        {
          groupName: "Group C",
          travelType: "Bus",
          travelClass: "Standard",
          headCount: 80,
          emissions: "800 kg",
          subTravelGroups: [
            {
              groupName: "Group C.1",
              travelType: "Bus",
              travelClass: "Luxury",
              headCount: 40,
              emissions: "400 kg",
            },
            {
              groupName: "Group C.2",
              travelType: "Bus",
              travelClass: "Standard",
              headCount: 40,
              emissions: "400 kg",
            },
          ],
        },
        {
          groupName: "Group D",
          travelType: "Car",
          travelClass: "SUV",
          headCount: 40,
          emissions: "1200 kg",
          subTravelGroups: [
            {
              groupName: "Group D.1",
              travelType: "Car",
              travelClass: "Sedan",
              headCount: 20,
              emissions: "600 kg",
            },
            {
              groupName: "Group D.2",
              travelType: "Car",
              travelClass: "SUV",
              headCount: 20,
              emissions: "600 kg",
            },
          ],
        },
      ],
    },
    // Add more events as needed
  ];

  // Recursive function to flatten nested travel groups
  const flattenTravelGroups = (
    travelGroups: any[],
    parentGroupName: string | null = null
  ) => {
    travelGroups.forEach((group) => {
      const newGroup = {
        ...group,
        parentGroupName: parentGroupName,
      };
      rowData.push(newGroup);
      if (group.subTravelGroups && group.subTravelGroups.length > 0) {
        flattenTravelGroups(group.subTravelGroups, group.groupName);
      }
    });
  };

  // Populate rowData with flattened travel groups
  events.forEach((event) => {
    rowData.push({
      eventName: event.eventName,
      location: event.location,
      date: event.date,
      emissions: event.emissions,
      travelGroups: event.travelGroups,
    });
    flattenTravelGroups(event.travelGroups);
  });

  return rowData;
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>(getData());

  // Column Definitions for Main Grid
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "Event Name",
      field: "eventName",
      sortable: true,
      filter: true,
      cellRenderer: "agGroupCellRenderer",
      rowGroup: true,
      hide: true, // Hide the column since it's used for grouping
    },
    { headerName: "Location", field: "location", sortable: true, filter: true },
    { headerName: "Date", field: "date", sortable: true, filter: "agDateColumnFilter" },
    { headerName: "Emissions", field: "emissions", sortable: true, filter: true },
  ]);

  // Default Column Definitions
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  // Row ID Getter
  const getRowId = useCallback((params: GetRowIdParams) => {
    // Unique ID based on eventName and groupName hierarchy
    if (params.data.eventName && !params.data.groupName) {
      return params.data.eventName;
    } else if (params.data.groupName && !params.data.parentGroupName) {
      return params.data.groupName;
    } else if (params.data.groupName && params.data.parentGroupName) {
      return `${params.data.parentGroupName} > ${params.data.groupName}`;
    }
    return null;
  }, []);

  // Detail Cell Renderer Params
  const detailCellRendererParams = useMemo<IDetailCellRendererParams>(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: "Group Name",
            field: "groupName",
            minWidth: 200,
            cellRenderer: "agGroupCellRenderer",
            rowGroup: true,
            hide: true, // Hide the column since it's used for grouping
          },
          {
            headerName: "Travel Type",
            field: "travelType",
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              values: ["Air", "Train", "Bus", "Car"],
            },
          },
          {
            headerName: "Travel Class",
            field: "travelClass",
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              values: ["Economy", "Mixed", "Standard", "First", "Business", "SUV"],
            },
          },
          {
            headerName: "HeadCount",
            field: "headCount",
            editable: true,
            cellEditor: "agNumericCellEditor",
          },
          {
            headerName: "Emissions",
            field: "emissions",
          },
        ],
        defaultColDef: {
          flex: 1,
          minWidth: 150,
          resizable: true,
          sortable: true,
          filter: true,
        },
        // Enable row grouping within the detail grid
        rowGroupPanelShow: "always",
        animateRows: true,
        groupDefaultExpanded: -1, // Expand all groups by default
        groupDisplayType: "multipleColumns",
        // Define how to group
        groupIncludeFooter: true,
        groupIncludeTotalFooter: true,
        // Cell Renderer Params for Group Name
        groupRowRendererParams: {
          suppressCount: true,
          innerRenderer: "simpleCellRenderer",
        } as IGroupCellRendererParams,
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.travelGroups);
      },
    };
  }, []);

  // Grid Ready Event Handler
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div
    className="ag-theme-quartz" // applying the Data Grid theme
    style={{ height: 500 }} // the Data Grid will fill the size of the parent container
   >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          getRowId={getRowId}
          onGridReady={onGridReady}
          rowSelection="multiple"
          groupSelectsChildren={true}
          animateRows={true}
          // Enable row grouping in the main grid
          groupDisplayType="multipleColumns"
        />
    </div>
  );
};
export default GridExample;
