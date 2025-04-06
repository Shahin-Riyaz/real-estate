import { FaHome, FaBuilding, FaUsers, FaChartLine } from "react-icons/fa";

const stats = [
  {
    icon: <FaHome className="text-3xl text-white" />,
    value: "2000+",
    label: "Properties Sold",
  },
  {
    icon: <FaBuilding className="text-3xl text-white" />,
    value: "500+",
    label: "Luxury Towers",
  },
  {
    icon: <FaUsers className="text-3xl text-white" />,
    value: "20K+",
    label: "Happy Clients",
  },
  {
    icon: <FaChartLine className="text-3xl text-white" />,
    value: "500M+",
    label: "AED in Investments",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#10161c] py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center"
            data-aos="fade-up"
          >
            <div className="rounded-full border-2 border-orange-500 p-6 mb-4">
              {stat.icon}
            </div>
            <h3 className="text-4xl font-bold text-gray-100">{stat.value}</h3>
            <p className="text-gray-300 mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
