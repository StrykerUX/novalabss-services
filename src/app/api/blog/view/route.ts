import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Find or create blog post record to increment views
    const result = await prisma.blogPost.upsert({
      where: { slug },
      update: {
        views: {
          increment: 1
        }
      },
      create: {
        slug,
        title: '', // Will be updated when we sync with file system
        content: '',
        tags: '[]', // Empty JSON array
        views: 1,
        published: true
      }
    });

    return NextResponse.json({ views: result.views });
  } catch (error) {
    console.error('Error tracking blog view:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}