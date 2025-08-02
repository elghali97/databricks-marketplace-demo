import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import Footer from '../components/layout/Footer';
import { useState } from 'react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex flex-col">
      <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 pt-24 md:pt-20 lg:ml-80 transition-all duration-300">
          <Outlet />
        </main>
      </div>
      <Footer withSidebar={true} />
    </div>
  );
};

export default AdminLayout;