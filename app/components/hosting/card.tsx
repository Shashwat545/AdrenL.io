import { useRouter } from 'next/navigation'
import React from 'react'
import { BsArrowUpRightCircleFill } from "react-icons/bs";

interface HostingCardProps{
    heading : string,
    redirectUrl: string,
    subtitle?: string
}

export default function HostingCard({heading, redirectUrl, subtitle}:HostingCardProps) {
  const router = useRouter();
  return (
    <div className="m-6 w-64 max-w-xl p-6 bg-white rounded-lg shadow hover:bg-gray-200" onClick={()=>router.push(`hosting/${redirectUrl}`)}>
    <BsArrowUpRightCircleFill className="text-2xl mb-4"/>
    <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{heading}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500">{subtitle || "Secondary Heading"}</p>
</div>
  )
}
