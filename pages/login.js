import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";

const login = () => {
  const { push } = useRouter();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    var data = { username, password };
    const result = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/login",
      data,
    });
    if (result.status == 200 && result.data.users) {
      alert("Success login");
      localStorage.setItem("users", JSON.stringify(result.data.users));
      push("/dashboard");
    } else {
      alert("Failed login");
    }
  };

  return (
    <>
      <section className="flex justify-center items-center max-w-xl mx-auto h-screen">
        <div className="w-full">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            onClick={() => handleLogin()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
      </section>
    </>
  );
};

export default login;
