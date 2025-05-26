"use client";

import { fetchJobs } from "@/API";
import { JobDetails } from "@/types";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LikeIcon } from "../icons/like";
import { DetailsIcon } from "../icons/details";
import { JobList } from "../JobList";

export const JobSearchList = () => {
  const [data, setData] = useState<JobDetails[]>([]);
  const [likedJobs, setLikedJobs] = useState<Record<string, JobDetails>>({});
  const [userId, setUserId] = useState<string | null>(null);

  const fetchData = useCallback(async (query: string) => {
    const response = await fetchJobs({ query });
    setData(response.data);
  }, []);

  useEffect(() => {
    const fetchUserDesiredJobs = async () => {
      const rawData = window.localStorage.getItem("userData");
      if (rawData) {
        const userData = JSON.parse(rawData);
        setUserId(userData.user._id);
        const response = await fetchJobs({
          query: userData.user.desiredJobTitle,
        });
        setData(response.data);

        const likedJobsRaw = window.localStorage.getItem(
          `likedJobs_${userData.user._id}`
        );

        if (likedJobsRaw) {
          setLikedJobs(JSON.parse(likedJobsRaw));
        }
      }
    };
    fetchUserDesiredJobs();
  }, []);

  return (
    <section className="max-w-7xl m-auto pr-8 pl-8">
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={({ search }) => {
          fetchData(search);
        }}
      >
        <Form className="m-auto flex flex-nowrap mt-8">
          <Field
            type="text"
            name="search"
            placeholder="type to search"
            className="border-2 border-sky-700 rounded-l-xl p-2"
          />
          <button
            type="submit"
            className="border-2 rounded-r-xl bg-sky-200 hover:bg-sky-300 border-sky-700 p-2 text-blue-600 hover:text-blue-800 transition duration-600 ease-in"
          >
            Search
          </button>
        </Form>
      </Formik>
      <JobList
        jobs={data}
        userId={userId}
        likedJobs={likedJobs}
        setLikedJobs={setLikedJobs}
      />
    </section>
  );
};
