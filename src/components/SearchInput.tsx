import { FaSearch } from "react-icons/fa";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ onChange, value }: InputProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full md:max-w-[480px]"
    >
      <FaSearch className="pointer-events-none absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2  text-sm lg:text-lg" />
      <input
        className="bg-surface w-full rounded-sm py-5 pl-16 shadow-[0_2px_9px_0_rgba(0,0,0,0.0532)]"
        type="text"
        placeholder="Search for a country..."
        value={value}
        onChange={onChange}
      />
    </form>
  );
}
