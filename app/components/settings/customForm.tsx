"use client"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Avatar
  } from "@material-tailwind/react";
import axios from "axios";

import { useState } from 'react'
import toast from "react-hot-toast";

interface SingleFieldFormProps {
    currentUserId : string;
    label : string;
    defaultValue : string;
    postURL : string;
    propName : string;
}

   
  export const SingleFieldForm: React.FC<SingleFieldFormProps> = ({currentUserId,label, defaultValue, postURL,propName}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name,setName] = useState(defaultValue);

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleCancelClick = () => {
      setIsEditing(false);
    }

    const handleSaveClick = async () => {
      setIsSubmitting(true);
      const value: {[key: string]: string} = {};
      value[propName] = name; 
      const data = JSON.stringify({...value,currentUserId});
      const res = await axios.post(postURL,data);
      if(res.data=="ok"){
      setName(name);
      setIsSubmitting(false);
      setIsEditing(false);
      }else{
        setName(defaultValue);
        setIsSubmitting(false);
        setIsEditing(false);
        toast.error("Something went wrong!")
      }
    }
    return (
  
       <div>
                {!isEditing ? (
                  <div>
                        <div className="flex justify-between mt-20">
                          <div>{label}</div>
                          <div className="font-bold underline hover:cursor-pointer" onClick={handleEditClick}>{defaultValue==''?"Add":"Update"}</div>    
                          

                        </div>
                        <div className="text-gray-600">{name}</div>
                        </div>
                        ):( 
                        <div className="flex justify-between mt-20">
                          <div className="w-3/4">
                            <div className="relative h-14 w-full min-w-[200px]">
                              <input 
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                              />
                              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                {label}
                              </label>
                            </div>
                          </div>
                        <div>
                        <div className="flex">
                       <Button className={isSubmitting ? "ml-5 cursor-not-allowed opacity-50 bg-pink-500 text-white" :"ml-5 button-loading bg-pink-500 text-white "} onClick={handleSaveClick} > 
                          {defaultValue==''?"Add":"Update"}
                       </Button>
                       <Button variant="outlined" className="ml-5 border-pink-500" onClick={handleCancelClick}>Cancel</Button>
                       </div>
                       </div>
                      </div>)}
                      <div className="border-b border-gray-300 mt-5 mb-5"></div>
        </div>
        

    );
  }

