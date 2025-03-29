import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, Building2, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate("/admin/jobs")}
                                className="mr-2 hover:bg-gray-100 text-gray-600"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Job Applicants</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Total Applications: <span className="font-medium text-gray-900">{applicants?.applications?.length || 0}</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <Building2 className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{applicants?.title}</p>
                                <p className="text-sm text-gray-500">{applicants?.company?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants