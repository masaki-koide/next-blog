import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../generated/graphql'

if (!process.env.CMS_API_URL) {
  // eslint-disable-next-line no-console -- Due to build time error
  console.error('🥺The environment variable CMS_API_URL is not set.')
  process.exit(1)
}

const client = new GraphQLClient(process.env.CMS_API_URL)
export const sdk = getSdk(client)
