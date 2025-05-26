"use client";

import { JobDetails } from "@/types";
import { useEffect, useState } from "react";
import { JobList } from "../JobList";

export const LikedJobs = () => {
  const [likedJobs, setLikedJobs] = useState<Record<string, JobDetails>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const rawData = window.localStorage.getItem("userData");
    if (rawData) {
      const userData = JSON.parse(rawData);
      setUserId(userData.user._id);

      const likedJobsRaw = window.localStorage.getItem(
        `likedJobs_${userData.user._id}`
      );

      if (likedJobsRaw) {
        setLikedJobs(JSON.parse(likedJobsRaw));
      }
    }
  }, []);

  return (
    <section>
      <div className="max-w-7xl m-auto p-8">
        <h3 className="text-3xl font-semibold text-blue-500">Liked Jobs</h3>
        <JobList
          jobs={Object.values(likedJobs)}
          userId={userId}
          likedJobs={likedJobs}
          setLikedJobs={setLikedJobs}
        />
      </div>
    </section>
  );
};
