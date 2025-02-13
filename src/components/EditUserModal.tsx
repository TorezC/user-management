import { AnyAaaaRecord } from 'dns';
import React, { useEffect, useState } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: AnyAaaaRecord
  }

const EditUserModal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
    if(!isOpen) return null;
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')

    // useEffect(()=> {
    //     if(id){

    //     }
    // }, [])
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-2xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                <form className='w-full'>
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='Name' />
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='Email' />
                    <input type="text" className='border p-1 text-lg w-full rounded-md mb-2' placeholder='UserName' />
                    <div className='text-right w-full mb-2'>

                    <button className='bg-blue-500 text-sm text-white py-2 px-6 rounded-md '>Edit</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditUserModal