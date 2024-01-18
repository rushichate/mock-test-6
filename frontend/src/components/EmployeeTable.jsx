// EmployeeTable.jsx
import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  console.log(employees)
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>
              <button onClick={() => onEdit(employee)}>Edit</button>
              <button onClick={() => onDelete(employee._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
