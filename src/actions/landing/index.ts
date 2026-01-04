'use server'

import { client } from '@/lib/prisma'

export const onGetBlogPost = async (id: string) => {
  try {
    const post = await client.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: true,
        published: true,
        slug: true,
      },
    })

    if (post) {
      return post
    }

    return null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export const onGetAllBlogPosts = async () => {
  try {
    const posts = await client.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: true,
        slug: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const onGetBlogPostBySlug = async (slug: string) => {
  try {
    const post = await client.post.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: true,
        published: true,
        slug: true,
      },
    })

    if (post) {
      return post
    }

    return null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}