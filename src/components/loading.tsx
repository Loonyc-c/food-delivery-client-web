import NomNomIcon from "@/app/(footer)/_ui/nomnom-icon";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="p-8 bg-[#18181B] rounded-lg flex flex-col justify-center items-center gap-5">
        <NomNomIcon />
        <ClipLoader
          color={"#EF4444"}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loading;
