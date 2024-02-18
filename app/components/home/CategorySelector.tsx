'use client';

import {useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
import { BiWater } from "react-icons/bi";
import { FaHiking, FaStar, FaTag, FaWalking } from "react-icons/fa";
import { GiAirBalloon, GiIsland, GiWingedSword } from "react-icons/gi";

const CategorySelector = () => {
  const params=useSearchParams();
  const router=useRouter();
  const category=params?.get('category');
  const intensity=params?.get('intensity');
  const misc=params?.get('misc');

  const handleIntensityClick=useCallback((label: string)=> {
    let currentQuery={};
    if(params) {
        currentQuery=qs.parse(params.toString());
    }
    const updatedQuery:any = {
        ...currentQuery, intensity:label
    }
    if(params?.get('intensity')===label) {
        delete updatedQuery.intensity;
    }
    const url=qs.stringifyUrl({
        url:'/',
        query: updatedQuery
    }, {skipNull: true});
    router.push(url, { scroll: false });
  }, [params, router]);

  const handleCategoryClick=useCallback((label: string)=> {
    let currentQuery={};
    if(params) {
        currentQuery=qs.parse(params.toString());
    }
    const updatedQuery:any = {
        ...currentQuery, category:label
    }
    if(params?.get('category')===label) {
        delete updatedQuery.category;
    }
    const url=qs.stringifyUrl({
        url:'/',
        query: updatedQuery
    }, {skipNull: true});
    router.push(url, { scroll: false });
  }, [params, router]);

  const handleMiscClick=useCallback((label: string)=> {
    let currentQuery={};
    if(params) {
        currentQuery=qs.parse(params.toString());
    }
    const updatedQuery:any = {
        ...currentQuery, misc:label
    }
    if(params?.get('misc')===label) {
        delete updatedQuery.misc;
    }
    const url=qs.stringifyUrl({
        url:'/',
        query: updatedQuery
    }, {skipNull: true});
    router.push(url, { scroll: false });
  }, [params, router]);

  const underlineClasses="underline underline-offset-8 decoration-2";
  
    return (
      <div className="w-full bg-sky-50 flex flex-row items-center justify-between overflow-x-auto hide-scroll-bar">
        <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4 mr-5">
            <h3 className="font-semibold">Intensity:</h3>
            <div onClick={() => handleIntensityClick("Extreme")} className="flex items-center space-x-2 border-r pr-4 cursor-pointer">
              <GiWingedSword className="w-6 h-6 text-red-500" />
              <span className={`${intensity==="Extreme"?`${underlineClasses}`:''}`}>
                Extreme
              </span>
            </div>
            <div onClick={() => handleIntensityClick("Moderate")} className="flex items-center space-x-2 border-r pr-4 cursor-pointer">
              <FaHiking className="w-6 h-6 text-yellow-500" />
              <span className={`${intensity==="Moderate"?`${underlineClasses}`:''}`}>
                Moderate
              </span>
            </div>
            <div onClick={() => handleIntensityClick("Low")} className="flex items-center space-x-2 cursor-pointer">
              <FaWalking className="w-6 h-6 text-blue-500" />
              <span className={`${intensity==="Low"?`${underlineClasses}`:''}`}>
                Low
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-5">
            <h3 className="font-semibold">Medium:</h3>
            <div onClick={() => handleCategoryClick("Air")} className="flex items-center space-x-2 border-r pr-4 cursor-pointer">
              <GiAirBalloon className="w-6 h-6 text-gray-500" />
              <span className={`${category==="Air"?`${underlineClasses}`:''}`}>
                Air
              </span>
            </div>
            <div onClick={() => handleCategoryClick("Land")} className="flex items-center space-x-2 border-r pr-4 cursor-pointer">
              <GiIsland className="w-6 h-6 text-green-500" />
              <span className={`${category==="Land"?`${underlineClasses}`:''}`}>
                Land
              </span>
            </div>
            <div onClick={() => handleCategoryClick("Water")} className="flex items-center space-x-2 cursor-pointer">
              <BiWater className="w-6 h-6 text-blue-500" />
              <span className={`${category==="Water"?`${underlineClasses}`:''}`}>
                Water
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-5">
            <h3 className="font-semibold">Sort:</h3>
            <div onClick={() => handleMiscClick("Rating")} className="flex items-center space-x-2 border-r pr-4 cursor-pointer">
              <FaStar className="w-6 h-6 text-brown-500" />
              <span className={`${misc==="Rating"?`${underlineClasses}`:''}`}>
                Rating
              </span>
            </div>
            <div onClick={() => handleMiscClick("Price")} className="flex items-center space-x-2 cursor-pointer">
              <FaTag className="w-6 h-6 text-gray-500" />
              <span className={`${misc==="Price"?`${underlineClasses}`:''}`}>
                Price
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CategorySelector;
  
  function BackpackIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 20V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
        <path d="M8 10h8" />
        <path d="M8 18h8" />
      </svg>
    )
  }
  
  
  function CloudIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    )
  }
  
  
  function FlameIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    )
  }
  
  
  function GlassWaterIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z" />
        <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
      </svg>
    )
  }
  
  
  function MountainIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  
  
  function SnowflakeIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="2" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="m20 16-4-4 4-4" />
        <path d="m4 8 4 4-4 4" />
        <path d="m16 4-4 4-4-4" />
        <path d="m8 20 4-4 4 4" />
      </svg>
    )
  }
  
  
  function SunIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }
  
  
  function TreesIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
        <path d="M7 16v6" />
        <path d="M13 19v3" />
        <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
      </svg>
    )
  }
  