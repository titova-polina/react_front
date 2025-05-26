import { JobDetails } from "@/components/JobDetails";

type JobDetailsParams = {
  id: string;
};

export default async function JobsDetailsPage({
  params,
}: {
  params: Promise<JobDetailsParams>;
}) {
  return (
    <div>
      <JobDetails jobId={decodeURIComponent((await params).id)} />
    </div>
  );
}
