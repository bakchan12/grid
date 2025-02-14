import { useMemo, useState } from "react";
import type {
    ColDef,
    RowSelectionOptions,
    ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    sampleData: IRow[];
}

// Row Data Interface
interface IRow {
    mission: string;
    company: string;
    location: string;
    date: string;
    time: string;
    rocket: string;
    price: number;
    successful: boolean;
}

export default function GridExample({ sampleData }: Props) {
    const [rowData, setRowData] = useState<IRow[]>(sampleData);

    const [colDefs] = useState<ColDef[]>([
        {
            field: "mission",
            width: 150,
        },
        {
            field: "company",
            width: 130,
            cellRenderer: CompanyLogoRenderer,
        },
        {
            field: "location",
            width: 225,
        },
        {
            field: "date",
            valueFormatter: dateFormatter,
        },
        {
            field: "price",
            width: 130,
            valueFormatter: (params: ValueFormatterParams) => {
                return "£" + params.value.toLocaleString();
            },
        },
        {
            field: "successful",
            width: 120,
            cellRenderer: MissionResultRenderer,
        },
        { field: "rocket" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true,
        };
    }, []);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={false}
                rowSelection={rowSelection}
                onSelectionChanged={(event) => console.log("Row Selected!")}
                onCellValueChanged={(event) =>
                    console.log(`New Cell Value: ${event.value}`)
                }
            />
        </div>
    );
};

// Custom Cell Renderer (Display logos based on cell value)
const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
    <span
        style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
        }}
    >
    {params.value && (
        <img
            alt={`${params.value} Flag`}
            src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
            style={{
                display: "block",
                width: "25px",
                height: "auto",
                maxHeight: "50%",
                marginRight: "12px",
                filter: "brightness(1.1)",
            }}
        />
    )}
        <p
            style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
      {params.value}
    </p>
  </span>
);

/* Custom Cell Renderer (Display tick / cross in 'Successful' column) */
const MissionResultRenderer = (params: CustomCellRendererProps) => (
    <span
        style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
        }}
    >
    {
        <img
            alt={`${params.value}`}
            src={`https://www.ag-grid.com/example-assets/icons/${params.value ? "tick-in-circle" : "cross-in-circle"}.png`}
            style={{ width: "auto", height: "auto" }}
        />
    }
  </span>
);

/* Format Date Cells */
const dateFormatter = (params: ValueFormatterParams): string => {
    return new Date(params.value).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    headerCheckbox: false,
};

