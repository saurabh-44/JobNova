import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Briefcase, Award } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Profile Card */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
                    {/* Header Section */}
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 h-32' />
                    
                    <div className='px-8 pb-8'>
                        <div className='flex justify-between items-start -mt-16'>
                            <div className='flex gap-6'>
                                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                                <div className='pt-16'>
                                    <h1 className='text-2xl font-bold text-gray-900'>{user?.fullname}</h1>
                                    <p className='text-gray-600 mt-1'>{user?.profile?.bio || 'No bio added'}</p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setOpen(true)} 
                                className="mt-16 bg-white hover:bg-gray-50 text-gray-700"
                                variant="outline"
                            >
                                <Pen className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        </div>

                        {/* Contact Info */}
                        <div className='grid md:grid-cols-2 gap-6 mt-8'>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <span>{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Contact className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <span>{user?.phoneNumber}</span>
                                </div>
                            </div>

                            {/* Resume Section */}
                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-blue-50 rounded-lg'>
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <Label className="font-medium text-gray-900">Resume</Label>
                                    {user?.profile?.resume ? (
                                        <a 
                                            target='blank' 
                                            href={user.profile.resume}
                                            className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mt-1'
                                        >
                                            View Resume
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className="text-gray-500 mt-1 block">No resume uploaded</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className='mt-8'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-blue-50 rounded-lg'>
                                    <Award className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className='text-lg font-semibold text-gray-900'>Skills</h2>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills.length ? (
                                    user.profile.skills.map((skill, index) => (
                                        <Badge 
                                            key={index}
                                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-500">No skills added yet</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='p-2 bg-blue-50 rounded-lg'>
                            <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className='text-lg font-semibold text-gray-900'>Applied Jobs</h2>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile