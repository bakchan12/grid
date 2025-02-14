import {Meta, StoryObj} from "@storybook/react";
import TanStackTable from "../../components/grid/tanstack/tan-stack-table.tsx";
import {tanstackInitialData} from "../../components/grid";
import {useArgs} from "@storybook/preview-api";

const meta = {
    title: 'Example/Grid/Tanstack',
    component: TanStackTable,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        initialData: tanstackInitialData,
    },
} satisfies Meta<typeof TanStackTable>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [data, updateArgs] = useArgs();

        return <TanStackTable {...args} initialData={args.initialData} />
    }
};