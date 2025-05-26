import axios, { AxiosResponse } from "axios";
import { JobDetails, User } from "./types";

type JSearchResponse<T> = {
  status: "OK" | "BAD";
  request_id: string;
  parameters: Record<string, string | number>;
  data: T;
};

export type UserResponse = {
  user: User;
  tokenAccess: string;
  tokenRefresh: string;
};

interface GetJobDetailsParams {
  job_id: string;
  country?: string;
  language?: string;
  fields?: (keyof JobDetails)[];
}

type GetJobsParams = {
  query: string;
  page?: number;
  num_pages?: number;
  country?: string;
  language?: string;
  date_posted?: "all" | "today" | "3days" | "week" | "month";
  work_from_home?: boolean;
  employment_types?: ("FULLTIME" | "CONTRACTOR" | "PARTTIME" | "INTERN")[];
  job_requirements?: (
    | "under_3_years_experience"
    | "more_than_3_years_experience"
    | "no_experience"
    | "no_degree"
  )[];
  radius?: number;
  exclude_job_publishers?: string;
  fields?: (keyof JobDetails)[];
};

const JSEARCH_API = axios.create({
  baseURL: `https://jsearch.p.rapidapi.com`,
  headers: {
    "x-rapidapi-key": "8aeb43e818msh4375f90dbd99843p146fb0jsnb70346ff8b53",
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  },
});

const API = axios.create({
  baseURL: `http://localhost:3002/api`,
  headers: { "content-type": "application/json", accept: "application/json" },
});

export const fetchJobs = async ({
  query = "",
  page,
  num_pages,
  country,
  language,
  date_posted,
  work_from_home,
  employment_types,
  job_requirements,
  radius,
  exclude_job_publishers,
  fields,
}: GetJobsParams): Promise<JSearchResponse<JobDetails[]>> => {
  const response = await JSEARCH_API.get("/search", {
    params: {
      query,
      page,
      num_pages,
      country,
      language,
      date_posted,
      work_from_home,
      employment_types,
      job_requirements,
      radius,
      exclude_job_publishers,
      fields,
    },
  });
  return response.data;
};

export const fetchJobsDetails = async ({
  job_id,
  country,
  language,
  fields,
}: GetJobDetailsParams): Promise<JSearchResponse<JobDetails[]>> => {
  const response = await JSEARCH_API.get("/job-details", {
    params: {
      job_id,
      country,
      language,
      fields: fields && fields.join(),
    },
  });
  return response.data;
};

export const register = async ({
  name,
  email,
  password,
  desiredJobTitle,
  aboutMe,
}: User & { password: string }): Promise<AxiosResponse<UserResponse>> => {
  const response = await API.post("/user/register", {
    name,
    email,
    password,
    desiredJobTitle,
    aboutMe,
  });
  return response;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<UserResponse>> => {
  const response = await API.post("/user/login", {
    email,
    password,
  });
  return response;
};

export const refresh = async (): Promise<AxiosResponse<UserResponse>> => {
  const response = await API.post("/user/refresh", {});

  return response;
};
