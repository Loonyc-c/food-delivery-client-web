"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileIcon from "../_ui/ProfileIcon";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { email } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  console.log("UserContextType", email);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-full">
          <ProfileIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-semibold text-center">{email}</p>
          <button
            className="bg-[#F4F4F5] rounded-lg text-[14px] py-1 px-3"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
