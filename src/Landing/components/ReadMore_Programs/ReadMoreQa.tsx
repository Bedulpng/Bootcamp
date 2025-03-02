import { useEffect } from "react";
import { Badge } from "@/Landing/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Landing/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function RmFs() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="font-montserrat">
        {/* Banner Section */}
    <section className="relative overflow-hidden bg-white h-screen">
    <div className="relative mx-auto max-w-[1440px] h-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center bg-black p-6 lg:p-8 clip-path-polygon">
            <div className="max-w-[520px]">
                <p className="mb-4 text-white text-xl lg:text-2xl">Our Program</p>
                <h1 className="mb-4 inline-block text-4xl font-bold text-white lg:text-5xl">
                    <span className="relative">
                        Quality Assurance
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-500"></span>
                    </span>
                </h1>
                <p className="text-white text-lg lg:text-xl">
                    Become a master of Quality Assurance with our comprehensive program.
                </p>
            </div>
        </div>


        {/* Right Content - Full Image */}
        <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-0 lg:p-0">
            <img
            src="/qa_sect.png"
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

      {/* Banner Section */}
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Quality Assurance Program</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Master the fundamentals of Quality Assurance and become an indispensable asset in software development teams.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Program Highlights</CardTitle>
              <CardDescription>What you'll learn in this QA bootcamp</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Software Testing Fundamentals",
                  "Test Planning and Strategy",
                  "Manual Testing Techniques",
                  "Automated Testing Basics",
                  "Performance Testing Principles",
                  "Bug Reporting and Tracking",
                  "Agile Testing Methodologies"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
              <CardDescription>Essential information about the QA bootcamp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Duration</h4>
                  <p>20 days, full-time flexible schedule</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Format</h4>
                  <p>Offlien lecture and hands-on practical assignments</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Prerequisites</h4>
                  <p>Basic computer skills and familiarity with software applications</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Career Support</h4>
                  <p>Resume building and interview preparation for QA positions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">QA Skills You'll Develop</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Test Case Design",
              "Defect Management",
              "Regression Testing",
              "User Acceptance Testing",
              "API Testing",
              "Test Automation",
              "Performance Testing",
              "Security Testing Basics",
              "Mobile App Testing",
              "Continuous Integration"
            ].map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}