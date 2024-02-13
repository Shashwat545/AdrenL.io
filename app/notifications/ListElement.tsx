"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface ListElementProps {
  id: string;
  message: string;
  time: string;
  readStatus: boolean;
  redirectURL: string;
}

export default async function ListElement({
  id,
  message,
  time,
  readStatus,
  redirectURL,
}: ListElementProps) {
  const router = useRouter();

  const handleClick = async (notificationId: string) => {
    try {
      const response = await axios.post("/api/notifications/update", {
        id: id,
        readStatus: true,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(redirectURL)
  return (
    <>
      <div
        className="p-4 grid grid-cols-[25px_1fr_auto] items-start"
      >
        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
        <div className="grid gap-1">
          <p className="text-sm font-medium">{message}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
        </div>
        {readStatus === false && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              handleClick(id);
            }}
          >
            Mark as Read
          </button>
        )}
        {/* { redirectURL && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={()=>{router.push(redirectURL)}}
          >
            View
          </button>
        )} */}
      </div>
    </>
  );
}
