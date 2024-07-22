import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <>
      <h1 className="text-indigo-600">Home Page</h1>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <ModeToggle />
    </>
  );
}
