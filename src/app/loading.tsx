"use client";
import { RotatingSquare } from "react-loader-spinner";

const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <RotatingSquare
        visible={true}
        height="200"
        width="200"
        color="#4cbb17"
        ariaLabel="rotating-square-loading"
      />
    </div>
  );
};

export default Loading;
