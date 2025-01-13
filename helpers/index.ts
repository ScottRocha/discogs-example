import axios, { AxiosRequestConfig } from 'axios';
import hash from 'object-hash';
import Redis from 'ioredis';

export const Axios = axios.create({
  baseURL: process.env.DISCOGS_URL!,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Discogs key=${process.env.DISCOGS_KEY!}, secret=${process.env.DISCOGS_SECRET!}`
  }
});

export const discogsApi = async ({
  url,
  cachePrefix = 'discogs',
  cacheExpiry = 60 * 60 * 24,
  mapper,
  config
}: {
  url: string;
  cachePrefix?: string;
  cacheExpiry?: number;
  mapper?: (result: any) => any;
  config?: AxiosRequestConfig;
}) => {
  const cacheKey = `${cachePrefix}:${hash(url)}`;

  let data: any = await redis.get(cacheKey);

  if (data) {
    data = JSON.parse(data);
  } else {
    const response = await Axios(url, config);
    data = response.data;

    if (mapper) {
      data.results = data.results.map(mapper);
    }

    await redis.set(cacheKey, JSON.stringify(data), 'EX', cacheExpiry, 'NX');
  }

  return data;
};

export const redis = new Redis(process.env.REDIS_URL!);
