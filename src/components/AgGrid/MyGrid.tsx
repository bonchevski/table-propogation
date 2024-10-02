interface ICallRecord {
  callId: number;
  direction: string;
  number: string;
  duration: number;
  switchCode: string;
}

interface IAccount {
  name: string;
  account: number;
  calls: number;
  minutes: number;
  callRecords: ICallRecord[];
}



const CustomGroupRowRenderer = (props: ICellRendererParams) => {
  const { node, value, api, colDef } = props;

  const onSwitchCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    node.allLeafChildren.forEach((childNode) => {
      childNode.setDataValue("switchCode", newValue);
    });
    api.refreshCells({ force: true });
  };

  return (
    <div
      className="custom-group-row"
      style={{ display: "flex", alignItems: "center" }}
    >
      <span>{`${colDef.headerName}: ${value}`}</span>
      <span style={{ marginLeft: "20px" }}>
        Switch Code:
        <select onChange={onSwitchCodeChange} defaultValue="">
          <option value="" disabled>
            Select Switch Code
          </option>
          <option value="Switch1">Switch1</option>
          <option value="Switch2">Switch2</option>
          <option value="Switch3">Switch3</option>
        </select>
      </span>
      <span style={{ marginLeft: "20px" }}>
        Duration:{" "}
        {node.aggData && node.aggData.duration
          ? node.aggData.duration.toLocaleString()
          : 0}
        s
      </span>
    </div>
  );
};


const GridExample = () => {
  // Styles
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // State
  const [rowData, setRowData] = useState<IAccount[]>();

  // Master Grid Column Definitions
  const [columnDefs] = useState<ColDef[]>([
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    {
      field: "minutes",
      valueFormatter: (params) => `${params.value.toLocaleString()}m`,
    },
  ]);

  // Default Column Definitions
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  // Detail Grid Configuration
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "direction", rowGroup: true, hide: true },
          { field: "callId" },
          { field: "number", minWidth: 150, editable: true },
          {
            field: "duration",
            valueFormatter: (params) => `${params.value.toLocaleString()}s`,
            aggFunc: "sum",
            editable: true,
          },
          {
            field: "switchCode",
            minWidth: 150,
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              values: ["Switch1", "Switch2", "Switch3"],
            },
          },
        ],
        defaultColDef: {
          flex: 1,
          editable: true,
          resizable: true,
        },
        groupDisplayType: "groupRows",
        groupDefaultExpanded: 1,
        suppressAggFuncInHeader: true,
        groupRowRenderer: CustomGroupRowRenderer,
        groupRowRendererParams: {
          suppressCount: true,
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams<IAccount, ICallRecord>;
  }, []);

  // Event Handlers
  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data: IAccount[]) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent) => {
      setTimeout(() => {
        params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
      }, 0);
    },
    []
  );

  // Render
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<IAccount>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};


// Import React and necessary hooks
import React, {
  useCallback,
  useMemo,
  useState,
  StrictMode,
} from "react";

// Import ReactDOM for rendering
import { createRoot } from "react-dom/client";

// Import AG Grid React component and styles
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css"; // Change theme as needed

// Import AG Grid modules and types
import {
  ModuleRegistry,
  ColDef,
  GridReadyEvent,
  FirstDataRenderedEvent,
  IDetailCellRendererParams,
  ICellRendererParams,
} from "@ag-grid-community/core";

// Import AG Grid Enterprise modules
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

// Define interfaces for your data
interface ICallRecord {
  callId: number;
  direction: string;
  number: string;
  duration: number;
  switchCode: string;
}

interface IAccount {
  name: string;
  account: number;
  calls: number;
  minutes: number;
  callRecords: ICallRecord[];
}

