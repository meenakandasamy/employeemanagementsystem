import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: 0,
    newThisMonth: 0
  });

  useEffect(() => {
    // Load employees from localStorage
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(savedEmployees);
    
    // Calculate statistics
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const newThisMonth = savedEmployees.filter(emp => {
      const hireDate = new Date(emp.hireDate);
      return hireDate.getMonth() === thisMonth && hireDate.getFullYear() === thisYear;
    }).length;

    setStats({
      totalEmployees: savedEmployees.length,
      activeEmployees: savedEmployees.filter(emp => emp.status === 'Active').length,
      departments: [...new Set(savedEmployees.map(emp => emp.department))].length,
      newThisMonth: newThisMonth
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Employee Management System Overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <p className="stat-number">{stats.totalEmployees}</p>
            <p className="stat-description">All employees in the system</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Active Employees</h3>
            <p className="stat-number">{stats.activeEmployees}</p>
            <p className="stat-description">Currently active employees</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>Departments</h3>
            <p className="stat-number">{stats.departments}</p>
            <p className="stat-description">Different departments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🆕</div>
          <div className="stat-content">
            <h3>New This Month</h3>
            <p className="stat-number">{stats.newThisMonth}</p>
            <p className="stat-description">Employees hired this month</p>
          </div>
        </div>
      </div>

      <div className="recent-employees">
        <h2>Recent Employees</h2>
        <div className="employees-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Hire Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
