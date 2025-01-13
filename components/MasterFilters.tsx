import React from 'react';

import { Select, SelectItem } from '@nextui-org/react';
import { startCase } from 'lodash';

const YEAR_VALUES = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];
const COUNTRY_VALUES = ['canada', 'mexico', 'usa'];
const GENRE_VALUES = ['blues', 'country', 'hip hop', 'pop', 'rock'];

export default ({
  filters,
  onFiltersChange
}: {
  filters: any;
  onFiltersChange: (filters: any) => void;
}) => {
  return (
    <div className='flex justify-center py-4'>
      <div className='flex justify-start gap-2 max-w-5xl'>
        <div className='flex text-large items-center pr-2'>Filters:</div>
        <Select
          classNames={{
            base: 'items-center justify-end max-w-fit',
            value: 'min-w-[112px]'
          }}
          selectedKeys={[filters.year]}
          onSelectionChange={(keys) => {
            onFiltersChange({
              ...filters,
              year: Array.from(keys)[0]
            });
          }}
          labelPlacement='outside-left'
          placeholder='Release Year'
          variant='bordered'
        >
          {YEAR_VALUES.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
        <Select
          classNames={{
            base: 'items-center justify-end max-w-fit',
            value: 'min-w-[112px]'
          }}
          selectedKeys={[filters.country]}
          onSelectionChange={(keys) => {
            onFiltersChange({
              ...filters,
              country: Array.from(keys)[0]
            });
          }}
          labelPlacement='outside-left'
          placeholder='Country'
          variant='bordered'
        >
          {COUNTRY_VALUES.map((country) => (
            <SelectItem key={country} value={country}>
              {country === 'usa' ? 'USA' : startCase(country)}
            </SelectItem>
          ))}
        </Select>
        <Select
          classNames={{
            base: 'items-center justify-end max-w-fit',
            value: 'min-w-[112px]'
          }}
          selectedKeys={[filters.genre]}
          onSelectionChange={(keys) => {
            onFiltersChange({
              ...filters,
              genre: Array.from(keys)[0]
            });
          }}
          labelPlacement='outside-left'
          placeholder='Genre'
          variant='bordered'
        >
          {GENRE_VALUES.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {startCase(genre)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
