import { useState, useRef, useMemo, useCallback } from "react";
import DataGrid, {
    Column,
    SortColumn,
    SelectColumn,
    DataGridHandle, textEditor,
} from "react-data-grid";
import { faker } from "@faker-js/faker";

import 'react-data-grid/lib/styles.css';

interface Row {
    id: number;
    title: string;
    client: string;
    progress: number;
}

function getColumns(
    filters: Record<string, string>,
    onHeaderFilterChange: (key: string, value: string) => void
): readonly Column<Row>[] {
    return [
        SelectColumn,
        {
            key: "id",
            name: "ID",
            frozen: true,
            resizable: false,
            renderHeaderCell: ({ column }) => (
                <input
                    type="text"
                    placeholder="Filter ID"
                    value={filters[column.key] || ""}
                    onChange={(e) => onHeaderFilterChange(column.key, e.target.value)}
                />
            ),
        },
        {
            key: "title",
            name: "Task",
            frozen: true,
            renderEditCell: textEditor,
            renderHeaderCell: ({ column }) => (
                <input
                    type="text"
                    placeholder="Filter Task"
                    value={filters[column.key] || ""}
                    onChange={(e) => onHeaderFilterChange(column.key, e.target.value)}
                />
            ),
        },
        {
            key: "client",
            name: "Client",
            draggable: true,
            renderEditCell: textEditor,
            renderHeaderCell: ({ column }) => (
                <input
                    type="text"
                    placeholder="Filter Client"
                    value={filters[column.key] || ""}
                    onChange={(e) => onHeaderFilterChange(column.key, e.target.value)}
                />
            ),
        },
        {
            key: "progress",
            name: "Completion",
            renderCell: ({ row }) => (
                <>
                    <progress max={100} value={row.progress} style={{ width: 50 }} /> {Math.round(row.progress)}%
                </>
            ),
        },
    ];
}

function rowKeyGetter(row: Row): number {
    return row.id;
}

function createRows(): readonly Row[] {
    const rows: Row[] = [];

    for (let i = 0; i < 1000; i++) {
        rows.push({
            id: i,
            title: `Task #${i + 1}`,
            client: faker.company.name(),
            progress: Math.random() * 100,
        });
    }

    return rows;
}

function getComparator(sortColumn: string): (a: Row, b: Row) => number {
    switch (sortColumn) {
        case "title":
        case "client":
            return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
        case "id":
        case "progress":
            return (a, b) => a[sortColumn] - b[sortColumn];
        default:
            throw new Error(`Unsupported sortColumn: "${sortColumn}"`);
    }
}

export default function CommonFeatures() {
    const [rows, setRows] = useState(createRows);
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
    const [filters, setFilters] = useState<Record<string, string>>({});
    const gridRef = useRef<DataGridHandle>(null);

    const onHeaderFilterChange = useCallback((key: string, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }, []);

    const columns = useMemo(() => getColumns(filters, onHeaderFilterChange), [filters]);

    const getFilteredSortedRows = useMemo((): readonly Row[] => {
        const filtered = rows.filter((row) =>
            Object.entries(filters).every(([key, value]) =>
                row[key as keyof Row]?.toString().toLowerCase().includes(value.toLowerCase())
            )
        );

        if (sortColumns.length === 0) return filtered;

        return [...filtered].sort((a, b) => {
            for (const sort of sortColumns) {
                const comparator = getComparator(sort.columnKey);
                const compResult = comparator(a, b);
                if (compResult !== 0) {
                    return sort.direction === "ASC" ? compResult : -compResult;
                }
            }
            return 0;
        });
    }, [rows, filters, sortColumns]);

    return (
        <DataGrid
            ref={gridRef}
            rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={getFilteredSortedRows}
            defaultColumnOptions={{
                sortable: true,
                resizable: true,
            }}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onRowsChange={setRows}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            className="fill-grid"
        />
    );
}
