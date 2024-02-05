'use client';

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import {useCallback, useState, useEffect, useRef} from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useHostModal from "../../hooks/useHostModal";
import {Host, User} from "@prisma/client";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation"
import toast from "react-hot-toast";

interface UserMenuProps extends User{
    host: Host
}

const UserMenu = ({currentUser} : {currentUser:UserMenuProps}) => {
    const router = useRouter();
    const LoginModalHook=useLoginModal();
    const RegisterModalHook=useRegisterModal();
    const HostModalHook=useHostModal();
    const [isOpen, setIsOpen]=useState(false);
    
    const toggleOpen=useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onHost=useCallback(() => {
        if(!currentUser) {
            return LoginModalHook.onOpen();
        }
        if(!currentUser?.host) {
            router.push("/hosting/become-a-host");
            return toast.error("You are not a host yet!");
        }

        HostModalHook.onOpen();
    }, [currentUser, LoginModalHook, HostModalHook]);

    const menuRef = useRef(null);

    const closeMenu = () => {
      setIsOpen(false);
    };
  
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-3">
                <div onClick={onHost} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Host your adventure with us!
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
                                <MenuItem onClick={() => { toggleOpen(); router.push("/trips"); }} label="My trips" fontBold/>
                                <MenuItem onClick={() => { toggleOpen(); router.push("/favorites"); }} label="My favorites" fontBold/>
                                <MenuItem onClick={() => { toggleOpen(); router.push("/reservations"); }} label="My reservations" fontBold/>
                                <MenuItem onClick={() => { toggleOpen(); router.push("/account-settings"); }} label="My Account" fontBold/>
                                <MenuItem onClick={() => { toggleOpen(); }} label="Notifications" fontBold/>
                                <hr />
                                <MenuItem onClick={() => { toggleOpen(); router.push("/contact-us"); }} label="Contact us"/>
                                <MenuItem onClick={() => { toggleOpen(); onHost(); }} label="Host your adventure with us"/>
                                <hr />
                                <MenuItem onClick={()=>signOut()} label="Log Out"/>
                            </>
                        ): (
                            <>
                                <MenuItem onClick={() => { LoginModalHook.onOpen(); toggleOpen(); }} label="Login" fontBold/>
                                <MenuItem onClick={() => { RegisterModalHook.onOpen(); toggleOpen(); }} label="Sign Up"/>
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