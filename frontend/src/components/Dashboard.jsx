
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://employeeapp-4l4j.onrender.com/employees/', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
  };

  const handleFormSubmit = async (e, formData) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
        if (selectedEmployee) {
          await axios.put(`https://employeeapp-4l4j.onrender.com/employees/${selectedEmployee._id}`, formData, {
            headers,
          });
        } else {
          await axios.post('https://employeeapp-4l4j.onrender.com/employees/add', formData, {
            headers,
          });
        }

      setModalVisible(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      await axios.delete(`https://employeeapp-4l4j.onrender.com/employees/${id}`,{
        headers,
      });
      alert("Employee Deleted")
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleLogout =() =>{
     localStorage.removeItem('token')
     navigate('/')
  }

  return (
    <div>
      <button onClick={() => setModalVisible(true)}>Add Employee</button>
      <button onClick={handleLogout}>LogOut</button>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      {modalVisible && (
        <div>
          <EmployeeForm
            onSubmit={handleFormSubmit}
            onCancel={handleModalCancel}
            initialData={selectedEmployee || { first_name: '', last_name: '', email: '', department: 'Tech', salary: '' }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
