import { useEffect, useMemo } from "react";
import { useUserStore } from "../store/userStore";

import { UserItem, Layout } from "../components";

export default function UsersPage() {
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const loadUsers = useUserStore((state) => state.loadUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [users]
  );

  return (
    <Layout isHomepage>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading users...</div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="font-medium text-slate-900">{error}</p>
            <p className="mt-1 text-sm text-slate-500">
              Make sure the backend is running.
            </p>
          </div>
        ) : sortedUsers.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {sortedUsers.map((user) => (             
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="font-medium text-slate-900">No users found</p>
            <p className="mt-1 text-sm text-slate-500">
              Create your first user to get started.
            </p>
          </div>
        )}
      </div>
    </Layout> 
  );
}
