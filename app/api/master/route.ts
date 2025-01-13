import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { discogsApi } from '@/helpers';
import { masterSchema } from '@/schemas';

export async function GET(request: NextRequest) {
  const searchParamsObject = Object.fromEntries(request.nextUrl.searchParams);
  const schemaResponse = masterSchema.safeParse(searchParamsObject);

  if (!schemaResponse.success) {
    const { errors } = schemaResponse.error;

    return NextResponse.json(
      { message: 'Invalid request', errors },
      { status: 400 }
    );
  }

  try {
    const result = await discogsApi({
      url: `/masters/${schemaResponse.data.master_id}`,
      cachePrefix: 'master',
      config: {
        method: 'GET'
      }
    });

    return NextResponse.json({
      message: 'Master Retrieved Successully',
      result
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
