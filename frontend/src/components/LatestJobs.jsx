import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left'>
                <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    Latest & Top
                </span>{' '}
                Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8'>
                {allJobs.length <= 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">No jobs available at the moment</p>
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