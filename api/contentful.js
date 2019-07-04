import { createClient } from 'contentful'

const client = createClient({
  space: process.env.contentfulSpaceId,
  accessToken: process.env.contentfulContentAccessToken,
})

export async function getGame(slug) {
  try {
    const entries = await client.getEntries({
      content_type: 'game',
      'fields.slug[in]': slug,
    })
    const { items } = entries
    if (!items && items.length <= 0) {
      return 'not found'
    }
    return items[0]
  } catch(e) {
    throw({ statusCode: 404, message: 'Post not found' })
  }
}

export default client