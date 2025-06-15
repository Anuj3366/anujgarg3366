
const missionObjectives = [
  { text: "Master SwiftUI & Combine", status: "positive" },
  { text: "Level up MVVM-C architecture", status: "positive" },
  { text: "Reach 1800 on Codeforces", status: "positive" },
  { text: "Excel at OLX iOS development", status: "positive" },
  { text: "Sleep schedule (Who needs that anyway?)", status: "negative" },
  { text: "Build apps that future me won't hate", status: "warning" },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "positive":
      return "text-green-600 dark:text-green-400 font-medium";
    case "negative":
      return "text-red-600 dark:text-red-400 font-medium";
    case "warning":
      return "text-yellow-600 dark:text-yellow-400 font-medium";
    default:
      return "text-black dark:text-white font-medium";
  }
};

const getStatusPrefix = (status: string) => {
  switch (status) {
    case "positive":
      return "+";
    case "negative":
      return "-";
    case "warning":
      return "!";
    default:
      return "";
  }
};

const MissionObjectives = () => {
  return (
    <div className="mt-6 w-full">
      <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Current Mission Objectives</h3>
      <ul className="mt-2 space-y-3">
        {missionObjectives.map((objective, index) => (
          <li 
            key={index} 
            className={`${getStatusClass(objective.status)} text-sm leading-relaxed transition-colors duration-200`}
          >
            <span className="inline-block w-4 text-center font-bold">
              {getStatusPrefix(objective.status)}
            </span>
            <span className="ml-1">{objective.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionObjectives;
