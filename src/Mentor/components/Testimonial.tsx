import { MapPin, Building2Icon, GraduationCap, BriefcaseIcon } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: '200+ Graduates',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'On the spot learning',
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6" />,
    title: '70% Hired',
  },
  {
    icon: <Building2Icon className="w-6 h-6" />,
    title: 'Be part of Us',
  },
];

export function Testimonial() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Us?</h2>
          <p className="text-xl text-gray-600">
            Reasons why you should choose WGS Bootcamp
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 p-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="relative group aspect-square">
                <div className="absolute inset-0 bg-black rounded-xl transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
                <div className="relative bg-white rounded-xl p-8 flex flex-col items-center justify-center h-full border-2 border-black transition-all hover:shadow-lg">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-gray-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
