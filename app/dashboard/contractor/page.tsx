"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Plus, Star, Filter, ChevronDown, Home, Phone, Briefcase, Bell } from "lucide-react"
import axios from "axios"

export default function ContractorDashboard() {
  const [activeTab, setActiveTab] = useState("workers")
  const [showForm, setShowForm] = useState(false)
  // Added ratings state to track worker ratings
  const [ratings, setRatings] = useState({})
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [ratingValue, setRatingValue] = useState(0)
  const [ratingComment, setRatingComment] = useState("")
  
  const [showPortfolioForm, setShowPortfolioForm] = useState(false)

// Add this function to handle portfolio form submission
const handlePortfolioSubmit = (e) => {
  e.preventDefault()
  
  // Save to localStorage
  localStorage.setItem('contractorPortfolio', JSON.stringify(portfolioData))
  
  // Close the form
  setShowPortfolioForm(false)
}
const router = useRouter()

  // Added multiple workers
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
      bio: "Amit Patel",
      skills: "Carpentry, Painting",
      hourly_rate: 380,
      location: "Delhi",
      profile_picture: null
    },
    {
      id: 3,
      bio: "Priya Singh",
      skills: "Electrical, HVAC",
      hourly_rate: 400,
      location: "Bangalore",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] })
  }


  // Add this with your other state variables
const [portfolioData, setPortfolioData] = useState({
  firmName: "KC & Co.", // Default values for now
  specialization: "Construction",
  projectsCompleted: 12,
  location: "New Delhi",
  rating: 4.5
})

// Add this useEffect to load portfolio data on component mount
useEffect(() => {
  // Try to load portfolio data from localStorage
  const savedPortfolio = localStorage.getItem('contractorPortfolio')
  if (savedPortfolio) {
    setPortfolioData(JSON.parse(savedPortfolio))
  }
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()

  const portfolioData = {
    firmName: formData.name || "Your Company", // Changed from companyName to name
    specialization: formData.skill || "Construction", // Changed from specialization to skill
    projectsCompleted: 0,
    location: formData.location || "Not specified",
    rating: 0
  }
  localStorage.setItem('contractorPortfolio', JSON.stringify(portfolioData))
    
  try {
    const apiUrl = "/api/workers"
    console.log("Attempting to connect via proxy:", apiUrl)
    
    const requestData = {
      user: 1, // Hardcoded for now
      bio: formData.name,
      skills: formData.skill,
      hourly_rate: parseFloat(formData.hourlyRate) || formData.hourlyRate,
      location: formData.location,
      profile_picture: null // Handle file upload separately
    }
    
    console.log("Sending data:", requestData)
    
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    console.log("Worker added successfully:", response.data)
    setWorkers([...workers, response.data])
    setShowForm(false)
    setFormData({
      name: "",
      skill: "",
      hourlyRate: "",
      location: "",
      profilePicture: null,
    })
    
    // Router navigation should be outside the requestData object
    router.push('/dashboard/contractor')
  } catch (error) {
    console.error("Error submitting form:", error)
  }
}
  
  // New function to open rating modal
  const openRatingModal = (worker) => {
    setSelectedWorker(worker)
    setRatingValue(ratings[worker.id]?.value || 0)
    setRatingComment("")
    setShowRatingModal(true)
  }
  
  // Function to handle rating submission
  const handleRatingSubmit = (e) => {
    e.preventDefault()
    
    if (selectedWorker) {
      setRatings({
        ...ratings,
        [selectedWorker.id]: {
          value: ratingValue,
          comment: ratingComment,
          date: new Date().toLocaleDateString()
        }
      })
      setShowRatingModal(false)
      
      // Show success message (you could add a toast notification here)
      alert(`Rating for ${selectedWorker.bio} submitted successfully!`)
    }
  }
  
  // Function to render star ratings
  const renderStars = (workerId, editable = false) => {
    const currentRating = ratings[workerId]?.value || 0
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= currentRating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            } ${editable ? "cursor-pointer" : ""}`}
            onClick={() => editable && setRatingValue(star)}
          />
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
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <Home className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <button className="rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Bell className="h-6 w-6" />
        </button>
        <div className="relative ml-3">
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
                        
                        {/* Rating section */}
                        <div className="mt-3 border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Rating</span>
                            {ratings[worker.id] ? (
                              <div className="flex items-center">
                                {renderStars(worker.id)}
                                <span className="ml-1 text-sm font-medium">
                                  ({ratings[worker.id].value}/5)
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">Not rated</span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => openRatingModal(worker)}
                            className="mt-2 w-full text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center py-1"
                          >
                            <Star className="h-4 w-4 mr-1" />
                            {ratings[worker.id] ? "Update Rating" : "Rate Worker"}
                          </button>
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
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Contractor Portfolio</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your professional information and work history
          </p>
        </div>
        <button 
          onClick={() => setShowPortfolioForm(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Profile
        </button>
      </div>
      
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Firm name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{portfolioData.firmName}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Specialization</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{portfolioData.specialization}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{portfolioData.location}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Projects completed</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{portfolioData.projectsCompleted}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Rating</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= portfolioData.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : star === 5 && portfolioData.rating > 4 && portfolioData.rating < 5
                          ? "text-yellow-400 fill-yellow-400 opacity-50" 
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>{portfolioData.rating}/5</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    
    {/* Rest of your portfolio UI... */}
  </div>
            )}
          </div>
        </div>
      </main> 
      {/* Portfolio Edit Modal */}
{showPortfolioForm && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-xl transform transition-all max-w-lg w-full p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Edit Portfolio
      </h3>
      
      <form onSubmit={handlePortfolioSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="firmName" className="block text-sm font-medium text-gray-700">
              Firm Name
            </label>
            <input
              type="text"
              name="firmName"
              id="firmName"
              value={portfolioData.firmName}
              onChange={(e) => setPortfolioData({...portfolioData, firmName: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              value={portfolioData.specialization}
              onChange={(e) => setPortfolioData({...portfolioData, specialization: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={portfolioData.location}
              onChange={(e) => setPortfolioData({...portfolioData, location: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="projectsCompleted" className="block text-sm font-medium text-gray-700">
              Projects Completed
            </label>
            <input
              type="number"
              name="projectsCompleted"
              id="projectsCompleted"
              value={portfolioData.projectsCompleted}
              onChange={(e) => setPortfolioData({...portfolioData, projectsCompleted: Number(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowPortfolioForm(false)}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}     
      {showRatingModal && selectedWorker && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl transform transition-all max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Rate {selectedWorker.bio}
            </h3>
            
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars(selectedWorker.id, true)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({ratingValue}/5)
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (optional)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Share your experience working with this person..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}