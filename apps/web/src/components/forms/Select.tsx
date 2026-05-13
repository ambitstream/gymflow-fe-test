import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  error?: FieldError;
  label: string;
  name: FieldPath<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
  required?: boolean;
};

export default function Select<T extends FieldValues>({
  error,
  label,
  name,
  options,
  register,
  required
}: Props<T>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && (<span className="text-sm text-red-500">*</span>)}
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              value={option.value}
              className="peer hidden"
              {...register(name)}
            />

            <div className="cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">
              {option.label}
            </div>
          </label>
        ))}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
