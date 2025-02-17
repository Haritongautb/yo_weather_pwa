import { NextPage } from "next";
import Link from "next/link";
import { NoDataBanner } from "@/components";

const NotFound: NextPage = () => {
  return (
    <NoDataBanner title="Not Found">
      <p className="block text-[25px] mb-[40px]">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="p-[10px] mb-[40px] cursor-pointer bg-[#4cbb17] rounded-[20px]"
      >
        Return to Homepage
      </Link>
    </NoDataBanner>
  );
};

export default NotFound;
