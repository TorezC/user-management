import React, { useState } from 'react'
import EditUserModal from './components/EditUserModal'

const App = () => {

  const [showEditModal, setShowEditModal] = useState(false)
  return (
    <div className='w-full h-screen text-4xl  p-10 bg-gray-50'>
      {/* Section 1 */}
      <h1 className='text-4xl text-blue-600 mb-10'>User Management Dashboard</h1>
      {/* Section 2 */}
      <div className='mb-10 grid grid-cols-3 '>
        <div className='rounded-xl bg-white p-3'>
          <div>
            <span className='flex items-center justify-between mb-5'>
              <p className='text-lg'>Users</p>
              <i className="fa fa-user text-sm"></i>
            </span>
            <p className='text-2xl text-blue-500'>20</p>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div>
        <span className='flex justify-between items-center'>
          <h5>Users</h5>
          <button className='bg-blue-500 rounded-md px-6 py-2 text-white text-sm' >Create User <i className="fa fa-user-plus text-sm"></i></button>
        </span>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">

            <table className="w-full text-sm text-left rtl:text-right bg-white text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="bg-white border-b hover:bg-blue-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {/* {{customer.first_name}} {{customer.last_name}} */}
                  </th>
                  <td className="px-6 py-4">
                    {/* {{customer.email}} */}
                  </td>
                  <td className="px-6 py-4">
                    {/* {{customer.phone_number}} */}
                  </td>
                  <td className="px-6 py-4">
                    {/* {{customer.phone_number}} */}
                  </td>
                  <td className="px-6 py-4 text-white">
                    <button className='bg-blue-500 rounded-md px-6 py-1 text-sm' onClick={()=> setShowEditModal(true)}>Edit</button> <button className='bg-red-500 rounded-md px-6 py-1 text-sm'>Delete</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
          <nav className='flex justify-end items-center'>
            <ul className="list-style-none mb-6 flex">
              <li>
                <button
                  className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface/50 transition duration-300 dark:text-neutral-400"
                >Previous</button>
              </li>
              <li>
                <button
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-info-800 focus:outline-none active:bg-neutral-100 active:text-info-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  dark:focus:text-info-500 dark:active:bg-neutral-700 dark:active:text-info-500"
                  
                >1</button>
              </li>
              <li aria-current="page">
                <button
                  className="relative block rounded bg-info-100 px-3 py-1.5 text-sm font-medium text-info-800 transition duration-300 focus:outline-none dark:bg-[#11242a] dark:text-info-500"
                  
                >2
                  <span
                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                  >(current)</span>
                </button>
              </li>
              <li>
                <button
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-info-800 focus:outline-none active:bg-neutral-100 active:text-info-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  dark:focus:text-info-500 dark:active:bg-neutral-700 dark:active:text-info-500"
                  
                >3</button>
              </li>
              <li>
                <button
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-info-800 focus:outline-none active:bg-neutral-100 active:text-info-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  dark:focus:text-info-500 dark:active:bg-neutral-700 dark:active:text-info-500"
                  
                >Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <EditUserModal isOpen={showEditModal} onClose={()=> setShowEditModal(false)} />
    </div>
  )
}

export default App