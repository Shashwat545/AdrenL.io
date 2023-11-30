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
                <UpdateProfilePhoto onChange={handleImageUpload} url={url} name={name}/>
        </div>
    )
  }