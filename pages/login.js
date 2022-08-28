import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const users = getCookie("users", { req, res });

  if (users) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function Login() {
  const { replace, push } = useRouter();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    var data = { username, password };
    const result = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_DOMAIN + "/api/users/login",
      data,
    });
    if (result.status == 200 && result.data.users) {
      alert("Success login");
      setCookie("users", JSON.stringify(result.data.users));
      replace("/dashboard");
    } else {
      alert("Failed login");
    }
  };

  return (
    <>
      <Head>
        <title>Login ∣ CRUD Mongodb</title>
      </Head>
      <div className="bg-blue-50">
        <section className="flex items-center justify-center h-screen max-w-xl mx-auto">
          <div className="w-full">
            <div className="mb-6">
              <input
                ref={usernameRef}
                type="text"
                className="block w-full p-5 text-sm text-gray-900 transition-all duration-300 border border-gray-300 rounded-full outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-700"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <input
                ref={passwordRef}
                type="password"
                className="block w-full p-5 text-sm text-gray-900 transition-all duration-300 border border-gray-300 rounded-full outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-700"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <button
                onClick={handleLogin}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-10 py-2.5 text-center transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => push("/signup")}
                className="text-sm transition-all duration-300 hover:underline hover:text-blue-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
