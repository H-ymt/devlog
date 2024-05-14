import { getOgImage } from '@/components/OgImage'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function getStaticPaths() {
  const posts = await getCollection('blog')

  return posts.map((post) => {
    return {
      params: { slug: post.slug },
    }
  })
}

export async function GET({ params }: APIContext) {
  const { slug } = params
  if (!slug) return { status: 404 }

  const post = (await getCollection('blog')).find((post) => post.slug === slug)
  if (!post) return { status: 404 }

  const title = post.data.title ?? 'No title'
  const body = await getOgImage(title)

  return new Response(body, {
    headers: {
      'content-type': 'image/png',
    },
  })
}
