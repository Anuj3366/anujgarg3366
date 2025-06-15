
const quickFacts = [
  "📱 iOS by day, Swift by night",
  "🎮 Gaming breaks between coding sessions",
  "🍕 Pizza-powered programmer",
  "🏗️ Building scalable architectures",
];

const educationDetails = [
  "🎓 B.E. CSE, Chitkara University (2021-2025)",
  "🏫 N.C Jindal Public School (2019-2021)",
  "🏫 Adarsh Public School (2011-2019)",
];

const AboutFacts = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold text-black dark:text-white">Quick Facts</h3>
        <ul className="mt-2 space-y-2 text-black/80 dark:text-white/80">
          {quickFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black dark:text-white">Education</h3>
        <ul className="mt-2 space-y-2 text-black/80 dark:text-white/80">
          {educationDetails.map((education, index) => (
            <li key={index}>{education}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutFacts;
