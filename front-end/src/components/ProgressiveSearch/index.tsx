"use client";
import { InputText } from "@/components/Input/Text";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  placeholder?: string;
  name?: string;
  id?: string;
  state: [string, (val: string) => void];
  searchFunc: () => void | Promise<void>;
  interval?: number;
  data?: { title: string; iconUrl?: string }[];
  onSelect: (data: string) => void;
};

export const ProgressiveSearch = ({
  placeholder,
  name,
  id,
  state,
  searchFunc,
  interval = 400,
  data,
  onSelect,
}: Props) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [searchVal, setSearchVal] = state;
  const [prevSearched, setPrevSearched] = useState(searchVal);
  const [loading, setLoading] = useState(false);

  const onClickItem = (data: string) => {
    setPrevSearched(data);
    setSearchVal(data);
    onSelect(data);
  };

  useEffect(() => {
    if (searchVal.trim().length < 1) {
      setLoading(false);

      return;
    }

    if (searchVal === prevSearched) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      await searchFunc();
      setLoading(false);
      setPrevSearched(searchVal);
    }, interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchVal, interval, searchFunc, prevSearched]);

  return (
    <div className="relative">
      <InputText
        state={state}
        placeholder={placeholder}
        name={name}
        id={id}
        loading={loading}
        onBlur={() => setInputFocused(false)}
        onFocus={() => setInputFocused(true)}
      ></InputText>
      <div
        className={`absolute top-[110%] bg-c-white border-2 border-c-light-green rounded-3xl left-0 right-0 text-c-black pb-0 overflow-hidden ${
          (!inputFocused || !data?.length || !searchVal) && "hidden"
        }`}
      >
        <div className="no-scrollbar overflow-auto max-h-[260px] py-5">
          {data?.map((d, index) => (
            <div
              onMouseDown={() => onClickItem(d.title)}
              key={`${d.title}-${index}`}
              className={`cursor-pointer flex items-center py-2 px-3 hover:bg-c-light-green`}
            >
              <Image
                className="mr-3 h-[50px] w-[50px]"
                alt={`${d.title}-artist-image`}
                src={d.iconUrl ?? "/img/placeholder/image.svg"}
                height={50}
                width={50}
              />
              <span>{d.title}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t h-6 left-0 right-0 z-1 from-c-white pointer-events-none"></div>
        <div className="absolute top-0 bg-gradient-to-b h-6 left-0 right-0 z-1 from-c-white pointer-events-none"></div>
      </div>
    </div>
  );
};
