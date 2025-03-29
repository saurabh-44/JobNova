import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Calendar, Settings } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    Your Companies
                </h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="w-[100px] font-medium">Logo</TableHead>
                            <TableHead className="font-medium">Company Name</TableHead>
                            <TableHead className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Registration Date
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-medium w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterCompany?.map((company) => (
                            <TableRow 
                                key={company._id}
                                className="hover:bg-gray-50/50 transition-colors"
                            >
                                <TableCell>
                                    <div className="relative">
                                        <Avatar className="h-10 w-10 border border-gray-200">
                                            <AvatarImage src={company.logo} />
                                        </Avatar>   
                                        {!company.logo && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                                                <Building2 className="h-5 w-5 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-gray-900">{company.name}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-gray-600">
                                        {new Date(company.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent 
                                            className="w-40 p-2" 
                                            align="end"
                                        >
                                            <button
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                Edit Company
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filterCompany?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No companies found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50/50 text-sm text-gray-500">
                Total Companies: {filterCompany?.length || 0}
            </div>
        </div>
    )
}

export default CompaniesTable