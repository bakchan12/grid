import { Meta, StoryObj } from "@storybook/react";
import CommonFeatures from "../../components/grid/react-data-grid/react-data-grid.tsx";

const meta = {
    title: "Example/Grid/ReactDataGrid",
    component: CommonFeatures,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CommonFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <CommonFeatures />
};
