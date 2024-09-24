import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p>Page not found.</p>
      <Link to="/">
        <div className="text-blue-500">Back to Home</div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
