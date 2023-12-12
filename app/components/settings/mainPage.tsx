"use client"
import React from 'react'
import {
  Typography,
} from "@material-tailwind/react";
import {BiIdCard} from 'react-icons/bi'
import {AiOutlineEye} from 'react-icons/ai'
import CardBlock from '@/app/components/CardBlock'

interface mainPageProps {
    currentUser: string | null;
}


 const MainPage: React.FC<mainPageProps> = ({currentUser}) => {
  return (
    <div className="md:ml-16 m-12">
    <Typography className='block font-bold text-3xl '>Hello {currentUser}</Typography>
    <div className='flex flex-col md:flex-row'>
      <CardBlock blockCardIcon={BiIdCard}  cardBlockHeading='Personal Details' cardBlockBody='Personal details related to your account' url="/account-settings/personal-details"/>
      <CardBlock blockCardIcon={BiIdCard}  cardBlockHeading='Your Adventures' cardBlockBody='Manage your listings' url="/adventures"/>
      {/* <CardBlock blockCardIcon={AiOutlineEye}  cardBlockHeading='Privacy and Security' cardBlockBody='Manage your personal data and sharing settings'/> */}
      </div>
    </div>  
  )
}

export default MainPage;
