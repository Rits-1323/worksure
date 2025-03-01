"use client"
 
import React, { useState } from "react"
import Link from "next/link"
import { Search, Plus, Star, Filter, ChevronDown, Bell, X, Calendar, DollarSign, Clock } from "lucide-react"

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("contractors")
  const [showNegotiateModal, setShowNegotiateModal] = useState(false)
  const [selectedContractor, setSelectedContractor] = useState(null)
  const [offerDetails, setOfferDetails] = useState({
    duration: "",
    hourlyRate: "",
    startDate: ""
  })
  const [offerMade, setOfferMade] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for your existing contractors
  const contractors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      specialty: "Construction",
      rating: 4.8,
      projects: 24,
      workers: 15,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Amit Singh",
      specialty: "Electrical",
      rating: 4.5,
      projects: 18,
      workers: 8,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Priya Patel",
      specialty: "Plumbing",
      rating: 4.9,
      projects: 32,
      workers: 12,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Vikram Mehta",
      specialty: "Carpentry",
      rating: 4.7,
      projects: 21,
      workers: 9,
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Mock data for new available contractors
  const newContractors = [
    {
      id: 101,
      name: "Ananya Sharma",
      specialty: "Interior Design",
      skills: ["Space planning", "3D modeling", "Color theory"],
      rating: 4.9,
      hourlyRate: 600,
      experience: "8 years",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 102,
      name: "Rahul Kapoor",
      specialty: "HVAC",
      skills: ["Installation", "Maintenance", "Repair"],
      rating: 4.7,
      hourlyRate: 300,
      experience: "6 years",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 103,
      name: "Meera Joshi",
      specialty: "Landscaping",
      skills: ["Garden design", "Irrigation", "Sustainable planting"],
      rating: 4.8,
      hourlyRate: 250,
      experience: "7 years",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 104,
      name: "Arjun Malhotra",
      specialty: "Roofing",
      skills: ["Installation", "Repairs", "Waterproofing"],
      rating: 4.6,
      hourlyRate: 400,
      experience: "5 years",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 105,
      name: "Divya Gupta",
      specialty: "Painting",
      skills: ["Interior", "Exterior", "Decorative finishes"],
      rating: 4.8,
      hourlyRate: 400,
      experience: "9 years",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 106,
      name: "Sanjay Verma",
      specialty: "Masonry",
      skills: ["Bricklaying", "Stonework", "Concrete"],
      rating: 4.5,
      hourlyRate: 500,
      experience: "12 years",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Office Renovation",
      status: "In Progress",
      contractors: 3,
      workers: 12,
      startDate: "15 Jan 2023",
      endDate: "30 Mar 2023",
      completion: 65,
    },
    {
      id: 2,
      name: "Residential Building",
      status: "Completed",
      contractors: 5,
      workers: 25,
      startDate: "10 Oct 2022",
      endDate: "20 Dec 2022",
      completion: 100,
    },
    {
      id: 3,
      name: "Shopping Mall Maintenance",
      status: "Planned",
      contractors: 2,
      workers: 8,
      startDate: "05 Apr 2023",
      endDate: "15 May 2023",
      completion: 0,
    },
  ]

  // Function to handle negotiate button click
  const handleNegotiate = (contractor) => {
    setSelectedContractor(contractor)
    setShowNegotiateModal(true)
    setOfferMade(false)
  }

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOfferDetails({
      ...offerDetails,
      [name]: value
    })
  }

  // Function to handle offer submission
  const handleSubmitOffer = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setOfferMade(true)
      setIsSubmitting(false)
    }, 1000)
  }

  // Function to close modal
  const closeModal = () => {
    setShowNegotiateModal(false)
    setSelectedContractor(null)
    setOfferDetails({
      duration: "",
      hourlyRate: "",
      startDate: ""
    })
    setOfferMade(false)
  }

  // Render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && <Star className="h-4 w-4 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                <h1 className="text-xl font-bold text-gray-900">WorkSure</h1>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative ml-3">
                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Ravi Sharma</div>
                      <div className="text-xs text-gray-500">Employer</div>
                    </div>
                  </div>
                  <button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/placeholder.svg?height=32&width=32"
                      alt="User profile"
                    />
                  </button>
                  <div className="hidden md:block">
                    <button className="inline-flex items-center gap-1 text-sm text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Dashboard header */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Employer Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">Manage your contractors and projects</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab("contractors")}
                      className={`${
                        activeTab === "contractors"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                    >
                      Contractors
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`${
                        activeTab === "projects"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                    >
                      Projects
                    </button>
                  </nav>
                </div>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="mt-8">
            {activeTab === "contractors" ? (
              <div>
                {/* Your existing contractors section */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Your Contractors</h3>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {contractors.map((contractor) => (
                    <div
                      key={contractor.id}
                      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={contractor.image || "/placeholder.svg"} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-medium text-gray-900">{contractor.name}</p>
                          <p className="text-sm text-gray-500 truncate">{contractor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="ml-1 text-sm text-gray-600">{contractor.rating}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{contractor.projects} projects</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{contractor.workers} workers</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New available contractors section */}
                <div className="mt-12">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Available Contractors</h3>
                    <div className="flex space-x-2">
                      <select className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500">
                        <option>All Specialties</option>
                        <option>Interior Design</option>
                        <option>HVAC</option>
                        <option>Landscaping</option>
                        <option>Roofing</option>
                        <option>Painting</option>
                        <option>Masonry</option>
                      </select>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Contractor
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Specialty
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Skills
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Rating
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Rate (INR/hr)
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Experience
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Negotiate</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {newContractors.map((contractor) => (
                          <tr key={contractor.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={contractor.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{contractor.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ₹{contractor.hourlyRate}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                              <div className="flex flex-wrap gap-1">
                                {contractor.skills.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                {renderStars(contractor.rating)}
                                <span className="ml-1">{contractor.rating}</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${contractor.hourlyRate}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {contractor.experience}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => handleNegotiate(contractor)}
                                className="text-blue-600 hover:text-blue-900 font-medium"
                              >
                                Negotiate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Your Projects</h3>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                </div>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Project Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Contractors
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Timeline
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Completion
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {project.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                project.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : project.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {project.contractors} contractors, {project.workers} workers
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {project.startDate} - {project.endDate}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${project.completion}%` }}
                                ></div>
                              </div>
                              <span className="ml-2">{project.completion}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Negotiate Modal */}
      {showNegotiateModal && selectedContractor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl transform transition-all max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {offerMade ? "Offer Submitted" : `Negotiate with ${selectedContractor.name}`}
                </h3>
                {!offerMade && (
                  <p className="text-sm text-gray-500 mt-1">
                  Current rate: ₹{selectedContractor.hourlyRate}/hour
                </p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {offerMade ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your offer has been made!</h3>
                <p className="text-sm text-gray-500 mb-6">
                  We've sent your offer to {selectedContractor.name}. You'll be notified when they respond.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Duration:</div>
                    <div className="font-medium">{offerDetails.duration} days</div>
                    <div className="text-gray-500">Hourly Rate:</div>
                    <div className="font-medium">₹{offerDetails.hourlyRate}</div>
                    <div className="text-gray-500">Start Date:</div>
                    <div className="font-medium">{offerDetails.startDate}</div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOffer}>
                <div className="mb-4">
                <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-gray-400 mr-1" />
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                 Hourly Rate (INR)
                </label>
                </div>
                <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                value={offerDetails.hourlyRate}
                onChange={handleInputChange}
                required
                min="1"
                placeholder={`Suggested: ₹${selectedContractor.hourlyRate}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-400 mr-1" />
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration (days)
                    </label>
                  </div>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={offerDetails.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="e.g. 30"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={offerDetails.startDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
  <button 
    type="button" 
    onClick={closeModal} 
    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Cancel
  </button>
  <button
    type="submit"
    disabled={isSubmitting}
    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
    }`}
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
</div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}         