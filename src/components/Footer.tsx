import { Linkedin, Instagram, ChevronDown } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <footer className="bg-[#000000] text-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4 col-span-2">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white_logo-nQNyKGAQxJQloRYIR34p6Aaig53dBl.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </div>
            <h4 className="mb-4 font-semibold">Find us At</h4>
            <p className="text-gray-400">
              Jl. Soekarno-Hatta No.104, Babakan Ciparay, Kec. Babakan Ciparay, Kota Bandung, Jawa Barat 40223
            </p>
          </div>

          {/* Sections */}
          {[
            {
              title: "For Corporate",
              links: ["Custom Bootcamp and Hire", "Geeksfarm Bootcamp Grads for hire"],
              extraSection: {
                title: "For Talent",
                links: ["E-Learning"],
              },
            },
            {
              title: "About Us",
              links: ["Tech News"],
              includeSocialIcons: true,
            },
          ].map((section, idx) => (
            <div
              key={section.title}
              className={`col-span-2 ${
                idx === 1 ? "md:col-start-5 md:col-span-2" : ""
              } pl-0 md:pl-6 border-l-0 md:border-l-2 border-blue-600 ${idx === 0 ? "md:pl-0 md:border-l-0" : ""}`}
            >
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between font-semibold mb-4 focus:outline-none"
              >
                <h3>{section.title}</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 md:hidden ${
                    expandedSections[section.title] ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden md:block
                ${expandedSections[section.title] ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-96 md:opacity-100"}`}
              >
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>

                {section.extraSection && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">{section.extraSection.title}</h4>
                    <ul className="space-y-2">
                      {section.extraSection.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.includeSocialIcons && (
                  <div className="flex space-x-6 mt-6">
                    {[Linkedin, Instagram].map((Icon, index) => (
                      <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-center">
          <p className="text-gray-400">© 2024 Walden Global Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

