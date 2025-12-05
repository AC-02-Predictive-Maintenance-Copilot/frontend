import React, { useEffect } from "react";
import UserManagement from "@/components/UserManagement";
import HeaderText from "@/components/HeaderText";

function UserManagementPage({ useUsers }) {
  // Fetch users saat halaman dibuka
  useEffect(() => {
    useUsers.fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 w-full p-6">
      <div className="max-w-4xl mx-auto">
        <HeaderText
          title="User Management"
          subtitle="Manage engineer accounts and permissions"
        />
        <UserManagement
          users={useUsers.users}
          loading={useUsers.loading}
          error={useUsers.error}
          onVerifyUser={useUsers.handleVerifyUser}
          onUnverifyUser={useUsers.handleUnverifyUser}
          onDeleteUser={useUsers.handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default UserManagementPage;
