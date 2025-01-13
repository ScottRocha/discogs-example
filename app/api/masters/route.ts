import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

import { discogsApi } from '@/helpers';
import { mastersSchema } from '@/schemas';
import { pick } from 'lodash';

export async function GET(request: NextRequest) {
  const searchParamsObject = Object.fromEntries(request.nextUrl.searchParams);
  const schemaResponse = mastersSchema.safeParse(searchParamsObject);

  if (!schemaResponse.success) {
    const { errors } = schemaResponse.error;

    return NextResponse.json(
      { message: 'Invalid request', errors },
      { status: 400 }
    );
  }

  try {
    const data = await discogsApi({
      url: `/database/search?${qs.stringify({
        type: 'master',
        per_page: 12,
        ...schemaResponse.data
      })}`,
      cachePrefix: 'masters',
      mapper: (master: any) => pick(master, ['id', 'cover_image', 'title']),
      config: {
        method: 'GET'
      }
    });

    return NextResponse.json({
      message: 'Masters Retrieved Successully',
      results: data.results.map((result: any) =>
        pick(result, ['id', 'cover_image', 'title'])
      ),
      pages: data.pagination.pages
    });
  } catch (error) {
    console.log('error', error);
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
