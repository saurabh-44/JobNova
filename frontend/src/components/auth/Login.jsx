import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, LogIn } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-12'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl'>
                    <div className="flex items-center justify-center mb-8">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <LogIn className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className='font-bold text-2xl text-gray-800 ml-3'>Welcome Back</h1>
                    </div>

                    <div className='space-y-5'>
                        <div>
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
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
                            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
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
                    </div>

                    <div className='space-y-4 mt-6'>
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
                
                                </Label>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition-all duration-200">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                            Signing in...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition-all duration-200">
                            Sign in
                        </Button>
                    )}

                    <p className='text-sm text-center mt-6 text-gray-600'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'>
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login