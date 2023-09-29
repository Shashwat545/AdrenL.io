'use client';

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import {useCallback, useState} from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

    const LoginModal=useLoginModal();
    const RegisterModal=useRegisterModal();
    const [isOpen, setIsOpen]=useState(false);
    
    const toggleOpen=useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent=useCallback(() => {
        if(!currentUser) {
            return LoginModal.onOpen();
        }

        //Open Host model here
    }, [currentUser, LoginModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Host your own adventure!
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        { currentUser? (
                            <>
                                <MenuItem onClick={()=>{}} label="Bookings" fontBold/>
                                <MenuItem onClick={()=>{}} label="My favorites" fontBold/>
                                <MenuItem onClick={()=>{}} label="My Account" fontBold/>
                                <MenuItem onClick={()=>{}} label="Notifications" fontBold/>
                                <hr />
                                <MenuItem onClick={()=>{}} label="Contact us"/>
                                <MenuItem onClick={()=>{}} label="Host your own adventure"/>
                                <hr />
                                <MenuItem onClick={()=>signOut()} label="Log Out"/>
                            </>
                        ): (
                            <>
                                <MenuItem onClick={LoginModal.onOpen} label="Login" fontBold/>
                                <MenuItem onClick={RegisterModal.onOpen} label="Sign Up"/>
                            </>
                        )
                        }
                    </div>            
                </div>
            )}
        </div>
    );
}

export default UserMenu;