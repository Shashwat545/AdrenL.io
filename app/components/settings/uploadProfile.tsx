"use client"

interface uploadAvatarProps{
    url:string;
}

export const UploadProfilePhoto:React.FC<uploadAvatarProps> = ({url}) => {
    return (
        <div className="w-16 inline mt-5">
            <div className="flex flex-row">
                <div className="w-64">
                    <img className="w-14 h-14 rounded-full absolute" src={url} alt="" />
                    <div className="w-14 h-14 group hover:bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                        <img className="hidden group-hover:block w-12" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                    </div>
                </div>
                <div className="flex flex-col">
                <div className="pt-1 ml-4">Abhay</div>
                <div className="ml-4 whitespace-nowrap hover:underline cursor-pointer text-blue-500">Update Profile Picture</div>
                </div>
            </div>
        </div>
    )
  }