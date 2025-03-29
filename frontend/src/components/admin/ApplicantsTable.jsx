import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Settings, FileText, Mail, Phone, Calendar, Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = [
    { label: "Accepted", icon: <Check className="h-4 w-4 text-green-500" /> },
    { label: "Rejected", icon: <X className="h-4 w-4 text-red-500" /> }
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-medium">Full Name</TableHead>
                            <TableHead className="font-medium">Contact Info</TableHead>
                            <TableHead className="font-medium">Resume</TableHead>
                            <TableHead className="font-medium">Applied Date</TableHead>
                            <TableHead className="text-right font-medium w-[100px]">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicants?.applications?.length > 0 ? (
                            applicants.applications.map((item) => (
                                <TableRow 
                                    key={item._id}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                {item?.applicant?.email}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                {item?.applicant?.phoneNumber}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.applicant?.profile?.resume ? (
                                            <a 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                <FileText className="h-4 w-4 mr-2" />
                                                View Resume
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Not available</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                            {new Date(item?.applicant.createdAt).toLocaleDateString('en-US', {
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
                                            <PopoverContent className="w-48 p-2" align="end">
                                                {shortlistingStatus.map((status, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => statusHandler(status.label, item?._id)}
                                                        className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                    >
                                                        {status.icon}
                                                        {status.label}
                                                    </button>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    No applications found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable