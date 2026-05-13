import { Link } from "react-router-dom";

type LayoutProps = {
    title?: string;
    isHomepage?: boolean;
    children?: React.ReactNode;
}

export default function Layout({
    title,
    isHomepage,
    children
}: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {title || "GymFlow"}
            </h1>

            <p className="text-sm text-slate-500">
              Manage gym staff and members
            </p>
          </div>
            <Link
                to={isHomepage ? "/users/new" : "/"}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
                {isHomepage ? "Add User" : "Back"}
            </Link>
        </div>

        {children}
      </div>
    </main>
  );
}
