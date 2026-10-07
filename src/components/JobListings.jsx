import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");

      const apiUrl = isHome ? "/api/jobs?_page=1&_per_page=3" : "/api/jobs";

      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        const jobsData = Array.isArray(data) ? data : data.data;

        setJobs(Array.isArray(jobsData) ? jobsData : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load jobs. Make sure the JSON server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-5 text-center">
            {error}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
