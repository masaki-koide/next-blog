import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../generated/graphql'

if (!process.env.CMS_API_URL || !process.env.CMS_API_TOKEN) {
  // eslint-disable-next-line no-console -- Due to build time error
  console.error(
    '🥺The environment variables CMS_API_URL and CMS_API_TOKEN are not set.'
  )
  process.exit(1)
}

const client = new GraphQLClient(process.env.CMS_API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
  },
})

export const sdk = getSdk(client)
