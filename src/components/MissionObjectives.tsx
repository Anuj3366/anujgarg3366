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
      return "text-green-700 dark:text-green-500";
    case "negative":
      return "text-red-600 dark:text-red-500";
    case "warning":
      return "text-yellow-700 dark:text-yellow-500";
    default:
      return "text-foreground/80";
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
      <h3 className="text-lg font-medium">Current Mission Objectives</h3>
      <ul className="mt-2 space-y-2 text-foreground/80">
        {missionObjectives.map((objective, index) => (
          <li key={index} className={getStatusClass(objective.status)}>
            {getStatusPrefix(objective.status)} {objective.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionObjectives;
