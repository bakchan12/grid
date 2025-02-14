import { useState, useRef } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel, getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

type User = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: string;
};

interface Props {
    initialData: User[];
}

export default function TanStackTable({initialData}: Props) {
    const [data, setData] = useState<User[]>(initialData);
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const columnHelper = createColumnHelper<User>();

    // 🔥 모든 셀을 input으로 변환
    const columns = data[0]
        ? Object.keys(data[0]).map((key) =>
            columnHelper.accessor(key as keyof User, {
                header: key.toUpperCase(),
                cell: ({ row, column }) => {
                    const isEditing = editingCell?.rowIndex === row.index && editingCell.columnId === column.id;
                    return isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            defaultValue={row.original[column.id as keyof User] as string}
                            onBlur={(e) => handleSave(row.index, column.id, e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave(row.index, column.id, e.currentTarget.value)}
                            autoFocus
                            style={{ width: "100%", padding: "4px", border: "1px solid #ddd" }}
                        />
                    ) : (
                        <span onClick={() => setEditingCell({ rowIndex: row.index, columnId: column.id })}>
                              {row.original[column.id as keyof User] as string}
                          </span>
                    );
                },
            })
        )
        : [];

    const handleSave = (rowIndex: number, columnId: string, value: string) => {
        setData((prev) =>
            prev.map((row, index) =>
                index === rowIndex ? { ...row, [columnId]: value } : row
            )
        );
        setEditingCell(null); // 편집 완료 후 모드 해제
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange',
    });

    return (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            style={{
                                position: "relative",
                                borderBottom: "2px solid #ddd",
                                padding: "8px",
                                textAlign: 'left',
                                cursor: "pointer",
                                width: `${header.column.getSize()}px`
                            }}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                            {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                            {header.column.getCanResize() && (
                                <div
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                        width: "2px",
                                        height: "100%",
                                        cursor: "col-resize",
                                        backgroundColor: "#BBB"
                                    }}
                                />
                            )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
