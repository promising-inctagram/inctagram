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
        <Checkbox checked={checked1} onCheckedChange={(checked: boolean) => setChecked1(checked)} />
        <Checkbox checked={checked2} onCheckedChange={(checked: boolean) => setChecked2(checked)} />
      </div>
    )
  },
}

export const WithChildren: Story = {
  render: args => {
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<'indeterminate' | boolean>(false)

    return (
      <div style={containerStyle}>
        <Checkbox
          checked={checked1}
          label={'children 1'}
          onCheckedChange={(checked: boolean) => setChecked1(checked)}
        />
        <Checkbox checked={checked2} label={'children 2'} onCheckedChange={setChecked2} />
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
        <Checkbox
          checked={checked1}
          disabled
          label={'disabled 1'}
          onCheckedChange={(checked: boolean) => setChecked1(checked)}
        />

        <Checkbox
          checked={checked2}
          disabled
          label={'disabled 1'}
          onCheckedChange={(checked: boolean) => setChecked2(checked)}
        />
      </div>
    )
  },
}
