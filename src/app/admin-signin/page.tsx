"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
const router = useRouter();
  const [isStartDone, setStart] = useState(false);
  const [cuisine, setCuisine] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storeName = (e.target as any).storename.value;
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const fssaiCode = (e.target as any).fssaicode.value;

    const userData = {
      name: storeName,
      email: email,
      password: password,
      fssai: fssaiCode,
      cuisine: cuisine,
    };

    console.log(userData);

    try {
      const response = await fetch("http://127.0.0.1:5000/seller/create", {
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
            HygieneUp | Sign Up
          </h2>
          <form onSubmit={handleSignIn}>
            <div className="relative mb-4">
              <label
                htmlFor="storename"
                className="leading-7 text-sm text-gray-600"
              >
                Store Name
              </label>
              <input
                type="text"
                id="storename"
                name="storename"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="fssaicode"
                className="leading-7 text-sm text-gray-600"
              >
                FSSAI Number
              </label>
              <input
                type="text"
                id="fssaicode"
                name="fssaicode"
                className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <Select onValueChange={(value) => setCuisine(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Middle East">Middle East</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="South Indian">South Indian</SelectItem>
                    <SelectItem value="Cafe">Cafe</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

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
            <div className="relative mb-4">
              <label
                htmlFor="confirm-password"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {/* <button
                  onClick={(e: any) => {
                    setStart(true);
                    e.preventDefault();
                  }}
                  className="text-white w-full mt-3 bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-600 rounded text-lg"
                >
                  Next
                </button> */}
            <button
              onClick={() => router.push("/store-home")}
              type="submit"
              className="text-white w-full mt-3 bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-600 rounded text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
