import { Meta, StoryObj } from "@storybook/react";
import { Column } from "react-data-grid";
import MyDataGrid from "../../components/grid/react-data-grid/react-data-grid.tsx";
import {useEffect, useState} from "react";
import { useArgs } from "@storybook/preview-api";

// ✅ 행 데이터 타입 정의
interface IRow {
    id: number;
    make: string;
    model: string;
    price: number;
    checkbox: boolean;
}

// ✅ 기본 컬럼 설정
const initialColumns: Column<IRow>[] = [
    { key: "checkbox", name: "Checkbox", sortable: false },
    { key: "make", name: "Make", sortable: true },
    { key: "model", name: "Model", sortable: true },
    { key: "price", name: "Price", sortable: true },
];

// ✅ 기본 데이터
const initialRows: IRow[] = [
    { id: 0, make: "Tesla", model: "Model Y", price: 64950, checkbox: true },
    { id: 1, make: "Ford", model: "F-Series", price: 33850, checkbox: false },
    { id: 2, make: "Toyota", model: "Corolla", price: 29600, checkbox: true },
    { id: 3, make: "Mercedes", model: "EQA", price: 48890, checkbox: true },
    { id: 4, make: "Fiat", model: "MM", price: 15774, checkbox: false },
    { id: 5, make: "Nissan", model: "Juke", price: 20675, checkbox: true },
];

const meta = {
    title: "Example/Grid/ReactDataGrid",
    component: MyDataGrid,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        columns: initialColumns,
        rows: initialRows
    },
} satisfies Meta<typeof MyDataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [{ columns, rows }, updateArgs] = useArgs();

        // ✅ 행 데이터 변경 핸들러
        const handleRowsChange = (newRows: IRow[]) => {
            updateArgs({ rows: newRows });
        };

        // ✅ 컬럼 데이터 변경 핸들러
        const handleColumnsChange = (newColumns: Column<IRow>[]) => {
            updateArgs({ columns: newColumns });
        };


        return (
            <MyDataGrid
                {...args}
                columns={columns}
                rows={rows}
                onRowsChange={handleRowsChange}
                onColumnsChange={handleColumnsChange}
            />
        );
    },
};
