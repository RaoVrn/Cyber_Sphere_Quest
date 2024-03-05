import { Link } from '@remix-run/react';

export default function Nav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white fixed top-0 w-full h-14">
      <h1 className="text-2xl font-bold">Face Recognition</h1>
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-blue-500">
          Register Face
        </Link>
        <Link to="/dashboard" className="text-white hover:text-blue-500">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
