import React, { useContext } from 'react';

import { Icon } from '@iconify/react';
import { cn, Card, Image, CardBody, Button } from '@nextui-org/react';

import { FavouritesContext } from '@/contexts/Favourites';
import { Master } from '@/types';

export default ({
  masters
}: {
  masters: Pick<Master, 'id' | 'title' | 'cover_image'>[];
}) => {
  const { favourites, addFavourite } = useContext(FavouritesContext);

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-12 gap-3 max-w-5xl'>
        {masters.map((master, index) => {
          const isFavourited = favourites.some(({ id }) => id === master.id);

          return (
            <Card
              className={
                'flex flex-col items-center rounded-large text-center shadow-small col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
              }
              key={index}
              isPressable
              onPress={() => {
                window.location.href = `/master/${master.id}`;
              }}
            >
              <Button
                className={cn(
                  'absolute right-5 top-5 z-20 bg-foreground min-w-0 p-2 text-large leading-5 text-background',
                  {
                    'text-red-500': isFavourited
                  }
                )}
                radius='full'
                size='sm'
                onPress={() => addFavourite(master.id)}
              >
                <Icon
                  icon={`material-symbols:favorite${isFavourited ? '' : '-outline'}`}
                />
              </Button>
              <CardBody className='px-2 pb-1 z-8'>
                <Image
                  alt={`${master.title} Thumb Image`}
                  className={'aspect-square	object-cover object-center'}
                  src={master.cover_image}
                  isZoomed
                  width={500}
                />
                <div className='flex flex-col gap-2 p-2'>
                  <h3>{master.title}</h3>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
