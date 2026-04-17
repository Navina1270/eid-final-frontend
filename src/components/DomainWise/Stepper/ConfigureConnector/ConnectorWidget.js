import Image from "next/image";
import React from "react";

const ConnectorWidget = ({
    logo,
    title,
    LeftIcon,
    RightIcon,
    onLeftIconClick,
    onRightIconClick,
}) => {
    return (
        <div
            className="relative h-[110px] p-3 w-full rounded-2xl bg-slate-800 shadow-[0_0_20px_rgba(0,255,255,0.05)]  hover:shadow-[0_0_25px_rgba(0,255,255,0.1)] transition-transform duration-200 border border-slate-600 text-white flex flex-col items-center justify-center"
        >
            <Image src={logo} alt="logo" className=" mb-2" width={50} height={50} />

            <div className="flex items-center justify-between w-full px-1">
                {LeftIcon && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onLeftIconClick?.();
                        }}
                        className="text-slate-400 hover:text-cyan-300 transition-transform duration-200 hover:scale-110"
                    >
                        <LeftIcon className="w-4 h-4" />
                    </button>
                )}

                <p className="text-sm font-bold flex-1 text-center text-slate-300 bg-clip-text ">
                    {title}
                </p>

                {RightIcon && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRightIconClick?.();
                        }}
                        className="text-slate-400 hover:text-cyan-300 transition-transform duration-200 hover:scale-110"
                    >
                        <RightIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ConnectorWidget;
