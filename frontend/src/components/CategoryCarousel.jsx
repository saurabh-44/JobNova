import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code2, Database, LineChart, Palette, Layers } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code2, color: "blue" },
    { name: "Backend Developer", icon: Database, color: "purple" },
    { name: "Data Science", icon: LineChart, color: "green" },
    { name: "Graphic Designer", icon: Palette, color: "pink" },
    { name: "FullStack Developer", icon: Layers, color: "orange" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Popular Categories
                    </span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Explore job opportunities in various fields and find the perfect match for your skills
                </p>
            </div>

            <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <Button 
                                onClick={() => searchJobHandler(cat.name)} 
                                variant="outline" 
                                className="w-full h-full min-h-[120px] flex flex-col items-center justify-center gap-3 rounded-xl text-xs sm:text-sm py-4 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 group"
                            >
                                <div className={`p-3 rounded-lg bg-${cat.color}-50 group-hover:bg-${cat.color}-100 transition-colors`}>
                                    <cat.icon className={`h-6 w-6 text-${cat.color}-600`} />
                                </div>
                                <span className="font-medium">{cat.name}</span>
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex items-center justify-center gap-2 mt-6">
                    <CarouselPrevious className="static translate-y-0 h-8 w-8 sm:h-10 sm:w-10 border-gray-200 hover:border-gray-300 hover:bg-gray-50" />
                    <CarouselNext className="static translate-y-0 h-8 w-8 sm:h-10 sm:w-10 border-gray-200 hover:border-gray-300 hover:bg-gray-50" />
                </div>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel