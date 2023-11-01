"use client"

import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { IconType } from 'react-icons';
import { useRouter } from 'next/navigation'

interface CardBlockProps  {
    blockCardIcon : IconType;
    cardBlockHeading : string;
    cardBlockBody : string;
}




const CardBlock:React.FC<CardBlockProps> = ({blockCardIcon:Icon,cardBlockHeading,cardBlockBody}) => {
  const router = useRouter();
    return (
      <div onClick={()=>{router.push('/account-settings/personal-details')}} className='hover:cursor-pointer'>
        <Card className="mt-6 ml-6 w-96 transform hover:scale-105">
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