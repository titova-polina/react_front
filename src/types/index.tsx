export interface JobDetails {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_description: string;
  job_employment_type: string;
  job_location: string;
}

export interface User {
  name: string;
  email: string;
  desiredJobTitle?: string;
  aboutMe?: string;
}
