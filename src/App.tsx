import React, { useState } from 'react'
import EditUserModal from './components/EditUserModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUsers } from './api';
import Loader from './components/Loader';

const App = () => {
  const queryClient = useQueryClient();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const usersPerPage = 8;

  const { data: userData, isPending, isSuccess } = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await deleteUser(userId); // API call to delete user
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers']}); // Refresh user list
    },
  });
  const sortedUsers = isSuccess
    ? [...userData].sort((a, b) => {
      if (!sortColumn) return 0; 
      const valA = a[sortColumn].toLowerCase();
      const valB = b[sortColumn].toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    })
    : [];

  const totalUsers = isSuccess ? userData.length : 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

  // Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Previous Page
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handling sorting Alphabetically Ascending and Descending
  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Delete User
   const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId); 
    }
  };

  return (
    <div className='w-full h-screen text-4xl  p-10 bg-gray-50'>
      {/* Section 1 */}
      <h1 className='text-4xl text-blue-600 mb-10'>User Management Dashboard</h1>
      {/* Section 2 */}
      <div className='mb-10 grid grid-cols-1 lg:grid-cols-3 '>
        <div className='rounded-xl bg-white p-3'>
          <div>
            <span className='flex items-center justify-between mb-5'>
              <p className='text-lg'>Users</p>
              <i className="fa fa-user text-sm"></i>
            </span>
            <p className='text-2xl text-blue-500'>{totalUsers}</p>
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
                  <th scope="col" className="px-6 py-3" onClick={() => handleSort('name')}>
                    <div className='flex justify-between items-center'>

                      <span>
                        Name
                      </span>
                      <button className='text-blue-500 uppercase'>Sort {sortColumn === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</button>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3" onClick={() => handleSort('email')}>
                    <div className='flex justify-between items-center'>
                      <span>
                        Email
                      </span>
                      <button className='text-blue-500 uppercase'>Sort {sortColumn === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</button>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isPending ? <Loader /> :
                  currentUsers.map((user: any) => (
                    <tr
                      className="bg-white border-b hover:bg-blue-50 ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.id}
                      </th>
                      <td className="px-6 py-4">
                        {user.name}
                      </td>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {user.username}
                      </td>
                      <td className="px-6 py-4">
                        {user.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-white flex gap-2 items-center">
                        <button className='bg-blue-500 rounded-md px-6 py-1 text-sm' disabled={isPending} onClick={() =>{setSelectedUser(user.id); setShowEditModal(true)}}>Edit</button> <button className='bg-red-500 rounded-md px-6 py-1 text-sm' onClick={() => {handleDeleteUser(user.id)}}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
                {showEditModal && <EditUserModal  onClose={() => setShowEditModal(false)} userId={selectedUser} />}
          </div>
          {/* Pagination Controls */}
          <nav className='flex justify-end items-center'>
            <ul className="list-style-none mb-6 flex">
              <li>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`relative block rounded px-3 py-1.5 text-sm transition duration-300 ${currentPage === 1 ? 'pointer-events-none text-gray-400' : 'hover:bg-neutral-100'
                    }`}
                >Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative block rounded px-3 py-1.5 text-sm transition duration-300 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-neutral-100'
                      }`}
                  >{index + 1}</button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative block rounded px-3 py-1.5 text-sm transition duration-300 ${currentPage === totalPages ? 'pointer-events-none text-gray-400' : 'hover:bg-neutral-100'
                    }`}
                >Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default App