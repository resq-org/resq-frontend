import type { Preview } from '@storybook/nextjs';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/app/globals.css';
import { handlers } from '../src/mocks/handlers';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
