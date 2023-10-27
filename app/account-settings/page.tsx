import getCurrentUser from "../actions/getCurrentUser";
import MainPage from "../components/settings/mainPage";


export default async function Account() {
  const currentUser = await getCurrentUser() || '';
  return (
    <div>
      <MainPage currentUser={currentUser.name}/>
    </div>
   
  )
}
