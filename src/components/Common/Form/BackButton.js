const BackButton = ({ onClick, label = "Back" }) => (
  <button
    onClick={onClick}
    className="px-5 cursor-pointer py-1.5 rounded-lg border border-gray-600 hover:scale-105 transition font-bold"
  >
    {label}
  </button>
);

export default BackButton;
