import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, Upload } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-12'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl'>
                    <div className="flex items-center justify-center mb-8">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <UserPlus className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className='font-bold text-2xl text-gray-800 ml-3'>Create Account</h1>
                    </div>

                    <div className='space-y-5'>
                        <div>
                            <Label htmlFor="fullname" className="text-gray-700">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="XXXXXXXXXX"
                                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-gray-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                            />
                        </div>

                        <div className='space-y-4'>
                            <Label className="text-gray-700 font-medium">Select your role</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div 
                                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                        input.role === 'student' 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <Input
                                        id="student"
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <Label htmlFor="student" className="cursor-pointer block text-center">
                                        <div className="font-medium">Student</div>
                                        <div className="text-sm text-gray-500">Looking for opportunities</div>
                                    </Label>
                                </div>
                                <div 
                                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                        input.role === 'recruiter' 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <Input
                                        id="recruiter"
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <Label htmlFor="recruiter" className="cursor-pointer block text-center">
                                        <div className="font-medium">Recruiter</div>
                                        <div className="text-sm text-gray-500">Hiring talent</div>
                                    </Label>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <Label htmlFor="file" className="text-gray-700 font-medium block mb-2">Profile Picture</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload profile picture</p>
                                        </div>
                                        <Input
                                            id="file"
                                            accept="image/*"
                                            type="file"
                                            onChange={changeFileHandler}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition-all duration-200">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                            Creating your account...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition-all duration-200">
                            Create Account
                        </Button>
                    )}

                    <p className='text-sm text-center mt-6 text-gray-600'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup