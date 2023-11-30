import React, { useState } from 'react';
import { Avatar } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
import { CldUploadButton } from 'next-cloudinary';

interface ProfileAvatarInputProps {
    nameInitial? : string;
    avatar? : string;
}

export default async function ProfileAvatarInput({nameInitial,avatar}:ProfileAvatarInputProps) {
    const [avatarFile, setAvatarFile] = useState<File>(); 
    const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;


   return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block">
        {avatar ? (
          <Avatar src={avatar} className="w-28 h-28" />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-blue-gray-800 font-semibold text-xl">
            <span>{nameInitial}</span>
          </div>
        )}
        <label
          className="absolute top-2 right-0 rounded-full bg-white"
          htmlFor="avatar"
        >
          <input
            onChange={async({ target }) => {
              const { files } = target;
              if (files) setAvatarFile && setAvatarFile(files[0]);

              const formData = new FormData();
              formData.append('file', avatarFile);
              const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
              }).then(r => r.json());
            }}
            type="file"
            id="avatar"
            hidden
            accept="image/*"
          />
          <PencilIcon className="h-6 w-6 p-1 cursor-pointer" />
        </label>
      </div>
    </div>
  );
}
