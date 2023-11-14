"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function InstantSwitchPage() {
  const router = useRouter();
  const [isChecked, setisChecked] = useState(false);
  const handleSubmitButton = async () => {
    try {
      const res = await axios.post(`/api/hosting/toggleReservation/${isChecked}`);
      if(res.status==200) toast.success("Updated!")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggle = () => {
    setisChecked((prevState) => !prevState);
  };

  // useEffect(()=>{
  //   const fetchData = async ()=>{
  //     try{
  //     const response = axios.get(`/api/hosting/toogleReservation/${isChecked}`)
  //     console.log(response);
  //     }catch(e){
  //       throw new Error
  //     }
  //   }

  //   fetchData();
  // },[])

  

  return (
    <div className="flex flex-col max-h-screen max-w-2xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <button
          type="button"
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
          <div className="text-black" onClick={() => router.push("/hosting")}>
            Go back
          </div>
        </button>
        <div></div>
      </div>

      <div className="flex flex-col md:flex-row items-center m-10 flex-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isChecked ? true : undefined}
            onClick={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-md font-medium text-gray-900">
            {isChecked
              ? "Stop taking Reservations"
              : "Start taking Reservation"}
          </span>
        </label>
      </div>

      <div className="flex justify-end p-4">
        <button
          className="bg-black text-white py-3 font-bold px-6 rounded-xl"
          onClick={handleSubmitButton}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
