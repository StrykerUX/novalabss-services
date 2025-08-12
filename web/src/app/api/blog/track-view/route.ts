import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Find or create the blog post
    const blogPost = await prisma.blogPost.upsert({
      where: { slug },
      update: {
        views: { increment: 1 },
      },
      create: {
        slug,
        title: 'Post sin título',
        content: '',
        tags: '[]',
        views: 1,
      },
    });

    return NextResponse.json({ views: blogPost.views });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}