import { Loading } from "@/components/Loading";
import { SyntheticEvent } from "react";

type Props = {
  name?: string;
  id?: string;
  placeholder?: string;
  state: [string, (val: string) => void];
  loading?: boolean;
  onFocus?: (e?: SyntheticEvent<HTMLInputElement, FocusEvent>) => void;
  onBlur?: (e?: SyntheticEvent<HTMLInputElement, FocusEvent>) => void;
};

export const InputText = ({
  name,
  id,
  placeholder = "input text here...",
  state,
  loading,
  onFocus,
  onBlur,
}: Props) => {
  const [value, setState] = state;

  return (
    <div className="relative">
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-full pr-10 px-3 py-2 text-c-black border-2 border-c-black focus:border-c-dark-green focus:outline-none"
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setState(e.currentTarget.value)}
      />
      {loading && (
        <div className="absolute right-[8px] top-[50%] translate-y-[-50%]">
          <Loading width={30} height={30} />
        </div>
      )}
    </div>
  );
};
