import { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)',
                    backgroundSize: '24px 24px'
                }} />
            </div>

            <div className='relative text-center max-w-6xl mx-auto px-4'>
                <div 
                    className='flex flex-col items-center gap-3'
                    style={{
                        animation: 'fadeIn 1s ease-out'
                    }}
                >
                    <span className='inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium shadow-sm hover:shadow transition-all duration-300 transform hover:scale-105'>
                        <TrendingUp className="h-4 w-4" />
                        No. 1 Job Search Platform
                    </span>

                    <div 
                        className="space-y-6"
                        style={{
                            animation: 'slideUp 0.8s ease-out 0.2s both'
                        }}
                    >
                        <h1 className='text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent'>
                        Browse, Apply &<br/>Elevate Your Career!
                        </h1>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Connect with top employers and find the perfect job opportunity that matches your skills and aspirations.
                        </p>
                    </div>

                    <div 
                        className='relative w-full max-w-2xl mx-auto mt-4'
                        style={{
                            animation: 'slideUp 0.8s ease-out 0.4s both'
                        }}
                    >
                        <div className='flex items-center gap-2 bg-white shadow-2xl border border-gray-100 p-3 rounded-2xl backdrop-blur-xl'>
                            <Search className='h-6 w-6 text-gray-400 ml-4' />
                            <input
                                type="text"
                                placeholder='Search for job titles or keywords...'
                                onChange={(e) => setQuery(e.target.value)}
                                className='flex-1 outline-none border-none px-2 text-lg text-gray-800 placeholder:text-gray-400 bg-transparent'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-xl"
                            >
                                Search Jobs
                            </Button>
                        </div>
                    </div>

                    <div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-9 max-w-4xl mx-auto"
                        style={{
                            animation: 'slideUp 0.8s ease-out 0.6s both'
                        }}
                    >
                        {[
                            { icon: Briefcase, title: "10k+", text: "Active Jobs", color: "blue" },
                            { icon: Users, title: "8k+", text: "Companies", color: "indigo" },
                            { icon: TrendingUp, title: "15k+", text: "Job Seekers", color: "purple" }
                        ].map((stat, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className={`flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                        <stat.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                                    <p className="text-gray-600 font-medium">{stat.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default HeroSection