import getCurrentUser from "@/app/actions/getCurrentUser"
import PersonalDetailsForm from "@/app/components/settings/personalDetailsForm"


export default async function PersonalDetails() {
  const currentUser = await getCurrentUser();
  if(!currentUser) return;
  const info = {
    name: currentUser.name || '',
    email: currentUser.email || '',
    number: currentUser.phoneNumber || '',
    address: currentUser.address || '',
    avatar: currentUser.image || '',
    id : currentUser.id
  }
  return (
    <div>
      <PersonalDetailsForm info={info} currentUser={currentUser}/>
    </div>
  )
}
