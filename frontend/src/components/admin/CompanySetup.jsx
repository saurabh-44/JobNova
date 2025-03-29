import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage, Info } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-10'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-200'>
                    {/* Header */}
                    <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                variant="ghost" 
                                className="hover:bg-gray-100 text-gray-600"
                                size="icon"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className='text-xl font-semibold text-gray-900'>Company Setup</h1>
                        </div>
                        {loading ? (
                            <Button disabled className="bg-blue-600">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Updating...
                            </Button>
                        ) : (
                            <Button 
                                onClick={submitHandler}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                Save Changes
                            </Button>
                        )}
                    </div>

                    <form onSubmit={submitHandler} className="p-6">
                        <div className='space-y-6'>
                            <div>
                                <Label className="flex items-center gap-2 text-gray-700 mb-3">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <Label className="flex items-center gap-2 text-gray-700 mb-3">
                                    <Info className="h-4 w-4 text-gray-500" />
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    placeholder="Brief description about your company"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="flex items-center gap-2 text-gray-700 mb-3">
                                        <Globe className="h-4 w-4 text-gray-500" />
                                        Website
                                    </Label>
                                    <Input
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div>
                                    <Label className="flex items-center gap-2 text-gray-700 mb-3">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        Location
                                    </Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="flex items-center gap-2 text-gray-700 mb-3">
                                    <FileImage className="h-4 w-4 text-gray-500" />
                                    Company Logo
                                </Label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto h-12 w-12 text-gray-400">
                                            <FileImage className="h-12 w-12" />
                                        </div>
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                <span>Upload a file</span>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={changeFileHandler}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup