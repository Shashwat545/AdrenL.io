"use client"
import React from 'react'
import {
  Typography,
} from "@material-tailwind/react";
import {BiIdCard} from 'react-icons/bi'
import {AiOutlineEye} from 'react-icons/ai'
import CardBlock from '../components/CardBlock';

export default function Account() {
  return (
    
   <div className="ml-16 m-12">
    <Typography className='block font-bold text-3xl '>Hello Account Name</Typography>
    <div className='flex'>
      <CardBlock blockCardIcon={BiIdCard}  cardBlockHeading='Personal Details' cardBlockBody='Personal details related to your account'/>
      <CardBlock blockCardIcon={AiOutlineEye}  cardBlockHeading='Privacy and Security' cardBlockBody='Manage your personal data and sharing settings'/>
      
    </div>
   </div>  
  )
}
