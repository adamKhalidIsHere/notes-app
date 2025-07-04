import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="w-[100%] h-[calc(100vh-56px)] bg-gray-900 flex items-center justify-between">
      <div className="text-white px-60 py-60">
        <p className="text-7xl font-bold">Notes App</p>
        <p className="text-2xl mt-4 mb-10">Take your notes now! </p>
        <Link
          to={"/signup"}
          className="text-2xl rounded-lg bg-blue-800 hover:bg-blue-500 duration-300 py-4 px-8 font-semibold"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};
export default HomeScreen;
