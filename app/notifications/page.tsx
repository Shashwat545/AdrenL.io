import { useEffect } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getNotifications from "../actions/getNotifications";
import ListElement from "./ListElement";
import axios from "axios";

export default async function Notifications() {
  const currentUser = await getCurrentUser();
  const Notifications = await getNotifications(currentUser?.id ?? "");
  

  const seenNotifications = Notifications.filter(
    (notification) => notification.readStatus === true
  );
  console.log(seenNotifications);
  const unseenNotifications = Notifications.filter(
    (notification) => notification.readStatus === false
  );
  console.log(unseenNotifications);

  const formatTimeDifference = (timestamp: Date) => {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return "just now";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return new Date(timestamp).toLocaleDateString();
    }
  };
  
  const handleClick = async (notificationId: string) => {
    try{
      const response = await axios.post("/api/notifications/update", {id: notificationId, readStatus: true});
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <div className="w-full h-full flex flex-col gap-8 p-4 md:p-8">
      <section className="flex-1 border rounded-lg shadow-sm bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">New Notifications</h2>
        </div>
        <div className="overflow-auto">
          <div className="divide-y">
            {unseenNotifications.length > 0 ? (
              unseenNotifications.map((notification) => (
                <ListElement
                  id={notification.id}
                  key={notification.id}
                  message={notification.message}
                  time={formatTimeDifference(notification.timestamp)}
                  readStatus={notification.readStatus}
                  redirectURL={notification.redirectURL ?? ""}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                You are all caught up!
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="flex-1 border rounded-lg shadow-sm bg-white ">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Older Notifications</h2>
        </div>
        <div className="overflow-auto">
          <div className="divide-y">
            {
              seenNotifications.map((notification) => (
                <ListElement
                  id={notification.id}
                  key={notification.id}
                  message={notification.message}
                  time={formatTimeDifference(notification.timestamp)}
                  readStatus={notification.readStatus}
                  redirectURL={notification.redirectURL ?? ""}
                />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}
