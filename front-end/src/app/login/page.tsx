import { LoginButton } from "./components/LoginButton";

export default function page() {
  return (
    <div className="flex h-lvh items-center text-center justify-center">
      <div className="h-[60%] max-h-[200px] min-h-fit flex flex-col justify-between">
        <div className="mb-5">
          <h1>Log in to discover rappers you might like!</h1>
          <span className="font-rokkitt">
            Don&apos;t forget to add them to your favorite playlists
          </span>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
