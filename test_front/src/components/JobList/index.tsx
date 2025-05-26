"use client";

import { JobDetails } from "@/types";
import Image from "next/image";
import { DetailsIcon } from "../icons/details";
import { LikeIcon } from "../icons/like";
import { Dispatch, SetStateAction } from "react";

type JobListProps = {
  jobs: JobDetails[];
  likedJobs: Record<string, JobDetails>;
  setLikedJobs: Dispatch<SetStateAction<Record<string, JobDetails>>>;
  userId: string | null;
};

export const JobList = ({
  jobs,
  likedJobs,
  setLikedJobs,
  userId,
}: JobListProps) => {
  return (
    <ul className="flex flex-wrap gap-5 mt-7 mb-7">
      {jobs.map((job) => {
        const {
          job_id,
          job_title,
          employer_name,
          employer_logo,
          job_employment_type,
          job_location,
        } = job;
        const isLiked = likedJobs[job_id];
        return (
          <li
            key={job_id}
            className="w-96 flex gap-2 flex-col border-4 rounded-xl p-6 cursor-pointer"
          >
            {employer_logo ? (
              <Image
                src={employer_logo}
                width={100}
                height={100}
                alt={employer_name}
              />
            ) : null}
            <div className="mt-auto flex flex-col gap-2 mt-2">
              <h3>{job_title}</h3>
              <p>{employer_name}</p>
              <p>{job_employment_type}</p>
              <p>{job_location}</p>
            </div>
            <div className="flex justify-between inline-center mt-2">
              <a href={`/job-details/${job_id}`} className="w-8 h-8">
                <DetailsIcon />
              </a>

              <button
                className={`w-8 h-8 ${isLiked && "text-blue-600"}`}
                onClick={() => {
                  const nextLiked = { ...likedJobs };
                  if (isLiked) {
                    delete nextLiked[job_id];
                  } else {
                    nextLiked[job_id] = job;
                  }

                  setLikedJobs(nextLiked);
                  window.localStorage.setItem(
                    `likedJobs_${userId}`,
                    JSON.stringify(nextLiked)
                  );
                }}
              >
                <LikeIcon />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
