import { ReactElement } from "react";
import { LoginButton } from "./components/LoginButton";

export default function page(): ReactElement {
  return (
    <div className="flex h-lvh items-center text-center justify-center">
      <div className="h-[60%] max-h-[200px] min-h-fit flex flex-col justify-between">
        <div className="mb-5">
          <h1>Log in to discover rappers you might like!</h1>
          <span className="font-rokkitt">
            Works best with a premium account
          </span>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
