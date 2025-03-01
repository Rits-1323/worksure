import Link from "next/link"
import { ArrowRight } from "lucide-react"
import "../styles/glow-effect.css"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 glow-effect">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <img className="h-16 w-16 rounded-full" src="favicon.png" alt="WorkSure Logo" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Home
                </Link>
                <Link href="#features" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Features
                </Link>
                <Link href="#contact" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">WorkSure</h1>
              <p className="mt-4 text-xl text-gray-600">
                Connecting skilled contractors with employers for reliable workforce management
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login/employer"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Employer Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login/contractor"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Contractor Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="hero.jpg"
                alt="WorkSure platform illustration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How WorkSure Works</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform simplifies workforce management for both employers and contractors
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col hover-effect">
                <dt className="text-xl font-semibold leading-7 text-gray-900">For Employers</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Find reliable contractors, track their performance, and maintain a roster of trusted workers for
                    your projects.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col hover-effect">
                <dt className="text-xl font-semibold leading-7 text-gray-900">For Contractors</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Manage your workforce, showcase your portfolio, and connect with employers seeking your expertise.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col hover-effect">
                <dt className="text-xl font-semibold leading-7 text-gray-900">For Workers</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get connected to jobs through your contractor, build your reputation, and access skill development
                    opportunities.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16" id="contact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get in touch with our team for any inquiries or support.
            </p>
          </div>
          <div className="mt-10">
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">Ritvik</span>
                <a href="mailto:rajesh@example.com" className="text-blue-600 hover:underline">ritsar14@gmail.com</a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">Sayam</span>
                <a href="mailto:teammate1@example.com" className="text-blue-600 hover:underline">ssayam200@gmail.com</a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">Abhinandan</span>
                <a href="mailto:teammate2@example.com" className="text-blue-600 hover:underline">Abhinad2132@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}