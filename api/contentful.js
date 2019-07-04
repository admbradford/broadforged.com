import { createClient } from 'contentful'
import { async } from 'q';

const client = createClient({
  space: process.env.contentfulSpaceId,
  accessToken: process.env.contentfulContentAccessToken,
})

async function getEntries(params) {
  try {
    const entries = await client.getEntries(params)
    return entries
  } catch(e) {
    throw({ statusCode: 400, message: 'There was an issue'})
  }
}
export async function getGame(slug) {
  try {
    const entries = await getEntries({
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

export async function getGames() {
  try {
    const response = await getEntries({
      content_type: 'game',
      select: 'fields.name,fields.slug,fields.featuredImage',
    })
    const { items } = response
    const entries = items.map(entry => {
      return {
        name: entry.fields.name,
        slug: entry.fields.slug,
        featuredImage: entry.fields.featuredImage.fields.file.url
      }
    })
    return entries
  } catch(e) {
    throw({ statusCode: 400, message: 'There was an issue'})
  }
}

export default client