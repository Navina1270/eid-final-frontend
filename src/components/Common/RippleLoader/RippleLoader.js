import Image from "next/image";
import ReactDOM from "react-dom";

const RippleLoader = () => {
  return ReactDOM.createPortal(

    <div className="fixed inset-0 z-50 bg-slate-100/40 backdrop-blur-sm flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen ">
        <div className="relative flex items-center justify-center ">
          {/* {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="absolute inset-2.5 border-2 border-cyan-400 opacity-10 animate-ripple "
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          ))} */}

          <Image
            src={"/images/Aivee_timer.gif"}
            alt="Aivee Bot"
            width={300}
            height={300}
            className="z-10"
            priority
          />
        </div>
        <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(1.5);
              opacity: 0.6;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }

          .animate-ripple {
            animation: ripple 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
      </div>
    </div>,
    document.body

  );
};

export default RippleLoader;
