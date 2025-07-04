import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  return (
    <header className="bg-gray-800 w-[100%] text-white px-60 py-4 flex justify-between max-md:px-8">
      <Link className="flex items-center cursor-pointer" to={"/"}>
        <FaNoteSticky className="mr-2" />

        <p>NotesApp</p>
      </Link>
      <div className="">
        {!user ? (
          <>
            <Link
              className="mr-4 hover:text-zinc-300 hover:underline"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="hover:text-zinc-300 hover:underline"
              to={"/signup"}
            >
              Sign up
            </Link>
          </>
        ) : (
          <div
            className="cursor-pointer hover:text-zinc-300 hover:underline"
            onClick={logout}
          >
            Logout
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
