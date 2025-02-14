import {Meta, StoryObj} from "@storybook/react";
import GridExample from "../../components/grid/ag-grid/ag-grid-test.tsx";
import {sampleData} from "../../components/grid";
import {useArgs} from "@storybook/preview-api";

const meta = {
    title: 'Example/Grid/AgGridReact',
    component: GridExample,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        sampleData,
    },
} satisfies Meta<typeof GridExample>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [currentArgs, updateArgs] = useArgs();

        return <GridExample {...args} sampleData={args.sampleData} />;
    },
};
