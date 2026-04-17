
const ApplicationCard = ({ title, score, icon: Icon, onClick,bgroundColor,bghoverColor }) => (
    <div
        onClick={onClick}
        className={`group text-white transition-all duration-300 border mb-4 rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-cyan-500/20` + (bgroundColor ? ` ${bgroundColor}` : '') + (bghoverColor ? ` hover:${bghoverColor}` : '')}
    >
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-lime-400 bg-opacity-20 text-cyan-300">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400">{title} <br></br>Score : {score}</h3>
        </div>
    </div>
);

export default ApplicationCard