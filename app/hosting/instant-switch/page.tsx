import React from 'react'
import InstantSwitchClient from './InstantSwitchClient'
import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

export default async function InstantSwitchPage() {
  const user = await getCurrentUser();
  if(!user){
    return (
      <ClientOnly>
        <EmptyState title='You are not logged in' subtitle='Log in to access the route'/>
      </ClientOnly>
    )
  }
  return (
    <InstantSwitchClient isTakingReservation={user.isTakingReservation}/>
  )
}
