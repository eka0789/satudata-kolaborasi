// VLY Integrations Configuration
// See /integrations.md for usage documentation

import { createVlyIntegrations } from '@vly-ai/integrations';

const integrationKey = process.env.VLY_INTEGRATION_KEY;
if (!integrationKey) {
  console.warn(
    '[vly-integrations] VLY_INTEGRATION_KEY is not set. AI, email, and payments features will be unavailable.',
  );
}

export const vly = createVlyIntegrations({
  deploymentToken: integrationKey ?? '',
  debug: process.env.NODE_ENV === 'development',
});
