'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    url: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, url}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);
    
    return(
        <CldUploadWidget onUpload={handleUpload} uploadPreset="kx4yy8db" options={{maxFiles: 1}}>
            {
                ({open}) => {
                    return (
                        <div onClick={() => open?.()} className="w-64">
                            <img className="w-14 h-14 rounded-full absolute" src={url} alt="" />
                            <div className="w-14 h-14 group hover:bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                                <img className="hidden group-hover:block w-12" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                            </div>
                        </div>
                    );
                }
            }
        </CldUploadWidget>
    );
}

export default ImageUpload;