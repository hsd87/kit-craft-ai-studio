
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/Admin/AdminSidebar';
import { AdminHeader } from '@/components/Admin/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
