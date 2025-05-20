import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Sparkles } from 'lucide-react';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
            <div className="text-center sm:text-left mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 mb-4">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Featured Opportunities</span>
                </div>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        Latest & Top
                    </span>{' '}
                    Job Openings
                </h1>
                <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl">
                    Discover the most exciting job opportunities from leading companies. Apply now and take the next step in your career.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {allJobs.length <= 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs available</h3>
                        <p className="text-gray-500">Check back later for new opportunities</p>
                    </div>
                ) : (
                    allJobs?.slice(0,6).map((job) => (
                        <LatestJobCards key={job._id} job={job}/>
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs