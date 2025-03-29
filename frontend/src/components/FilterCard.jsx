import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, IndianRupee } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: <MapPin className="h-4 w-4" />,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: <Briefcase className="h-4 w-4" />,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        icon: <IndianRupee className="h-4 w-4" />,
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <h1 className='font-semibold text-lg text-white flex items-center gap-2'>
                    <Briefcase className="h-5 w-5" />
                    Filter Jobs
                </h1>
            </div>

            <div className="p-4">
                <RadioGroup 
                    value={selectedValue} 
                    onValueChange={changeHandler}
                    className="space-y-6"
                >
                    {filterData.map((data, index) => (
                        <div key={index} className="space-y-3">
                            <h2 className='font-medium text-gray-900 flex items-center gap-2'>
                                {data.icon}
                                {data.filterType}
                            </h2>
                            <div className="grid gap-2 pl-2">
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className="flex items-center space-x-2">
                                            <div className="relative group">
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId}
                                                    className="peer"
                                                />
                                                <div className="absolute -inset-2 rounded-full bg-blue-50 opacity-0 peer-hover:opacity-100 transition-opacity -z-10" />
                                            </div>
                                            <Label 
                                                htmlFor={itemId}
                                                className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                            {index < filterData.length - 1 && (
                                <div className="border-b border-gray-100" />
                            )}
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard