import type { StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { Button } from './Button';

// TODO: support meta as const
// const meta = {
//   // title: 'Example/Button',
//   component: Button,
//   tags: ['autodocs'],
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } satisfies Meta<typeof Button>;
// export default meta;
// type Story = StoryObj<typeof meta>;

export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
// TODO: support `as Meta` and `satisfies Meta`

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  play: async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await expect(false).toBe(true);
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
