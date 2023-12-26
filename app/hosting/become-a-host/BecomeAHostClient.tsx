'use client'

import { Host, User } from "@prisma/client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

import toast from "react-hot-toast";

interface UserIncludesHostProps extends User{
  host : Host
}

const BecomeAHostClient = ({currentUser} : {currentUser:UserIncludesHostProps} ) =>{
    const router = useRouter();
    const handleClick = () => {
        if(!currentUser){
            toast.error("You are not logged in!");
        }
        console.log(currentUser.id)
        axios.post('/api/hosting/become-a-host',{id: currentUser.id})
        .then(()=>{
            toast.success("You are now a host!")
        })
        .catch((err)=>{
            toast.error("Something went wrong!");
        })
        .finally(()=>{  
            return router.push('/hosting')
        })
       
    }
    return (
        <div className="flex flex-wrap">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <nav className="flex px-4 justify-between items-center">
              <div className="text-4xl font-bold">
                Adrenl<span className="text-red-700">.</span>
              </div>
              <div>
              </div>
            </nav>
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-6xl font-bold">Unleash your<span className="text-red-700">Adventure</span> </h1>
                <div className="w-20 h-2 bg-red-700 my-4"></div>
                <p className="text-xl mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dignissimos nihil vel, fuga reprehenderit praesentium similique dolores alias nostrum non? Illum laudantium officia nisi quod quisquam corporis qui repudiandae optio!</p>
                <button className="bg-red-500 text-white text-2xl font-medium px-4 py-2 rounded shadow" onClick={handleClick}>Become a host</button>
              </div>
            </header>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1682687220801-eef408f95d71?q=80&w=1887&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=720&q=80" alt="Leafs" className="w-full h-48 object-cover sm:h-screen sm:w-4/12" />
      </div> 
    )
} 

export default BecomeAHostClient;