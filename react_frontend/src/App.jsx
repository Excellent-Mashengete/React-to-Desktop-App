import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Nabar';
import Modal from './components/Modal';
import StatusContainer from './components/StatusContainer';
import { CiTrash } from "react-icons/ci";
import { BsPencilSquare } from "react-icons/bs";
import { formatDate } from './utils/formatDate';
import api from "./service/ApiClient";
import Search from './components/Search';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [getAllUsers, setGetAllUsers] = useState([{
    id: 1,
    fullName: "Brice Swyre",
    email: "brice.swyre@gmail.com",
    salary: 500,
    dateHired: "2003-10-10",
    isActive: 1,
  },
  {
    id: 2,
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    salary: 1700,
    dateHired: "2023-10-10",
    isActive: 0,
  }]
  );

  const filteredUsers = getAllUsers.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedUser(null);
    document.getElementById("my_modal_1").showModal();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    document.getElementById('my_modal_1').showModal();
  };

  return (
    <div className="App text-center container mx-auto px-4">
    
        <Modal
          user={selectedUser}
          onClose={() => {document.getElementById('my_modal_1').close()}}
          onSave={(data) => {
            if (data.id) {
              setGetAllUsers((prev) =>
                prev.map((u) => (u.id === data.id ? data : u))
              );
            }
          }}
        />

      <h1 className="">Employee Management System</h1>

      <div className="py-4">
        <div className='flex flex-col md:flex-row justify-between gap-4 py-4'>
          <Search 
            data={{ 
              placeholder: "Search", 
              color: "primary",
              searchQuery: searchQuery, 
              onSearchChange: (query) => setSearchQuery(query) 
            }} 
          />
          <button className="btn btn-outline btn-primary" onClick={handleAdd}>Add Employee</button>
        </div>

        <div className='mt-1'>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>DateHired</th>
                  <th>Active Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <th>{user.fullName}</th>
                    <td>{user.email}</td>
                    <td>{user.salary}</td>
                    <td>{formatDate(user.dateHired)}</td>
                    <td>
                      <StatusContainer data={{ status: user.isActive ? "inactive" :"Active", statusId: user.isActive }} />
                    </td>
                    <td>
                      <div className='flex gap-2 text-center justify-center'>
                        <BsPencilSquare onClick={() => handleEdit(user)} className='text-blue-600' style={{ fontSize: 30 }} />
                        <CiTrash className='text-red-600' style={{ fontSize: 30 }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
