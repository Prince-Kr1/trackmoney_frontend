const InfoCard = ({ label, value, icon, iconBg = "bg-gray-100", bottomBarColor }) => {
  return (
    <div className="relative w-full rounded-2xl bg-white px-5 py-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
      
      {/* Top-right icon */}
      <div className={`absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full ${iconBg}`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>

      {/* Text */}
      <h6 className="text-sm text-gray-600">{label}</h6>
      <div className="text-[24px] font-semibold text-gray-900 mt-1">{"\u20B9"} {Number(value).toLocaleString('en-IN')}</div>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 w-full h-[8px] rounded-b-2xl ${bottomBarColor}`}></div>
    </div>
  );
};

export default InfoCard;
