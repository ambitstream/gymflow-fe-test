import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  error?: FieldError;
  label: string;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  required?: boolean;
};

export default function DatePicker<T extends FieldValues>({
  error,
  label,
  name,
  register,
  required
}: Props<T>) {
  return (
    <div>
      <label className="mb-2 flex text-sm font-semibold text-slate-700">
        {label} {required && (<span className="text-sm text-red-500">*</span>)}
      </label>

      <input
        type="date"
        max={new Date().toISOString().split("T")[0]}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
        {...register(name)}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
