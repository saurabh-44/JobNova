import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Manage Companies</h1>
                                <p className="text-sm text-gray-500 mt-1">Create and manage your company profiles</p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all duration-200"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            New Company
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    placeholder="Search companies by name..."
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies