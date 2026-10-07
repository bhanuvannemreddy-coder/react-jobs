import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center min-h-[calc(100vh-5rem)] px-4">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-5xl md:text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5 text-gray-600">This page does not exist.</p>
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-5 py-3"
      >
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
