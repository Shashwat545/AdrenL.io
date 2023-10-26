"use client"

import React from 'react'
import { Card } from '@material-tailwind/react'
import { SingleFieldForm } from '@/app/components/settings/customForm'
import { UploadProfilePhoto } from '@/app/components/settings/uploadProfile'
import {Address} from '@/app/components/settings/address'

export default function PersonalDetails() {
  return (
    <div className="w-3/4  mx-auto my-auto">
    <Card>   
    <div className="m-8">
        <div  className="font-bold text-4xl">
        Personal Details
        </div>
    <div>

    <div className="flex flex-col">
    <UploadProfilePhoto url="something"/>
    <SingleFieldForm label="Username" defaultValue="Abhay"/>
    <SingleFieldForm label="Email" defaultValue="abhayp637@gmail.com"/>
    <SingleFieldForm label="Phone Number" defaultValue="9695213906"/>
    <Address label="Address" defaultValue="11th street Mumbai"/>
   
    </div>
    
    </div>
    </div>
                 
</Card>

</div>
  )
}
