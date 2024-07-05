import { InputText } from "@/components/Input/Text";
import { useEffect, useState } from "react";

type Props = {
  placeholder?: string;
  name?: string;
  id?: string;
  state: [string, (val: string) => void];
  searchFunc: () => Promise<void>;
  interval?: number;
};

export const ProgressiveSearch = ({
  placeholder,
  name,
  id,
  state,
  searchFunc,
  interval = 400,
}: Props) => {
  const [searchVal] = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchVal.trim().length < 1) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      await searchFunc();
      setLoading(false);
    }, interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchVal, interval, searchFunc]);

  return (
    <div className="relative">
      <InputText
        state={state}
        placeholder={placeholder}
        name={name}
        id={id}
        loading={loading}
      ></InputText>
    </div>
  );
};
