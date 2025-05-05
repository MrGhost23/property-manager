import { useEffect, useState } from "react";
import animationData from "../assets/home.json";
import Lottie from "lottie-react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background z-50 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="w-64 h-64">
        <Lottie animationData={animationData} loop={false} />
      </div>
      <h1 className="absolute bottom-1/4 text-2xl font-bold">
        Property Manager
      </h1>
    </div>
  );
};

export default SplashScreen;
