import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './Tabs'

const meta = {
  argTypes: {
    className: { control: 'text' },
  },
  component: TabsRoot,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof TabsRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'custom-tabs',
  },
  render: args => {
    const [activeTab, setActiveTab] = useState('general')

    return (
      <TabsRoot onValueChange={setActiveTab} value={activeTab} {...args}>
        <TabsList>
          <TabsTrigger value={'general'}>General Information</TabsTrigger>
          <TabsTrigger value={'devices'}>Devices</TabsTrigger>
          <TabsTrigger value={'account'}>Account Management</TabsTrigger>
          <TabsTrigger value={'payments'}>My Payments</TabsTrigger>
        </TabsList>

        <TabsContent value={'general'}>Content for General Information</TabsContent>
        <TabsContent value={'devices'}>Content for Devices</TabsContent>
        <TabsContent value={'account'}>Content for Account Management</TabsContent>
        <TabsContent value={'payments'}>Content for My Payments</TabsContent>
      </TabsRoot>
    )
  },
}

export const WithSelectedStyle: Story = {
  args: {
    className: 'custom-tabs',
  },
  render: args => {
    const [activeTab, setActiveTab] = useState('general')

    return (
      <TabsRoot onValueChange={setActiveTab} value={activeTab} {...args}>
        <TabsList>
          <TabsTrigger className={activeTab === 'general' ? 'selected' : ''} value={'general'}>
            General Information
          </TabsTrigger>
          <TabsTrigger className={activeTab === 'devices' ? 'selected' : ''} value={'devices'}>
            Devices
          </TabsTrigger>
          <TabsTrigger className={activeTab === 'account' ? 'selected' : ''} value={'account'}>
            Account Management
          </TabsTrigger>
          <TabsTrigger className={activeTab === 'payments' ? 'selected' : ''} value={'payments'}>
            My Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value={'general'}>Content for General Information</TabsContent>
        <TabsContent value={'devices'}>Content for Devices</TabsContent>
        <TabsContent value={'account'}>Content for Account Management</TabsContent>
        <TabsContent value={'payments'}>Content for My Payments</TabsContent>
      </TabsRoot>
    )
  },
}
