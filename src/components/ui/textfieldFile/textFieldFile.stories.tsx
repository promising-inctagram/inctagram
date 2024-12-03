import type { StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/components/ui'
import { TextFieldFile } from '@/components/ui/textfieldFile/textFieldFile'
import * as z from 'zod'

const meta = {
  argTypes: {
    children: {
      description: 'React node component serving as a trigger for an input.',
    },
    setError: {
      description: 'A function that takes an error as a string in its arguments.',
    },
    setFile: {
      action: 'file upload',
      description: 'A function that sets the selected file.',
    },
    zodSchema: {
      description: 'A Zod schema for validating the input file.',
    },
  },
  component: TextFieldFile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/TextFieldFile',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Button asComponent={'span'}>input file</Button>,
  },
}

export const Controlled: Story = {
  args: {
    children: <Button asComponent={'span'}>input file</Button>,
  },
  render: () => {
    const [file, setFile] = useState<File | null>(null)

    return (
      <>
        <TextFieldFile setSelectedImage={setFile}>
          <Button asComponent={'span'}>input file</Button>
        </TextFieldFile>

        <div style={{ marginBottom: '10px', marginTop: '10px' }}>Name: {file?.name}</div>
        <div>Size: {file?.size}</div>
      </>
    )
  },
}