// Custom group row renderer component for the detail grid
const CustomGroupRowRenderer = (props: ICellRendererParams) => {
  const { node, value, api, colDef } = props;

  // Event handler for when the Switch Code dropdown value changes
  const onSwitchCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    // Update the 'switchCode' value for all leaf nodes under this group
    node.allLeafChildren.forEach((childNode) => {
      childNode.setDataValue("switchCode", newValue);
    });
    // Refresh the grid cells to reflect the changes
    api.refreshCells({ force: true });
  };

  // Render the custom group row
  return (
    <div
      className="custom-group-row"
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* Display the group key (e.g., Direction: Outbound) */}
      <span>{`${colDef.headerName}: ${value}`}</span>
      {/* Dropdown for selecting Switch Code */}
      <span style={{ marginLeft: "20px" }}>
        Switch Code:
        <select onChange={onSwitchCodeChange} defaultValue="">
          <option value="" disabled>
            Select Switch Code
          </option>
          <option value="Switch1">Switch1</option>
          <option value="Switch2">Switch2</option>
          <option value="Switch3">Switch3</option>
        </select>
      </span>
      {/* Display the aggregated Duration for the group */}
      <span style={{ marginLeft: "20px" }}>
        Duration:{" "}
        {node.aggData && node.aggData.duration
          ? node.aggData.duration.toLocaleString()
          : 0}
        s
      </span>
    </div>
  );
};

// Main GridExample component
const GridExample = () => {
  // Styles for the container and grid
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // State for row data
  const [rowData, setRowData] = useState<IAccount[]>();

  // Column definitions for the master grid
  const [columnDefs] = useState<ColDef[]>([
    // 'name' field with group cell renderer for expand/collapse functionality
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    {
      field: "minutes",
      valueFormatter: (params) => `${params.value.toLocaleString()}m`,
    },
  ]);

  // Default column definitions
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  // Detail cell renderer parameters for the detail grid
  const detailCellRendererParams = useMemo(() => {
    return {
      // Grid options for the detail grid
      detailGridOptions: {
        // Column definitions for the detail grid
        columnDefs: [
          // Group by 'direction' field
          { field: "direction", rowGroup: true, hide: true },
          { field: "callId" },
          { field: "number", minWidth: 150, editable: true },
          {
            field: "duration",
            valueFormatter: (params) => `${params.value.toLocaleString()}s`,
            aggFunc: "sum", // Aggregate function to sum durations
            editable: true,
          },
          {
            field: "switchCode",
            minWidth: 150,
            editable: true,
            cellEditor: "agSelectCellEditor", // Use select dropdown editor
            cellEditorParams: {
              values: ["Switch1", "Switch2", "Switch3"],
            },
          },
        ],
        defaultColDef: {
          flex: 1,
          editable: true,
          resizable: true,
        },
        // Enable group rows
        groupDisplayType: "groupRows",
        groupDefaultExpanded: 1, // Expand groups by default
        suppressAggFuncInHeader: true, // Hide aggregation function in header
        // Use the custom group row renderer
        groupRowRenderer: CustomGroupRowRenderer,
        groupRowRendererParams: {
          suppressCount: true, // Do not show count beside group name
        },
      },
      // Provide the data to the detail grid
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams<IAccount, ICallRecord>;
  }, []);

  // Event handler when the grid is ready
  const onGridReady = useCallback((params: GridReadyEvent) => {
    // Fetch data from the server or API
    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data: IAccount[]) => {
        // Set the row data state
        setRowData(data);
      });
  }, []);

  // Event handler when the first data is rendered
  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent) => {
      // Expand the first row for demonstration
      setTimeout(() => {
        params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
      }, 0);
    },
    []
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<IAccount>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true} // Enable master-detail functionality
          detailCellRendererParams={detailCellRendererParams} // Set detail grid options
          onGridReady={onGridReady} // Grid ready event handler
          onFirstDataRendered={onFirstDataRendered} // First data rendered event handler
        />
      </div>
    </div>
  );
};

const MyGrid = () => {
  return <GridExample />;
}
export default MyGrid;