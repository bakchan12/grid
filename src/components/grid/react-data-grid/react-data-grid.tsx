import { useState } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";

interface IRow {
    id: number;
    make: string;
    model: string;
    price: number;
    checkbox: boolean;
}

interface Props {
    columns: Column<IRow>[];
    rows: IRow[];
    onRowsChange: (rows: IRow[]) => void;
    onColumnsChange: (columns: Column<IRow>[]) => void;
}

export default function MyDataGrid({ columns, rows, onRowsChange, onColumnsChange }: Props) {
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

    // ✅ 체크박스 값 변경 핸들러
    const handleCheckboxChange = (id: number) => {
        onRowsChange(
            rows.map((row) => (row.id === id ? { ...row, checkbox: !row.checkbox } : row))
        );
    };

    // ✅ 전체 선택 체크박스 상태 계산
    const allChecked = rows.every((row) => row.checkbox);
    const someChecked = rows.some((row) => row.checkbox) && !allChecked;

    // ✅ 전체 선택 체크박스 클릭 핸들러
    const handleSelectAll = () => {
        const newCheckboxState = !allChecked; // 현재 상태 반대로 변경
        onRowsChange(rows.map((row) => ({ ...row, checkbox: newCheckboxState })));
    };

    // ✅ 헤더(컬럼) 순서 변경 핸들러
    const handleColumnReorder = (sourceKey: string, targetKey: string) => {
        const sourceIndex = columns.findIndex((col) => col.key === sourceKey);
        const targetIndex = columns.findIndex((col) => col.key === targetKey);

        if (sourceIndex === -1 || targetIndex === -1) return;

        const updatedColumns = [...columns];
        const [movedColumn] = updatedColumns.splice(sourceIndex, 1);
        updatedColumns.splice(targetIndex, 0, movedColumn);

        onColumnsChange(updatedColumns); // ✅ 부모 컴포넌트에 변경된 컬럼 전달
    };

    // ✅ 정렬 로직 적용
    const sortedRows = [...rows].sort((a, b) => {
        for (const sort of sortColumns) {
            const key = sort.columnKey as keyof IRow;
            const direction = sort.direction === "ASC" ? 1 : -1;
            if (a[key] < b[key]) return -1 * direction;
            if (a[key] > b[key]) return 1 * direction;
        }
        return 0;
    });

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <DataGrid
                columns={columns.map((col) =>
                    col.key === "checkbox"
                        ? {
                            ...col,
                            name: (
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    ref={(input) => {
                                        if (input) input.indeterminate = someChecked;
                                    }}
                                    onChange={handleSelectAll}
                                />
                            ),
                            renderCell: ({ row }) => (
                                <input
                                    type="checkbox"
                                    checked={row.checkbox}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            ),
                        }
                        : col
                )}
                rows={sortedRows}
                sortColumns={sortColumns}
                onSortColumnsChange={setSortColumns}
                onRowsChange={onRowsChange}
                onColumnsReorder={handleColumnReorder}
                defaultColumnOptions={{
                    resizable: true,
                    sortable: true,
                    draggable: true,
                }}
            />
        </div>
    );
}
