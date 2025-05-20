import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const NavLinks = () => (
        <ul className='flex flex-col md:flex-row font-medium items-center gap-4 md:gap-8'>
            {user && user.role === 'recruiter' ? (
                <>
                    <li>
                        <Link to="/admin/companies" className="text-gray-700 hover:text-blue-600 relative group py-2 block">
                            Companies
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/jobs" className="text-gray-700 hover:text-blue-600 relative group py-2 block">
                            Jobs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/" className="text-gray-700 hover:text-blue-600 relative group py-2 block">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/jobs" className="text-gray-700 hover:text-blue-600 relative group py-2 block">
                            Jobs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/browse" className="text-gray-700 hover:text-blue-600 relative group py-2 block">
                            Browse
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                </>
            )}
        </ul>
    );

    return (
        <div className='bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 md:h-20 px-4'>
                <Link to="/" className='flex items-center space-x-2 group'>
                    <h1 className='text-2xl md:text-3xl font-bold'>
                        <span className='bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent'>
                            Job
                        </span>
                        <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                            Nova
                        </span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-10'>
                    <NavLinks />
                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="ghost" className="hover:text-blue-600 text-gray-700 font-medium px-6">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 shadow-md hover:shadow-lg transition-all duration-200">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="p-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer hover:shadow-md transition-all duration-200">
                                    <Avatar className="h-10 w-10 ring-2 ring-white">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-xl">
                                <div className='p-4'>
                                    <div className='flex items-start gap-3 p-2 rounded-lg bg-gray-50/50 mb-2'>
                                        <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500 line-clamp-2'>{user?.profile?.bio || 'No bio added'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='space-y-1'>
                                        {user && user.role === 'student' && (
                                            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 font-medium">
                                                <User2 className="mr-2 h-4 w-4" />
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        )}
                                        
                                        <Button 
                                            onClick={logoutHandler} 
                                            variant="ghost" 
                                            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50/50 font-medium"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-4">
                        <NavLinks />
                        {!user ? (
                            <div className='flex flex-col gap-2 pt-4 border-t border-gray-200'>
                                <Link to="/login" className="w-full">
                                    <Button variant="ghost" className="w-full justify-center hover:text-blue-600 text-gray-700 font-medium">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" className="w-full">
                                    <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200">
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='pt-4 border-t border-gray-200'>
                                <div className='flex items-center gap-3 p-2 rounded-lg bg-gray-50/50 mb-4'>
                                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500 line-clamp-2'>{user?.profile?.bio || 'No bio added'}</p>
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    {user && user.role === 'student' && (
                                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 font-medium">
                                            <User2 className="mr-2 h-4 w-4" />
                                            <Link to="/profile">View Profile</Link>
                                        </Button>
                                    )}
                                    <Button 
                                        onClick={logoutHandler} 
                                        variant="ghost" 
                                        className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50/50 font-medium"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar