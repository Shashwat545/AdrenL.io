'use client'

import UpdateProfilePhoto from "../inputs/UpdateProfilePhoto";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User } from "@prisma/client";

interface uploadAvatarProps{
    url: string;
    name: string;
    currentUser: User;
}

export const UploadProfilePhoto:React.FC<uploadAvatarProps> = ({url, name, currentUser}) => {
    const handleImageUpload = async (value: string) => {
        const filter: {image: string, currentUserId: string} ={image: value, currentUserId: currentUser.id};
        const data = JSON.stringify(filter);
        const res = await axios.post("/api/settings/profile/updateProfileImage", data);
        if(res.data == "ok") {
            toast.success("Profile Image Updated");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-16 inline mt-5">
            <div className="flex flex-row">
                <UpdateProfilePhoto onChange={handleImageUpload} url={url}/>
                <div className="flex flex-col">
                <div className="pt-1 ml-4">{name}</div>
                <div className="ml-4 whitespace-nowrap hover:underline cursor-pointer text-blue-500">Update Profile Picture</div>
                </div>
            </div>
        </div>
    )
  }