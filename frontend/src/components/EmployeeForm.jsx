// EmployeeForm.jsx
import React, { useState } from 'react';

const EmployeeForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, formData)}>
      <label>First Name:</label>
      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />

      <label>Last Name:</label>
      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Department:</label>
      <select name="department" value={formData.department} onChange={handleChange}>
        <option value="Tech">Tech</option>
        <option value="Marketing">Marketing</option>
        <option value="Operations">Operations</option>
      </select>

      <label>Salary:</label>
      <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
