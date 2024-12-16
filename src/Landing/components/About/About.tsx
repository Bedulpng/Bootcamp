import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Landing/components/ui/card"
import { Badge } from "@/Landing/components/ui/badge"

export default function AboutSection() {
  return (

    <div className="font-montserrat">
      {/* Banner Section */}
    <section className="relative overflow-hidden bg-white h-screen">
    <div className="relative mx-auto max-w-[1440px] h-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center bg-black p-6 lg:p-8 clip-path-polygon">
            <div className="max-w-[520px]">
                <p className="mb-4 text-white text-xl lg:text-2xl">Who are we?</p>
                <h1 className="mb-4 inline-block text-4xl font-bold text-white lg:text-5xl">
                    <span className="relative">
                        About us
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-500"></span>
                    </span>
                </h1>
            </div>
        </div>


        {/* Right Content - Full Image */}
        <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-0 lg:p-0">
            <img
            src="/about.png"
            alt="Illustration"
            className="w-full h-full object-cover rounded-none"
            />
        </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-1/2 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="absolute -left-4 top-1/4 h-48 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute -right-4 bottom-1/4 h-48 w-px bg-gradient-to-b from-transparent via-yellow-500 to-transparent" />
    </div>
    </section>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Our Coding Bootcamp</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Empowering the next generation of tech innovators</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                At our coding bootcamp, we're committed to providing intensive, hands-on training that transforms beginners into job-ready developers. Our curriculum is designed to meet the evolving needs of the tech industry, ensuring our graduates are equipped with the most in-demand skills.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us?</CardTitle>
              <CardDescription>What sets our bootcamp apart</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Industry-aligned curriculum</li>
                <li>• Experienced instructors from top tech companies</li>
                <li>• Small class sizes for personalized attention</li>
                <li>• Career support and job placement assistance</li>
                <li>• Flexible learning options (full-time and part-time)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Our Programs</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Full Stack Web Development", "Data Science", "UX/UI Design", "Cybersecurity", "Mobile App Development"].map((program, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {program}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Join us and take the first step towards a rewarding career in tech. Our next cohort starts soon!
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}