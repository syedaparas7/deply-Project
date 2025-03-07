import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AuthContext from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import ProjectList from './components/Projects/ProjectList';
import AddProjects from './components/Projects/AddProjects';
import EditProject from './components/Projects/EditProject';
import List from './components/employee/List';
import Add from './components/employee/Add';
import Edit from './components/employee/Edit';
import View from './components/employee/View';
import Summary from './components/EmployeeDashboard/Summary';
import ViewProject from './components/Projects/ViewProject';
import EmployeeProjects from './components/EmployeeDashboard/EmployeeProjects';
import Setting from './components/EmployeeDashboard/Setting';
import AdminSetting from './components/dashboard/AdminSetting';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route 
            path="/admin-dashboard" 
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />} />
            <Route path="employees" element={<List />} />
            <Route path="add-employee" element={<Add/>} />
            <Route path="employee/edit/:id" element={<Edit />} />
            <Route path="employee/view/:id" element={<View />} />
            
            <Route path="projects" element={<ProjectList />} />
            <Route path="add-projects" element={<AddProjects />} />
            <Route path="project/:id" element={<EditProject />} />
            <Route path="project/viewproject/:id" element={<ViewProject />} />
            <Route path="settings" element={<AdminSetting />} />
          </Route>

          <Route 
            path="/employee-dashboard" 
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin","employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary/>} />
            <Route path="profile/:id" element={<View/>} />
            <Route path="project/:id" element={<ViewProject/>} />
            <Route path="project" element={<EmployeeProjects />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;