import getCurrentUser from "../actions/getCurrentUser";
import MainPage from "../components/settings/mainPage";


export default async function Account() {
  const currentUser = await getCurrentUser() || '';
  const currentUserName = currentUser ? currentUser.name : '';
  return (
    <div>
      <MainPage currentUser={currentUserName}/>
      
    </div>
   
  )
}
