"use client";

import { UserResponse } from "@/API";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log("PATH", pathname);
  const [authorizedUser, setAuthorizedUser] = useState<UserResponse | null>(
    null
  );

  useEffect(() => {
    const rawData = window.localStorage.getItem("userData");
    if (rawData) {
      setAuthorizedUser(JSON.parse(rawData) as UserResponse);
    }
  }, []);

  return (
    <header className="border-b-2 border-blue-200 ">
      <div className="max-w-7xl m-auto flex flex-wrap gap-10 items-center p-8">
        <Link href="/" className="font-black text-lg text-blue-600 w-fit">
          Search Job
        </Link>
        <nav className="flex gap-7 ml-auto">
          <Link
            href="/jobs"
            className={`text-lg text-blue-600 hover:text-sky-600 transition duration-600 ease-in ${
              pathname === "/jobs" && "text-cyan-400"
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/liked"
            className={`text-lg text-blue-600 hover:text-sky-600 transition duration-600 ease-in ${
              pathname === "/liked" && "text-cyan-400"
            }`}
          >
            Liked
          </Link>
          {authorizedUser ? (
            <button
              className="text-lg text-blue-600 hover:text-blue-800 transition duration-600 ease-in"
              onClick={() => {
                window.localStorage.removeItem("userData");
                router.push("/create-profile");
                window.location.reload();
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              href="/create-profile"
              className="text-lg text-blue-600 hover:text-blue-800 transition duration-600 ease-in"
            >
              Create profile
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
