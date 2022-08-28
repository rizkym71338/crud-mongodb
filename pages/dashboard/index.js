import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [users, setUsers] = useState();

  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("users");
  };

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("users"));
    if (dataUser) {
      setUsers(dataUser);
    } else {
      push("/login");
    }
  });

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen max-w-6xl gap-6 mx-auto">
        <h1 className="text-3xl font-bold">
          Welcome {users?.username} ({users?.role})
        </h1>
        <button
          onClick={() => handleLogout()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all duration-300 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Logout
        </button>
      </section>
    </>
  );
}
