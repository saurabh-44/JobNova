import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Building2, Briefcase } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
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
                            <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>Post a New Job</h1>
                            <p className='text-gray-500 mt-1'>Create a job listing to find the perfect candidate</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-2 gap-6'>
                            {Object.entries(input).map(([key, value]) => (
                                key !== 'companyId' && (
                                    <div key={key} className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Label>
                                        <Input
                                            type={key === 'position' ? 'number' : 'text'}
                                            name={key}
                                            value={value}
                                            onChange={changeEventHandler}
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            placeholder={`Enter job ${key}`}
                                        />
                                    </div>
                                )
                            ))}
                            
                            {companies.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full p-3 rounded-lg border border-gray-200">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <Button disabled className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2.5 rounded-lg shadow-sm">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 rounded-lg shadow-sm transition-all duration-200">
                                Post New Job
                            </Button>
                        )}

                        {companies.length === 0 && (
                            <p className='text-sm text-red-600 font-medium text-center bg-red-50 p-3 rounded-lg'>
                                Please register a company first before posting jobs
                            </p>
                        )}
                    </form>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">Tips for a great job post</h3>
                        <p className="text-gray-600 text-sm">
                            Be specific about requirements, responsibilities, and what makes your company unique. Clear job posts attract better candidates.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                        <p className="text-gray-600 text-sm">
                            After posting, your job will be visible to candidates. You can manage applications and update the posting from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostJob