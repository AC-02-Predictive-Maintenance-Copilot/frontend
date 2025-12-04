import React from "react";
import UserManagement from "@/components/UserManagement";
import HeaderText from "@/components/HeaderText";

function UserManagementPage({ useUsers }) {
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
          onVerifyUser={useUsers.handleVerifyUser}
          onUnverifyUser={useUsers.handleUnverifyUser}
          onDeleteUser={useUsers.handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default UserManagementPage;
