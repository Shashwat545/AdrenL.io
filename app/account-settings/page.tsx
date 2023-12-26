import getCurrentUser from "../actions/getCurrentUser";
import MainPage from "../components/settings/mainPage";


const AccountSettings = async () => {
  const currentUser = await getCurrentUser() || '';
  const currentUserName = currentUser ? currentUser.name : '';
  return (
    <div>
      <MainPage currentUser={currentUserName}/>
    </div>
  );
}

export default AccountSettings;
