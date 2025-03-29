import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                    {/* Header */}
                    <div className='flex items-center gap-4 mb-8 pb-6 border-b'>
                        <div className='p-3 bg-blue-50 rounded-xl'>
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>Create Company Profile</h1>
                            <p className='text-gray-500 mt-1'>Set up your company's presence on our platform</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className='space-y-6'>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 block mb-1">
                                Company Name
                            </Label>
                            <p className="text-sm text-gray-500 mb-3">
                                Enter your company's official name as you'd like it to appear
                            </p>
                            <Input
                                type="text"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                placeholder="e.g. Acme Corporation"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-3 pt-6 mt-8 border-t'>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/admin/companies")}
                                className="flex items-center gap-2 hover:bg-gray-100"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <Button 
                                onClick={registerNewCompany}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 shadow-sm hover:shadow transition-all duration-200"
                            >
                                Create Company
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">Why create a company profile?</h3>
                        <p className="text-gray-600 text-sm">
                            A company profile helps you establish your brand presence and attract top talent. You can showcase your company culture and opportunities.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                        <p className="text-gray-600 text-sm">
                            After creating your company profile, you'll be able to post jobs, manage applications, and build your employer brand.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate