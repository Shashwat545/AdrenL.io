import getCurrentUser from "@/app/actions/getCurrentUser"
import PersonalDetailsForm from "@/app/components/settings/personalDetailsForm"


export default async function PersonalDetails() {
  const currentUser = await getCurrentUser();
  if(!currentUser) return;
  const info = {
    name: currentUser.name,
    email: currentUser.email,
    number: "9695213912",
    address: "St Peter Street Navi Mumbai",
    avatar: "https://img.freepik.com/premium-vector/man-character_665280-46970.jpg",
    id : currentUser.id
  }
  return (
    <div>
      <PersonalDetailsForm info={info}/>
    </div>
  )
}
