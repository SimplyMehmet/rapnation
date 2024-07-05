import Image from "next/image";

type Props = {
  height?: number;
  width?: number;
};

export const Loading = ({ height = 100, width = 100 }: Props) => {
  return (
    <Image src="/img/loading.svg" alt="loading" width={width} height={height} />
  );
};
