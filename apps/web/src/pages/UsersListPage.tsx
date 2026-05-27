import { useEffect, useRef } from "react";
import { useUserStore } from "../store/userStore";

import { UserItem, Layout } from "../components";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function UsersPage() {
  const users = useUserStore((state) => state.users);
  const pagination = useUserStore((state) => state.pagination);
  const isLoading = useUserStore((state) => state.isLoading);
  const isLoadingMore = useUserStore((state) => state.isLoadingMore);
  const error = useUserStore((state) => state.error);
  const loadUsers = useUserStore((state) => state.loadUsers);
  const loadNextUsersPage = useUserStore((state) => state.loadNextUsersPage);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { hasNextPage } = pagination;

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  useInfiniteScroll(targetRef, () => {
    void loadNextUsersPage();
  }, !isLoading && !isLoadingMore && users.length > 0 && hasNextPage);

  return (
    <Layout isHomepage>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading && users.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Loading users...</div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="font-medium text-slate-900">{error}</p>
            <p className="mt-1 text-sm text-slate-500">
              Make sure the backend is running.
            </p>
          </div>
        ) : users.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {users.map((user) => (             
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
        <div
          ref={targetRef}
          className="h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"
        />
        {isLoadingMore && (
          <div className="p-4 text-center text-sm text-slate-500">
            Loading more users...
          </div>
        )}
      </div>
    </Layout> 
  );
}
