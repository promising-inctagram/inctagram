import { useState } from 'react'

import { Checkbox } from '@/components/checkbox/Checkbox'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Checkbox> = {
  args: { disabled: false },
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

const containerStyle = {
  alignItems: 'center',
  display: 'flex',
  gap: '20px',
  height: '100vh',
  justifyContent: 'center',
}

export const Default: Story = {
  render: args => {
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<boolean>(false)

    return (
      <div style={containerStyle}>
        <Checkbox checked={checked1} id={'1'} onChangeChecked={setChecked1} />
        <Checkbox checked={checked2} id={'2'} onChangeChecked={setChecked2} />
      </div>
    )
  },
}

export const WithChildren: Story = {
  render: args => {
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<boolean>(false)

    return (
      <div style={containerStyle}>
        <Checkbox checked={checked1} id={'3'} onChangeChecked={setChecked1}>
          children 1
        </Checkbox>
        <Checkbox checked={checked2} id={'4'} onChangeChecked={setChecked2}>
          children 2
        </Checkbox>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: args => {
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<boolean>(false)

    return (
      <div style={containerStyle}>
        <Checkbox checked={checked1} disabled id={'5'} onChangeChecked={setChecked1}>
          Disabled 1
        </Checkbox>
        <Checkbox checked={checked2} disabled id={'6'} onChangeChecked={setChecked2}>
          Disabled 2
        </Checkbox>
      </div>
    )
  },
}
