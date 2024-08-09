"use client";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [error, setError] = useState(null);

 const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();


   const email = (e.target as any).email.value;
   const password = (e.target as any).password.value;

   const userData = {
     email: email,
     password: password,
   };

   console.log(userData);

   try {
     const response = await fetch("http://127.0.0.1:5000/user/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(userData),
     });

     if (response.ok) {
       const data = await response.json();
       console.log("User created successfully:", data);
       return JSON.stringify(data);
     } else {
       const errorData = await response.json();
       console.error("Failed to create user:", errorData);
       // Handle error by setting error state or displaying error message
       // setError(errorData.message);
     }
   } catch (error) {
     console.error("Error creating user:", error);
     // Handle error by setting error state or displaying error message
     // setError("An error occurred while creating the user.");
   }
 };

  return (
    <>
      <div className="flex justify-center items-center mx-auto min-w-[100vw] h-screen">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            HygieneUp | Sign In
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSignIn} method="POST">
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <Link href={"/"}>
              <button
                type="submit"
                className="text-white w-full mt-3 bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-600 rounded text-lg"
              >
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
