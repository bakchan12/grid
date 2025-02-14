import MuiXDataGrid from "../../components/grid/mui-x/mui-x-data-grid.tsx";
import {Meta, StoryObj} from "@storybook/react";
import {muiColumns, muiRows} from "../../components/grid";
import {useArgs} from "@storybook/preview-api";

const meta = {
    title: 'Example/Grid/MuiXDataGrid',
    component: MuiXDataGrid,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        rows: muiRows,
        columns: muiColumns,
    },
} satisfies Meta<typeof MuiXDataGrid>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [currentArgs, updateArgs] = useArgs();
        return <MuiXDataGrid {...args} rows={args.rows} columns={args.columns} />;
    }
};