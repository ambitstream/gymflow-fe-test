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
    <main className="min-h-screen bg-slate-50 px-4 pb-6 pt-28">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
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
      </header>

      <div className="mx-auto max-w-2xl">
        {children}
      </div>
    </main>
  );
}
