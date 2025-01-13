'use client';

import React from 'react';

import {
  Button,
  Card,
  CardBody,
  cn,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import qs from 'qs';
import useSWR from 'swr';

const fetcher = (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => fetch(input, init).then((res) => res.json());

const Master = () => {
  const { master_id } = useParams<{
    master_id: string;
  }>();

  const { data } = useSWR(
    master_id
      ? `/api/master?${qs.stringify({
          master_id
        })}`
      : null,
    fetcher
  );

  const master = data?.result;

  if (!master) {
    return null;
  }

  return (
    <div className='flex justify-center'>
      <Card
        className={
          'flex flex-col items-center rounded-large text-center max-w-5xl'
        }
      >
        <CardBody className='px-2 pb-1 z-8'>
          <div className='grid grid-cols-12 gap-3 max-w-5xl'>
            <div className='flex flex-col col-span-12 sm:col-span-6 md:col-span-4'>
              <h1 className='text-xl text-center pb-2'>{master.title}</h1>
              <Image
                alt={`${master.title} Thumb Image`}
                className={'aspect-square	object-cover object-center'}
                src={master.images?.[0]?.resource_url}
              />
              <div className='flex flex-row pt-2 items-center'>
                <h2 className='text-md'>Release Date:</h2>
                <h3 className='text-sm ml-auto'>{master.year}</h3>
              </div>
              <div className='flex flex-row items-center'>
                <h2 className='text-md'>Artists:</h2>
                <h3 className='text-sm ml-auto'>
                  {master.artists.map(({ name }: any) => name).join(', ')}
                </h3>
              </div>
              <div className='flex flex-row items-center'>
                <h2 className='text-md'>Genres:</h2>
                <h3 className='text-sm ml-auto'>{master.genres.join(', ')}</h3>
              </div>
            </div>
            <div className='flex flex-col col-span-12 sm:col-span-6 md:col-span-8'>
              <Table isStriped aria-label='Example static collection table'>
                <TableHeader>
                  <TableColumn>Track #</TableColumn>
                  <TableColumn>Name</TableColumn>
                </TableHeader>
                <TableBody>
                  {master.tracklist.map((track: any) => (
                    <TableRow key={track.position}>
                      <TableCell>{track.position}</TableCell>
                      <TableCell>{track.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Master;
