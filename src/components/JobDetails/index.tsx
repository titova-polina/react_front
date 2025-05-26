"use client";

import Image from "next/image";
import useSWR from "swr";
import { fetchJobsDetails } from "@/API";

type JobDetailsProps = {
  jobId: string;
};

export const JobDetails = ({ jobId }: JobDetailsProps) => {
  const {
    data: jobDetails,
    error,
    isLoading,
  } = useSWR(`/job-details?job_id=${jobId}`, async () => {
    const response = await fetchJobsDetails({ job_id: jobId });
    return response.data[0];
  });

  if (error) {
    return <div className="max-w-7xl m-auto p-8">Not Found</div>;
  }

  if (isLoading && !jobDetails) {
    return <div className="max-w-7xl m-auto p-8">...loading</div>;
  }

  function goBack() {
    window.history.back();
  }

  return (
    jobDetails && (
      <section>
        <div className="max-w-7xl m-auto p-8">
          <button onClick={goBack}>Back</button>
          <ul>
            <li className="flex gap-2 flex-col pt-6 pb-6 cursor-pointer">
              {jobDetails.employer_logo ? (
                <Image
                  src={jobDetails.employer_logo}
                  width={100}
                  height={100}
                  alt={jobDetails.employer_name}
                />
              ) : null}
              <div className="mt-auto flex flex-col gap-2 mt-2">
                <h3>{jobDetails.job_title}</h3>
                <p>{`Employer Name: ${jobDetails.employer_name}`}</p>
                <p>{`Employment Type: ${jobDetails.job_employment_type}`}</p>
                <p>{`Job Location: ${jobDetails.job_location}`}</p>
                <p>{`Job Description: ${jobDetails.job_description}`}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    )
  );
};
