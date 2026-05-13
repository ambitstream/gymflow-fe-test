import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/users"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Back to users
        </Link>
      </div>
    </main>
  );
}
