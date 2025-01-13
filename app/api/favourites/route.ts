import { AxiosError } from 'axios';
import { compact, pick } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { discogsApi, redis } from '@/helpers';
import { favouritesSchema } from '@/schemas';

export async function GET(request: NextRequest) {
  const searchParamsObject = Object.fromEntries(request.nextUrl.searchParams);
  const schemaResponse = favouritesSchema.safeParse(searchParamsObject);

  if (!schemaResponse.success) {
    const { errors } = schemaResponse.error;

    return NextResponse.json(
      { message: 'Invalid request', errors },
      { status: 400 }
    );
  }

  try {
    const favourites = await redis.lrange(
      `favourites:${schemaResponse.data.username}`,
      0,
      -1
    );

    const results = compact(
      await Promise.all(
        favourites.map(async (favourite) => {
          try {
            const { artists, id, images, title } = await discogsApi({
              url: `/masters/${favourite}`,
              cachePrefix: 'master',
              config: {
                method: 'GET'
              }
            });

            return {
              id,
              title: `${artists?.[0]?.name} - ${title}`,
              cover_image: images?.[0]?.resource_url
            };
          } catch (_) {
            // filter out errors for now...
            return null;
          }
        })
      )
    );

    return NextResponse.json({
      message: 'Favourites Retrieved Successully',
      results
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
