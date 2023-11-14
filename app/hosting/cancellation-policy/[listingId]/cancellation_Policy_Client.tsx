"use client"
import RadioBtn from '@/app/components/hosting/radioBtn';
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IParams{
  params:{
    listingId? : string;
  }
    defaultPolicy? : string;
}

export default function Cancellation_Policy_Client({params,defaultPolicy}:IParams) {
    const router = useRouter();
    const [selectedOption,setSelectedOption] = useState(defaultPolicy); 
    const id = params.listingId;
    const handleonClick = async () => {
        try {
            const data = JSON.stringify({data:selectedOption});
          
            const res = await axios.post(`/api/hosting/cancellation-policy/${id}`,data);
            if(res.status==200){
              toast.success("Updated Successfully");
            }
            router.push('/hosting/cancellationPolicy');
            router.refresh();
          } catch (error) {
            console.error("Error:", error);
          }
    }
    return (
        <div className="flex flex-col max-h-screen max-w-2xl mx-auto">
          <div className="flex justify-between items-center p-4">
            <button
              type="button"
              onClick={()=>router.push('/hosting/cancellationPolicy')}
              className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <div className="text-black">Go back</div>
            </button>
          </div>
          <h1 className="text-2xl text-gray-800 mb-6">
            Choose your cancellation Policy!
          </h1>
    
          <RadioBtn label="Flexible" setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
          <RadioBtn label="Moderate"  setSelectedOption={setSelectedOption}  selectedOption={selectedOption}/>
          <RadioBtn label="Strict"  setSelectedOption={setSelectedOption}  selectedOption={selectedOption}/>
          <RadioBtn label="SuperStrict"  setSelectedOption={setSelectedOption}  selectedOption={selectedOption}/>
          <RadioBtn label="NonRefundable" setSelectedOption={setSelectedOption}   selectedOption={selectedOption}/>
    
          
    
          <div className="flex justify-end p-4">
            <button className="bg-black text-white py-3 font-bold px-6 rounded-xl" onClick={handleonClick}>
              Confirm
            </button>
          </div>
        </div>
    
  )
}
