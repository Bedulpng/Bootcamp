  import { MessageCircleMoreIcon } from 'lucide-react';

export default function ContactSect() {
  return (
    <div className="font-montserrat">
      {/* Banner Section */}
    <section className="relative overflow-hidden bg-white h-screen">
    <div className="relative mx-auto max-w-[1440px] h-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center bg-black p-6 lg:p-8 clip-path-polygon">
            <div className="max-w-[520px]">
            <h1 className="mb-4 inline-block text-4xl font-bold text-white lg:text-5xl">
                <span className="relative">
                Contact
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-500"></span>
                </span>
            </h1>
            </div>
        </div>

        {/* Right Content - Full Image */}
        <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-0 lg:p-0">
            <img
            src="/contact.png"
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

    {/* Contact Form Section */}
    <section className="w-full min-h-screen bg-[#0033FF] py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left Column - Chat Section */}
        <div className="space-y-12">
          <div>
            <h2 className="text-white text-base font-bold tracking-wider mb-4">GET IN TOUCH WITH US</h2>
            <div className="h-0.5 bg-white mb-12" style={{ width: 'calc(100% - 3rem)' }}></div>
            <h3 className="text-white text-5xl font-bold mb-6">What can we do to help you?</h3>
            <p className="text-white/90 text-xl leading-relaxed">
              Digital Transformation is essential in todays era of volatility. Are you ready to Future-Proof your business?
            </p>
          </div>
          <div>
            <button className="inline-flex items-center gap-3 bg-white text-[#0033FF] px-8 py-4 rounded-md hover:bg-white/90 transition-colors font-bold text-lg">
              <MessageCircleMoreIcon className="w-6 h-6" />
              Chat with Us
            </button>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Left Form Column */}
            <div className="space-y-10">
              <div className="space-y-3">
                <label htmlFor="name" className="text-white text-base font-medium block">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b-2 border-white/70 focus:border-white text-white placeholder:text-white/50 pb-3 focus:outline-none text-lg"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-white text-base font-medium block">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your E-mail"
                  className="w-full bg-transparent border-b-2 border-white/70 focus:border-white text-white placeholder:text-white/50 pb-3 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Right Form Column */}
            <div className="space-y-10">
              <div className="space-y-3">
                <label htmlFor="phone" className="text-white text-base font-medium block">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full bg-transparent border-b-2 border-white/70 focus:border-white text-white placeholder:text-white/50 pb-3 focus:outline-none text-lg"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="social" className="text-white text-base font-medium block">Whatsapp/ Telegram/ Instagram</label>
                <input
                  id="social"
                  type="text"
                  placeholder="Your Account"
                  className="w-full bg-transparent border-b-2 border-white/70 focus:border-white text-white placeholder:text-white/50 pb-3 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>

          {/* Full Width Message Field */}
          <div className="space-y-3">
            <label htmlFor="message" className="text-white text-base font-medium block">How Can We Help You?</label>
            <textarea
              id="message"
              placeholder="Type Here..."
              rows={4}
              className="w-full bg-transparent border-b-2 border-white/70 focus:border-white text-white placeholder:text-white/50 pb-3 focus:outline-none text-lg resize-none"
            />
          </div>

          {/* Newsletter Checkbox */}
          {/* <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="newsletter"
              className="w-5 h-5 rounded border-white/70 bg-transparent text-[#0033FF] focus:ring-white"
            />
            <label htmlFor="newsletter" className="text-white text-base">
              Would you like to get update on WGS tech news?
            </label>
          </div> */}

          {/* Send Message Button */}
          <button
            type="submit"
            className="bg-white text-[#0033FF] px-12 py-4 rounded-md font-bold text-lg hover:bg-white/90 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
    </div>
  );
}
