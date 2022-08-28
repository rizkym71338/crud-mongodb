import { useRouter } from "next/router";
import Head from "next/head";
import { deleteCookie, getCookie } from "cookies-next";

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const users = getCookie("users", { req, res });

  if (users) {
    return {
      props: { users: JSON.parse(users) },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

export default function Dashboard({ users }) {
  const { replace } = useRouter();

  const handleLogout = () => {
    deleteCookie("users");
    alert("Success Logout");
    replace("/login");
  };

  return (
    <>
      <Head>
        <title>Dashboard ∣ CRUD Mongodb</title>
      </Head>
      <div className="bg-blue-50">
        <section className="flex flex-col items-center justify-center h-screen max-w-6xl gap-6 mx-auto">
          <h1 className="text-3xl font-bold">
            Welcome {users?.username} ({users?.role})
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
