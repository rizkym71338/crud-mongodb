import { useRouter } from "next/router";
import Head from "next/head";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const users = getCookie("users", { req, res });

  if (users) {
    return {
      props: { users: JSON.parse(users) },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function Dashboard({ users }) {
  const [date, setDate] = useState();

  const { replace } = useRouter();

  const handleLogout = () => {
    deleteCookie("users");
    alert("Success Logout");
    replace("/login");
  };

  useEffect(() => {
    setInterval(() => {
      const current = new Date();
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const seconds = current.getSeconds();
      setDate(
        `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`
      );
    }, 1000);

    if (date == "01:37:00") {
      new Notification("TESTING");
    }
  });

  return (
    <>
      <Head>
        <title>Dashboard ∣ CRUD Mongodb</title>
      </Head>
      <div className="bg-blue-50">
        <section className="flex flex-col items-center justify-center h-screen max-w-6xl gap-6 mx-auto">
          <h1 className="text-3xl font-bold">
            Welcome {users?.username} ({users?.role}) {date}
          </h1>
          <button
            onClick={() => handleLogout()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all duration-300 mr-2 mb-2"
          >
            Logout
          </button>
        </section>
      </div>
    </>
  );
}
