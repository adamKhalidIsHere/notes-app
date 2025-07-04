import { useUserStore } from "../stores/useUserStore";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user } = useUserStore();

  return <>{user ? <AuthScreen /> : <HomeScreen />}</>;
};
export default HomePage;
