'use client';

import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useEffect } from "react";

interface SearchParamProps{
    searchParams : { token:string, userId:string };
}

const Verify:React.FC<SearchParamProps> = ({searchParams}) => {
  const { token, userId } = searchParams;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/verify", {
        method: "POST",
        body: JSON.stringify({token, userId})
    }).then(async (res) => {
        const apiRes = await res.json();
        const { error, message } = apiRes as { message: string; error: string };

        if (res.ok) {
            toast.success(message);
        }
        if (!res.ok && error) {
          console.log(error);
          toast.error(error);
        }
        router.replace("/");
    });
  }, []);

  if (!token || !userId) {
    return notFound();
  }

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
}

export default Verify;