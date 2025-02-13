import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { editUser, getUser, createUser } from '../api';
import Loader from './Loader';
import useUserData from '../hooks/useUserData';
import { UserReponse } from '../interface';

interface ModalProps {
    onClose: () => void;
    userId?: any
    nameModal: string
}

const EditUserModal: React.FC<ModalProps> = ({ onClose, userId, nameModal }) => {
    const [formData, setFormData] = useState<UserReponse>({
        name: '',
        email: '',
        username: '',
        phoneNumber: '',
    });
    const [errResponse, setErrResponse] = useState<{ [key: string]: string }>({});

    const queryClient = new QueryClient()

    const {refetch } = useUserData()
    const { data: user, isSuccess} = useQuery({
        queryKey: ['getUser', userId],
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });
   
    useEffect(() => {
        if (isSuccess && user) {
            setFormData({
                name: user.name,
                email: user.email,
                username: user.username,
                phoneNumber: user.phoneNumber,
            });
        } 
    }, [isSuccess, user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrResponse({ ...errResponse, [e.target.name]: '' });
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';

        setErrResponse(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const { mutate: updateUser, isPending: loadingEdit } = useMutation({
        mutationFn: async (updatedUser: any) => await editUser(userId, updatedUser), 
        onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
            refetch()
        },
        onError: (err) => {
           console.log(err)
        }
    });


    const { mutate: addUser, isPending: loadingCreate } = useMutation({
        mutationFn: async (formUser: any) => await createUser(formUser), 
        onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
            refetch()
        },
        onError: (err) => {
           console.log(err)
        }
    });


    
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        if(nameModal === 'Edit'){
        updateUser(formData); 
        } else{
        addUser(formData)
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-2xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose
                }>
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-4">{nameModal} User</h2>
                <form className='w-full'>
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='Name' name="name" value={formData.name} onChange={handleChange} />
                    {errResponse.name && <p className="text-red-500 text-sm">{errResponse.name}</p>}
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='Email' name="email"
                        value={formData.email} onChange={handleChange} />
                        {errResponse.email && <p className="text-red-500 text-sm">{errResponse.email}</p>}
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='UserName' name="username"
                        value={formData.username}
                        onChange={handleChange} />
                        {errResponse.username && <p className="text-red-500 text-sm">{errResponse.username}</p>}
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='Phone Number' name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange} />
                        {errResponse.phoneNumber && <p className="text-red-500 text-sm">{errResponse.phoneNumber}</p>}
                    <div className='w-full my-4'>

                        <button className='bg-blue-500 text-sm text-white py-2 px-6 rounded-md flex gap-2 items-center' onClick={handleSubmit}>
                            <span>{nameModal}</span> { (nameModal === 'Edit' ? loadingEdit : loadingCreate )&& <Loader color={'text-white'} />}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal