import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, X, Upload, User, Mail, Phone, FileText, Code } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col p-0">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 relative">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Update Profile
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-2 text-white hover:bg-white/20 rounded-full p-2 h-auto"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={submitHandler} className="flex-1 overflow-y-auto">
                    <div className="space-y-4 p-4">
                        {/* Form fields */}
                        <div className="space-y-4">
                            {/* Name field */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    Full Name
                                </Label>
                                <Input
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email field */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    Email
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="mt-2"
                                />
                            </div>

                            {/* Phone field */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    Phone Number
                                </Label>
                                <Input
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="mt-2"
                                />
                            </div>

                            {/* Bio field */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    Bio
                                </Label>
                                <Input
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="mt-2"
                                />
                            </div>

                            {/* Skills field */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <Code className="h-4 w-4 text-gray-500" />
                                    Skills
                                </Label>
                                <Input
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="mt-2"
                                    placeholder="Separate skills with commas"
                                />
                            </div>

                            {/* Resume upload */}
                            <div>
                                <Label className="flex items-center gap-2">
                                    <Upload className="h-4 w-4 text-gray-500" />
                                    Resume
                                </Label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Upload a file</span>
                                                <Input
                                                    name="file"
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={fileChangeHandler}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PDF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t mt-auto">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            {loading ? (
                                <Button disabled className="flex-1 bg-blue-600">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateProfileDialog