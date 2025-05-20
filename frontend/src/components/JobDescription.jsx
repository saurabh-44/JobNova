import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Building2, MapPin, Calendar, BriefcaseIcon, Clock, DollarSign, Users } from 'lucide-react'

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8'>
                    {/* Header Section */}
                    <div className='flex flex-col md:flex-row justify-between gap-4 sm:gap-6'>
                        <div>
                            <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-sm sm:text-base text-gray-600'>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Building2 className="h-4 w-4" />
                                    <span>{singleJob?.company?.name || 'Company Name'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{singleJob?.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Posted {singleJob?.createdAt?.split("T")[0]}</span>
                                </div>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-3 sm:mt-4'>
                                <Badge variant="ghost" className='bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm'>
                                    {singleJob?.postion} Positions
                                </Badge>
                                <Badge variant="ghost" className='bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs sm:text-sm'>
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge variant="ghost" className='bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs sm:text-sm'>
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`h-fit w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-200 ${
                                isApplied 
                                ? 'bg-gray-100 text-gray-500' 
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                            }`}
                        >
                            {isApplied ? '✓ Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 border-t border-b border-gray-200 py-6 sm:py-8">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Job Type</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{singleJob?.jobType}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Experience</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{singleJob?.experience} years</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Salary</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{singleJob?.salary} LPA</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Total Applicants</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{singleJob?.applications?.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="mt-6 sm:mt-8">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Job Description</h2>
                        <div className="prose max-w-none text-sm sm:text-base text-gray-600">
                            <p className="whitespace-pre-line">{singleJob?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription