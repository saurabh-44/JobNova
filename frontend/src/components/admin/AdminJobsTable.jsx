import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, Briefcase, Calendar, Settings } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    Posted Jobs
                </h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-medium">Company Name</TableHead>
                            <TableHead className="font-medium">Role</TableHead>
                            <TableHead className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Posted Date
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-medium w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs?.map((job) => (
                            <TableRow 
                                key={job._id}
                                className="hover:bg-gray-50/50 transition-colors"
                            >
                                <TableCell>
                                    <div className="font-medium text-gray-900">{job?.company?.name}</div>
                                </TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>
                                    <div className="text-gray-600">
                                        {new Date(job?.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent 
                                            className="w-40 p-2" 
                                            align="end"
                                        >
                                            <button
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                Edit Job
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Applicants
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filterJobs?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50/50 text-sm text-gray-500">
                Total Jobs: {filterJobs?.length || 0}
            </div>
        </div>
    )
}

export default AdminJobsTable