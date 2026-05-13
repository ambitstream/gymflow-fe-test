import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { type User, USER_ROLE_LABELS_MAP } from "@gymflow/shared";

type Props = {
  user: User;
};

export default function UserItem({ user }: Props) {
  return (
    <motion.div
      whileHover={{
        x: -2,
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <Link
        key={user.id}
        to={`/users/${user.id}`}
        className="flex items-center justify-between gap-4 p-4 transition hover:bg-slate-50"
      >
        <div>
          <p className="font-semibold text-slate-900">
              {user.fullName}
          </p>
          <p className="text-sm text-slate-500">
              {user.dateOfBirth || "-"}
          </p>
        </div>
      
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {USER_ROLE_LABELS_MAP[user.role]}
        </span>
      </Link>
    </motion.div>
  );
}
