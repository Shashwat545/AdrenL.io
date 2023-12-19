'use client';

import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { IconType } from 'react-icons';
import { useRouter } from 'next/navigation'

interface CardBlockProps  {
    blockCardIcon : IconType;
    cardBlockHeading : string;
    cardBlockBody : string;
    url: string;
}

const CardBlock: React.FC<CardBlockProps> = ({ blockCardIcon:Icon, cardBlockHeading, cardBlockBody, url}) => {
  const router = useRouter();

    return (
      <div onClick={() => {router.push(url)}} className='cursor-pointer'>
        <Card className="mt-6 ml-6 sm:w-48 md:w-64 lg:w-80 xl:w-96 transform hover:scale-105 transition">
          <CardBody>
            <Icon className='w-8 h-8 mb-4'/>
              <Typography variant='h5' color='blue-gray' className='mb-2 font-bold'>{cardBlockHeading}</Typography>
              <Typography>{cardBlockBody}</Typography>
          </CardBody>
        </Card>
    </div>
    )
}

export default CardBlock;