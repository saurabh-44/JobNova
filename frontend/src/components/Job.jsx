import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
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
        <div className='p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="ghost" className="rounded-full p-2 hover:bg-gray-100" size="icon">
                    <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-3'>
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-medium text-base sm:text-lg'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-base sm:text-lg my-2 line-clamp-1'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-3'>
                <Badge className='text-blue-700 font-medium text-xs sm:text-sm' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-medium text-xs sm:text-sm' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-medium text-xs sm:text-sm' variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 text-xs sm:text-sm py-2"
                >
                    Details
                </Button>
                <Button 
                    className="flex-1 bg-[#7209b7] text-xs sm:text-sm py-2"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job