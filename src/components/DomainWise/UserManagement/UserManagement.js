"use client";
import NextButton from "@/components/Common/Form/NextButton";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { showError } from "@/utils/toastUtils";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import { userList } from "@/services/authServices";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { clearAuthStorage } from "@/utils/authUtils";
import { useRouter } from "next/navigation";

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [showAddUserModal, setshowAddUserModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserEdit, setIsUserEdit] = useState(false);

  const router = useRouter();
  // console.log("usersListResponse============>");

  const handleEditUser = (userData) => {
    console.log("Selected User=====>>>>", userData);
    setIsUserEdit(true);
    setSelectedUser(userData); // store the user data to pass to UserDetails
    setshowAddUserModal(true); // open modal
  };
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const usersListResponse = await userList(token, userId);
    // console.log("usersListResponse============>", usersListResponse);
    if (usersListResponse?.statusCode == 200) {
      setListUser(
        usersListResponse?.data.map((user) => ({
          ...user,
          edit: <PencilSquareIcon className="h-5 w-5" />,
          ["is Active"]: user["is Active"] ? "Active" : "Inactive",
        }))
      );
      setLoading(false);
    } else if (
      usersListResponse.statusCode === 401 ||
      usersListResponse.statusCode === 403
    ) {
      showError(usersListResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      setLoading(false);
      showError(usersListResponse.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <RippleLoader />}
      <div className="px-8 py-2 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
            User Management
          </h2>
          <NextButton
            onClick={() => {
              setIsUserEdit(false);
              setSelectedUser(null);
              setshowAddUserModal(true);
            }}
            label="Add User"
          />
        </div>
        <Table
          onEdit={handleEditUser}
          tableData={listUser}
          labels={[
            "First Name",
            "Last Name",
            "email",
            "role",
            "is Active",
            "edit",
          ]}
        />
      </div>

      {/* "email": "john.smith3@tridiagonal.ai",
      "firstName": "john",
      "isActive": false,
      "lastName": "smith",
      "role": "admin" */}

      {showAddUserModal && (
        <ModalComponent
          heading="User Details"
          modalData={
            <UserDetails
              updateUserList={fetchData}
              closeModal={() => setshowAddUserModal(false)}
              isEdit={isUserEdit}
              editUserData={selectedUser}
            />
          }
          onClose={() => setshowAddUserModal(false)}
        />
      )}
    </>
  );
};

export default UserManagement;
