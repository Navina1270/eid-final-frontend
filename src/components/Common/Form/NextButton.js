
const NextButton = ({ onClick, label = "Next Stage", disabled = false, px = 5 }) => (
  <div className="inline-block p-[1px] rounded-md bg-gradient-to-r from-lime-400 to-cyan-400 hover:scale-105 transition">

    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-${px} py-1.5 bg-slate-800 hover:bg-gradient-to-r from-lime-400 to-cyan-400 hover:text-slate-900 rounded-md  text-gray-300 font-bold transition 
              ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {label}
    </button>
  </div>

);

export default NextButton;
