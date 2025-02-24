import { useNavigate } from "react-router-dom";

interface Program {
  id: string;
  title: string;
  desc_title: string;
  description: string;
  icon: React.ReactNode;
}

const programs: Program[] = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    desc_title: "Web & Software Development",
    description: "Become a Full Stack software developer using React, Javascript and Node. Master the most sought-after- skills and land a job as a developer.",
    icon: <img src="/fs.png" alt="Full Stack Icon" className="w-25 h-15" />, // Icon size adjustable
  },
  {
    id: "qualityassurance",
    title: "Quality Assurance",
    desc_title: "Software Testing",
    description: "Become a Quality Assurance Engineer mastering Selenium and Jest. Learn automated testing best practices and land a job as a QA professional.",
    icon: <img src="/qa.png" alt="QA Icon" className="w-20 h-15" />, // Icon size adjustable
  },
  // Add more programs dynamically here
];

export default function Component() {
  const navigate = useNavigate();

  const handleReadMore = (id: string) => {
    navigate(`/programs/${id}`);
  };

  return (
    <div className="flex flex-col items-center gap-20 p-4 mt-[200px]">
      <div className="flex flex-wrap justify-center gap-[200px] w-full mx-auto">
        {programs.map((program) => (
          <div key={program.id} className="relative group flex-shrink-0 w-80">
            {/* Background shadow */}
            <div className="absolute inset-0 bg-black rounded-lg transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
            
            {/* Main content with hover animation */}
            <div className="relative bg-white rounded-lg p-5 shadow-lg flex flex-col h-80 border-2 border-black transition-transform group-hover:translate-y-[-4px] group-hover:shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-1000 text-sm">{program.desc_title}</p>
                  <h2 className="text-xl font-bold">{program.title}</h2>
                </div>
                <div className="flex items-center justify-center">
                  <div className="icon-container w-12 h-12 flex items-center justify-center">
                    {program.icon}
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <p className="text-sm text-gray-800">{program.description}</p>
                <button
                  className="self-center mt-2 px-4 py-2 text-sm font-medium text-white bg-wgs-blue border border-gray-300 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleReadMore(program.id)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
