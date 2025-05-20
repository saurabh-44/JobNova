import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase, Search } from 'lucide-react';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
                {/* Header Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse Jobs</h1>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Find your dream job from our curated list of opportunities
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Filter Sidebar */}
                    <div className='w-full lg:w-72 shrink-0'>
                        <div className="sticky top-24">
                            <FilterCard />
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs