"use client";

import "./ag-grid.css";
import "./ag-theme-quartz.css";
// Remove the duplicate import statement
import { IEvent } from "./types";
import { useMemo, useState } from "react";
import { LicenseManager } from "@ag-grid-enterprise/core";
import { AgGridReact } from "@ag-grid-community/react";
import "./ag-grid.css";
import "./ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

LicenseManager.setLicenseKey(
  "Using_this_{AG_Grid}_Enterprise_key_{AG-064629}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Clarasight_PBC}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Clarasight_PBC}_only_for_{2}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_working_on_{Clarasight_PBC}_need_to_be_licensed___{Clarasight_PBC}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{6_August_2025}____[v3]_[01]_MTc1NDQzNDgwMDAwMA==b1c3148685e3c17298700954a66b1e3a"
);

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MenuModule,
  RowGroupingModule,
]);

const NewGrid = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, _setColumnDefs] = useState<ColDef[]>([
    {
      field: "eventName",
      headerName: "Event Name",
      resizable: true,
      cellRenderer: "agGroupCellRenderer",
    },
    { field: "location", headerName: "Location", resizable: true },
    { field: "time", headerName: "Time", resizable: true },
    { field: "groups", hide: true },
  ]);

  const [subColumnDefs, _setSubColumnDefs] = useState<ColDef[]>();

  const [partnerColumns, _setPartnerColumns] = useState<ColDef[]>([
    { field: "partnerName", headerName: "Partner Name", resizable: true },
    { field: "contact", headerName: "Contact", resizable: true },
  ]);
  const autoGroupColumnDef = useMemo(() => {
    return {
      field: "groups",
    };
  }, []);
  const [rowData, setRowData] = useState<IEvent[]>([
    {
      eventName: "Tech Conference",
      location: "New York",
      time: "2024-09-20",
      groups: [
        {
          groupName: "Group A",
          origin: "City A",
          travelType: "Plane",
          classType: "Business",
          headCount: 30,
          emissions: 1000,
          partners: [
            { partnerName: "Partner 1", contact: "123-456" },
            { partnerName: "Partner 2", contact: "789-012" },
          ],
        },
      ],
    },
  ]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
            {
              field: "groupName",
              headerName: "Group Name",
              resizable: true,
              cellRenderer: "agGroupCellRenderer",
            },
            {
              field: "origin",
              headerName: "Origin",
              cellEditor: "agSelectCellEditor",
              cellEditorParams: {
                values: ["City A", "City B", "City C"],
              },
              editable: true,
            },
            {
              field: "travelType",
              headerName: "Travel Type",
              cellEditor: "agSelectCellEditor",
              cellEditorParams: {
                values: ["Car", "Bus", "Plane"],
              },
              editable: true,
            },
            {
              field: "classType",
              headerName: "Class",
              cellEditor: "agSelectCellEditor",
              cellEditorParams: {
                values: ["Economy", "Business", "First Class"],
              },
              editable: true,
            },
            {
              field: "headCount",
              headerName: "Head Count",
              editable: true,
            //   valueParser: (params) => Number(params.newValue),
              valueFormatter: (params) => { return params.value + " people" }
            },
            { field: "emissions", headerName: "Emissions (kg)", editable: false, 

                valueFormatter: (params) => { return params.value + " kg" }
            },
          ],
        defaultColDef: {
            flex:1,
          resizable: true,
          editable: true,
        },
        getDetailRowData: (params: any) => {
            params.successCallback(params.data.groups);
          },
        // Configure detail level for Partners (nested inside Group)
        masterDetail: true,
        detailCellRendererParams: {
          detailGridOptions: {
            columnDefs: [
                { field: "partnerName", headerName: "Partner Name", resizable: true },
                { field: "contact", headerName: "Contact", resizable: true },
            ],
            defaultColDef: {
                flex:1,
              resizable: true,
              editable: true,
            },
          },
          getDetailRowData: (params: any) => {
            params.successCallback(params.data.partners);
          },
        },
      },
     
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      filter: true,
      sortable: true,
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          autoGroupColumnDef={autoGroupColumnDef}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
        />
      </div>
    </div>
  );
};

export { NewGrid };
