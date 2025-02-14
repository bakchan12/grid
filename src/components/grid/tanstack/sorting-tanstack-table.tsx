import { useMemo, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
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

export default function SortingTanStackTable() {
    const tData: User[] = [
        { firstName: "Tanner", lastName: "Linsley", age: 33, visits: 100, progress: 50, status: "Married" },
        { firstName: "Kevin", lastName: "Vandy", age: 27, visits: 200, progress: 100, status: "Single" }
    ];

    const columnHelper = createColumnHelper<User>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("firstName", {
                header: "성",
                size: 150,
                enableSorting: true,
                enableResizing: true
            }),
            columnHelper.accessor("lastName", {
                header: "이름",
                size: 150,
                enableSorting: true,
                enableResizing: true
            }),
            columnHelper.accessor("age", {
                header: "나이",
                size: 100,
                enableSorting: true,
                enableResizing: true
            }),
            columnHelper.accessor("visits", {
                header: "방문수",
                size: 120,
                enableSorting: true,
                enableResizing: true
            }),
            columnHelper.accessor("progress", {
                header: "진척도",
                size: 120,
                enableSorting: true,
                enableResizing: true
            }),
            columnHelper.accessor("status", {
                header: "결혼유무",
                size: 120,
                enableSorting: true,
                enableResizing: true
            })
        ],
        []
    );

    const [data, setData] = useState<User[]>(tData);
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // 정렬 활성화
        columnResizeMode: "onChange", // 리사이징 모드 추가
        onSortingChange: setSorting,
        state: { sorting }
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
                                textAlign: "left",
                                width: `${header.column.getSize()}px`
                            }}
                        >
                            {/* 정렬 기능 */}
                            <div
                                {...{
                                    onClick: header.column.getToggleSortingHandler(),
                                    style: { cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center" }
                                }}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                                {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                            </div>
                            {/* 리사이징 핸들러 */}
                            {header.column.getCanResize() && (
                                <div
                                    {...{
                                        onMouseDown: header.getResizeHandler(),
                                        onTouchStart: header.getResizeHandler(),
                                        style: {
                                            position: "absolute",
                                            right: 0,
                                            top: 0,
                                            height: "100%",
                                            width: "5px",
                                            cursor: "col-resize",
                                            backgroundColor: "gray"
                                        }
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
                        <td
                            key={cell.id}
                            style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
