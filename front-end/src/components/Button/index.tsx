// must be used in client
import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  bgImageUrl?: string;
  bgImagePosition?: "left" | "right";
};

export const Button = ({
  onClick,
  children,
  bgImageUrl,
  bgImagePosition = "right",
}: Props) => {
  return (
    <span className="py-2 px-2 bg-c-dark-green rounded-full inline-block transition-all active:scale-[.99] hover:scale-[1.04] cursor-pointer">
      <button
        className={`px-20 bg-contain bg-no-repeat`}
        style={{
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "",
          backgroundPosition: bgImagePosition,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </span>
  );
};
