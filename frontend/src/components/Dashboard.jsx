
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
      const response = await axios.get('http://localhost:8000/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleFormSubmit = async (e, formData) => {
    e.preventDefault();

    try {
      if (selectedEmployee) {
        await axios.put(`http://localhost:8000/employees/${selectedEmployee._id}`,formData);
      } else {
        await axios.post('http://localhost:8000/employees/add', formData);
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
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
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
