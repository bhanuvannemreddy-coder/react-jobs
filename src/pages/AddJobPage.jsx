import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  title: "",
  type: "Full-Time",
  location: "",
  description: "",
  salary: "",
  companyName: "",
  companyDescription: "",
  contactEmail: "",
  contactPhone: "",
};

const AddJobPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const job = {
      title: formData.title.trim(),
      type: formData.type,
      location: formData.location.trim(),
      description: formData.description.trim(),
      salary: formData.salary.trim(),
      company: {
        name: formData.companyName.trim(),
        description: formData.companyDescription.trim(),
        contactEmail: formData.contactEmail.trim(),
        contactPhone: formData.contactPhone.trim(),
      },
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        throw new Error("Failed to add job");
      }

      const createdJob = await res.json();
      navigate(`/jobs/${createdJob.id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to add the job. Make sure the JSON server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-50 min-h-[calc(100vh-5rem)] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">Add Job</h1>
        <p className="text-gray-600 mb-8">
          Create a new React job listing. The job will be saved to your local JSON server.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-semibold mb-2">Job Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Senior React Developer"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block font-semibold mb-2">Job Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Remote</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block font-semibold mb-2">Location</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Hyderabad, India"
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block font-semibold mb-2">Salary</label>
            <input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. $80K - $100K"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold mb-2">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the role, responsibilities, and requirements..."
            />
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-5">Company Information</h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="companyName" className="block font-semibold mb-2">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Acme Technologies"
                />
              </div>

              <div>
                <label htmlFor="companyDescription" className="block font-semibold mb-2">Company Description</label>
                <textarea
                  id="companyDescription"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell candidates about the company..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail" className="block font-semibold mb-2">Contact Email</label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="jobs@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block font-semibold mb-2">Contact Phone</label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="555-555-5555"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Job..." : "Add Job"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sm:w-32 bg-gray-200 text-gray-800 font-semibold rounded-lg px-6 py-3 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddJobPage;
