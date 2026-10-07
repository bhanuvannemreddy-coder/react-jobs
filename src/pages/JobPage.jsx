import { Link, useLoaderData } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

const JobPage = () => {
  const job = useLoaderData();

  return (
    <section className="bg-blue-50 min-h-[calc(100vh-5rem)] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold mb-6"
        >
          <FaArrowLeft /> Back to Jobs
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <p className="text-gray-500 font-semibold mb-2">{job.type}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center gap-2 text-orange-700 mt-4">
                <FaMapMarker />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-bold mb-3">Job Description</h2>
              <p className="text-gray-700 leading-7 whitespace-pre-line">{job.description}</p>
            </div>

            <div className="border-t border-gray-100 mt-8 pt-6">
              <h2 className="text-2xl font-bold mb-3">Salary</h2>
              <p className="text-indigo-600 text-xl font-bold">{job.salary}</p>
            </div>
          </div>

          <aside className="bg-indigo-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Company Information</h2>
            <h3 className="text-xl font-semibold mb-3">{job.company?.name}</h3>
            <p className="text-gray-700 leading-7 mb-6">{job.company?.description}</p>

            <div className="space-y-3 text-gray-700">
              <a
                href={`mailto:${job.company?.contactEmail}`}
                className="flex items-center gap-3 hover:text-indigo-600 break-all"
              >
                <FaEnvelope className="text-indigo-600 shrink-0" />
                {job.company?.contactEmail}
              </a>
              <a
                href={`tel:${job.company?.contactPhone}`}
                className="flex items-center gap-3 hover:text-indigo-600"
              >
                <FaPhone className="text-indigo-600 shrink-0" />
                {job.company?.contactPhone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);

  if (!res.ok) {
    throw new Response("Job Not Found", { status: 404 });
  }

  return await res.json();
};

export { JobPage as default, jobLoader };
