import { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, user, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData);

    setFormData({ username: "", email: "", password: "" });

    console.log(user);
  };

  return (
    <div className="w-[100%] bg-gray-900 h-[calc(100vh-56px)] flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`bg-gray-700 w-2/6 h-9/12 rounded-lg max-sm:rounded-none max-sm:w-[100%] max-md:w-10/12 max-sm:h-[100%] flex flex-col  py-8 text-white ${
          loading && "flex justify-center items-center"
        }`}
      >
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width={150}
            height={150}
          >
            <defs>
              <radialGradient
                id="a10"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
              >
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9" />
                <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6" />
                <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle
              transformOrigin="center"
              fill="none"
              stroke="url(#a10)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2s"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              transformOrigin="center"
              fill="none"
              opacity=".2"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            />
          </svg>
        ) : (
          <>
            <div className="mt-10 text-5xl font-bold  flex items-center self-center max-md:text-2xl">
              <span>Signup</span>
              <IoEnterOutline className="ml-4 " />
            </div>
            <div className="w-[100%] mt-20 px-18">
              <input
                type="text"
                className="pl-2  py-2 border-[1px] border-l-0 border-r-0 border-t-0 border-zinc-300  focus:outline-0 placeholder-zinc-300 w-[100%]"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="w-[100%] mt-8 px-18">
              <input
                type="text"
                className="pl-2  py-2 border-[1px]  border-l-0 border-r-0 border-t-0 border-zinc-300  focus:outline-0 placeholder-zinc-300 w-[100%]"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="w-[100%] mt-8 px-18">
              <input
                type="password"
                className="pl-2  py-2 border-[1px]  border-l-0 border-r-0 border-t-0 border-zinc-300  focus:outline-0 placeholder-zinc-300 w-[100%]"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <p className="px-20 mb-6 mt-18">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-purple-500 hover:underline">
                Signup
              </Link>
            </p>
            <button
              type="submit"
              className="mt bg-blue-500 rounded-sm mx-20 py-3 text-xl font-semibold font tracking-wide cursor-pointer hover:bg-blue-400 duration-300"
            >
              Signup
            </button>
          </>
        )}
      </form>
    </div>
  );
};
export default Signup;
