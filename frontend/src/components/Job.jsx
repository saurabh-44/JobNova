import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Calendar } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='group p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 hover:border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-white">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <div>
                        <h1 className='font-semibold text-base sm:text-lg text-gray-900'>{job?.company?.name}</h1>
                        <div className='flex items-center gap-2 text-xs sm:text-sm text-gray-500'>
                            <MapPin className="h-3 w-3" />
                            <span>India</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" className="rounded-full p-2 hover:bg-gray-100 group-hover:bg-gray-50" size="icon">
                    <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-600" />
                </Button>
            </div>

            <div className='space-y-3'>
                <h1 className='font-bold text-base sm:text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 text-xs sm:text-sm py-2.5 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                    View Details
                </Button>
                <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm py-2.5 shadow-sm hover:shadow transition-all duration-300"
                >
                    Save Job
                </Button>
            </div>
        </div>
    )
}

export default Job