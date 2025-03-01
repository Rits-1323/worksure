"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Star, Filter, ChevronDown, Home, Phone, Briefcase } from "lucide-react"
import axios from "axios" // Import axios

export default function ContractorDashboard() {
  const [activeTab, setActiveTab] = useState("workers")
  const [showForm, setShowForm] = useState(false)
  // Added fake worker data instead of empty array
  const [workers, setWorkers] = useState([
    {
      id: 1,
      bio: "Rahul Sharma",
      skills: "Plumbing, Electrical",
      hourly_rate: 350,
      location: "Mumbai",
      profile_picture: null
    },
    {
      id: 2,
      bio: "Priya Singh",
      skills: "Carpentry, Painting",
      hourly_rate: 300,
      location: "Delhi",
      profile_picture: null
    },
    {
      id: 3,
      bio: "Amit Patel",
      skills: "Masonry, Tiling",
      hourly_rate: 325,
      location: "Ahmedabad",
      profile_picture: null
    },
    {
      id: 4,
      bio: "Neha Gupta",
      skills: "Interior Design, Painting",
      hourly_rate: 400,
      location: "Bangalore",
      profile_picture: null
    },
    {
      id: 5,
      bio: "Vijay Kumar",
      skills: "Electrical, HVAC",
      hourly_rate: 375,
      location: "Chennai",
      profile_picture: null
    },
    {
      id: 6,
      bio: "Meera Reddy",
      skills: "Flooring, Carpentry",
      hourly_rate: 325,
      location: "Hyderabad",
      profile_picture: null
    }
  ])
  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    hourlyRate: "",
    location: "",
    profilePicture: null,
  })

  useEffect(() => {
    // This effect would normally fetch workers from the API
    // We're now using fake data, so we can leave this empty or remove it
    // But we'll keep it commented for future reference
    /*
    const fetchWorkers = async () => {
      try {
        // Using axios instead of fetch
        const response = await axios.get("/api/workers/")
        setWorkers(response.data)
      } catch (error) {
        console.error("Error fetching workers:", error)
      }
    }
    
    fetchWorkers()
    */
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Create a new worker with the form data
      const newWorker = {
        id: workers.length + 1, // Simple ID for demo purposes
        bio: formData.name,
        skills: formData.skill,
        hourly_rate: parseFloat(formData.hourlyRate) || 0,
        location: formData.location,
        profile_picture: null
      }
      
      // Add to workers array (in a real app, this would be an API call)
      setWorkers([...workers, newWorker])
      setShowForm(false)
      setFormData({
        name: "",
        skill: "",
        hourlyRate: "",
        location: "",
        profilePicture: null,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(`Error: ${error.message}`)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                {/* WorkSure logo/link that takes us back to homepage */}
                <Link href="/" className="flex items-center text-blue-600 font-bold text-xl">
                  <Home className="h-5 w-5 mr-2" />
                  WorkSure
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {/* Profile section - could be expanded */}
              <div className="relative ml-3">
                <div className="text-sm text-gray-500">
                  Contractor Account
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
                Contractor Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">Manage your workers and jobs</p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => setShowForm(true)}
              >
                <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
                Add Worker
              </button>
            </div>
          </div>

          {/* Add Worker Form */}
          {showForm && (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    id="skill"
                    name="skill"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Skill"
                    value={formData.skill}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Hourly Rate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Worker
                </button>
              </div>
            </form>
          )}

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    className={`${
                      activeTab === "workers"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab("workers")}
                  >
                    Workers
                  </button>
                  <button
                    className={`${
                      activeTab === "portfolio"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab("portfolio")}
                  >
                    Portfolio
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="mt-8">
            {activeTab === "workers" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Your Workers</h3>
                  <div className="relative">
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search workers"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {workers.map((worker) => (
                    <div key={worker.id} className="bg-white shadow rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                          {worker.profile_picture ? (
                            <img
                              className="h-12 w-12 rounded-full"
                              src={worker.profile_picture}
                              alt={worker.bio}
                            />
                          ) : (
                            <span className="text-lg font-medium text-gray-500">
                              {worker.bio.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">{worker.bio}</h4>
                          <p className="text-sm text-gray-500">{worker.skills}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Hourly Rate</span>
                          <span className="font-medium text-gray-900">₹{worker.hourly_rate}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium text-gray-900">{worker.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Contractor Portfolio</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Your professional information and work history
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">ABC Constructions</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Years in Business</dt>
                        <dd className="mt-1 text-sm text-gray-900">5 years</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Specialization</dt>
                        <dd className="mt-1 text-sm text-gray-900">Residential Construction</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Rating</dt>
                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                          4.8/5 <Star className="h-4 w-4 text-yellow-400 ml-1" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}