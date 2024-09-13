import { themes } from '@storybook/theming'
import type { Preview } from '@storybook/react'

import '../src/app/styles/index.scss'
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'


const preview: Preview = {
  parameters: {
    actions: { /*argTypesRegex: '^on[A-Z].*'*/onClick: fn(),
      onHover: fn(), },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}
export default preview;
