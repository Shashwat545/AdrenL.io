"use client"

import React from 'react'
import { Card } from '@material-tailwind/react'
import { SingleFieldForm } from '@/app/components/settings/customForm'
import { UploadProfilePhoto } from '@/app/components/settings/uploadProfile'
import {Address} from '@/app/components/settings/address'

interface infoProps{
  info : {
    name: string;
    avatar : string;
    email : string;
    number : string;
    address : string;
  }
}

 const PersonalDetailsForm: React.FC<infoProps> = ({info}) => {
  return (
    <div className="w-3/4  mx-auto my-auto">
    <Card>   
    <div className="m-8">
        <div  className="font-bold text-4xl">
        Personal Details
        </div>
    <div>

    <div className="flex flex-col">
    <UploadProfilePhoto url={info.avatar}/>
    <SingleFieldForm label="Username" defaultValue={info.name} currentUserId={info.id}/>
    <SingleFieldForm label="Email" defaultValue={info.email} currentUserId={info.id}/>
    <SingleFieldForm label="Phone Number" defaultValue={info.number} currentUserId={info.id}/>
    <Address label="Address" defaultValue={info.address}/>
   
    </div>
    
    </div>
    </div>
                 
</Card>

</div>
  )
}

export default PersonalDetailsForm;
