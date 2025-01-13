'use client';

import React, { useState } from 'react';

import { Pagination } from '@nextui-org/react';
import qs from 'qs';
import useSWR from 'swr';

import MasterCards from '@/components/MasterCards';
import MasterFilters from '@/components/MasterFilters';

const fetcher = (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => fetch(input, init).then((res) => res.json());

const Root = () => {
  const [filters, onFiltersChange] = useState({
    year: '2024',
    country: 'canada'
  });
  const [page, setPage] = useState(1);

  const { data } = useSWR(
    `/api/masters?${qs.stringify({
      page,
      ...filters
    })}`,
    fetcher
  );

  return (
    <>
      <MasterFilters filters={filters} onFiltersChange={onFiltersChange} />
      <MasterCards masters={data?.results || []} />
      {data?.results.length !== 0 && (
        <div className='flex justify-center py-6'>
          <Pagination
            isCompact
            showControls
            page={page}
            onChange={setPage}
            total={data?.pages || 1}
          />
        </div>
      )}
    </>
  );
};

export default Root;
