"use client"

import React from 'react'
import { Card } from '@material-tailwind/react'
import { SingleFieldForm } from '@/app/components/settings/customForm'

export default function PersonalDetails() {
  return (
    <div className="w-3/4  mx-auto my-auto">
    <Card>   
    <div className="m-8">
        <div  className="font-bold text-4xl">
        Personal Details
        </div>
    <div>
    <SingleFieldForm label="Username" defaultValue="Abhay"/>
    <SingleFieldForm label="Email" defaultValue="abhayp637@gmail.com"/>
    </div>
    </div>
                 
</Card>
</div>
  )
}
