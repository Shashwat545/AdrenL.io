import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import RadioBtn from "@/app/components/hosting/radioBtn";
import axios from "axios";
import React from "react";
import getListingById from "@/app/actions/getListingById";
import Cancellation_Policy_Client from "./cancellation_Policy_Client";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export default async function UpdateCancellationPolicy({params}:{params:IParams}) {
  const user = await getCurrentUser();
  const listing = await getListingById(params);

  const Authorized = listing?.userId === user?.id
  
    if(!Authorized) {
      return (
          <ClientOnly>
              <EmptyState title="Not Found" subtitle="Make sure you have access!"/>
          </ClientOnly>
      );
  }


  return(
    <Cancellation_Policy_Client params={params}/>
  );
}
