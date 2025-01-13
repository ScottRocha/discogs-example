import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { discogsApi, redis } from '@/helpers';
import { favouriteSchema } from '@/schemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const schemaResponse = favouriteSchema.safeParse(body);

  if (!schemaResponse.success) {
    const { errors } = schemaResponse.error;

    return NextResponse.json(
      { message: 'Invalid request', errors },
      { status: 400 }
    );
  }

  try {
    const cacheKey = `favourites:${schemaResponse.data.username}`;

    // redis stores as string...
    const masterId = schemaResponse.data.master_id.toString();

    const index = await redis.lpos(cacheKey, masterId);

    if (index === null) {
      await redis.rpush(cacheKey, masterId);
    } else {
      await redis.lrem(cacheKey, 1, masterId);
    }

    await redis.expire(cacheKey, 60 * 60 * 24 * 30, 'NX');

    return NextResponse.json({
      message: 'Favourite Saved Successully'
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: 'Invalid request', errors: [error.message] },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid request', errors: ['Unknown Error'] },
        { status: 400 }
      );
    }
  }
}
