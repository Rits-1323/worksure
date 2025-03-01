"use client"

import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ContractorSignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [skills, setSkills] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const role = 'contractors';
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        router.push('/dashboard/contractor');
        // setIsLoading(true);
        // setError('');
        
        // try {
        //     // Use the same API endpoint structure we saw before
        //     const response = await axios.post('/api/auth/register', {
        //         username:email,
        //         password:password,
        //         skills:skills,
        //         hourlyRate:hourlyRate,
        //         location:location,
        //         role:role
        //     });
            
        //     console.log("Registration successful:", response.data);
            
        //     if (response.data.token) {
        //         localStorage.setItem('token', response.data.token);
        //     }
            
        //     router.push('/dashboard/contractor');
        // } catch (error) {
        //     console.error('Registration failed:', error);
        //     if (axios.isAxiosError(error) && error.response) {
        //         setError(error.response.data.message || "Registration failed. Please try again.");
        //     } else {
        //         setError("Registration failed. Please try again.");
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex items-center text-blue-600 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Create a Contractor Account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Sign up to manage workers and jobs</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                            <div className="mt-1">
                                <input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    required
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="e.g. Electrical, Plumbing, Carpentry"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate (₹)</label>
                            <div className="mt-1">
                                <input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    required
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.value)}
                                    min="0"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <div className="mt-1">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g. Mumbai, Delhi"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link href="/login/contractor" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractorSignUp;