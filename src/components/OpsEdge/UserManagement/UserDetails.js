import BackButton from "@/components/Common/Form/BackButton";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import { useState } from "react";

import { createUser, updateUserStatus } from "@/services/authServices";
import { showError, showSuccess } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
import { useRouter } from "next/navigation";

const UserDetails = ({
  closeModal,
  isEdit = false,
  editUserData = null,
  updateUserList,
}) => {
  const [errorsUser, setErrorUser] = useState({});
  const [userDetails, setUserDetails] = useState(
    editUserData
      ? {
          firstName: editUserData["First Name"] || "",
          lastName: editUserData["Last Name"] || "",
          email: editUserData.email || "",
          role: editUserData.role || "",
          isActive:
            editUserData["is Active"] === "Active" ||
            editUserData["is Active"] === true,
          userId: localStorage.getItem("userId"),
          mobile: "1122112211",
          project: "Project1",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          isActive: true,
          userId: localStorage.getItem("userId"),
          mobile: "1122112211",
          project: "Project1",
        }
  );
  const router = useRouter();

  const handleUserDetails = async () => {
    const newErrors = {};
    let hasError = false;

    if (!userDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
      hasError = true;
    }

    if (!userDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      hasError = true;
    }

    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userDetails.email)
    ) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    if (!userDetails.role) {
      newErrors.role = "Role is required";
      hasError = true;
    }

    setErrorUser(newErrors);
    if (!hasError) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      setUserDetails({ ...userDetails, userId: userId });

      const createUserResponse = await createUser(token, userDetails);
      console.log("createUserResponse===>", createUserResponse);
      if (createUserResponse.statusCode == 200) {
        showSuccess(createUserResponse.message || "Something went wrong");
        closeModal();
        await updateUserList();
      } else if (
        createUserResponse.statusCode === 401 ||
        createUserResponse.statusCode === 403
      ) {
        showError(
          createUserResponse.message || "Invalid token or access denied"
        );
        clearAuthStorage(router);
      } else {
        showError(createUserResponse.message || "Something went wrong");
      }

      console.log("createUserResponse====>", createUserResponse);
      console.log(userDetails);
    }
  };

  const handleUserEdit = async () => {
    console.log("Edited Users Details", userDetails);
    const token = localStorage.getItem("token");
    const updateUserResponse = await updateUserStatus(token, userDetails);
    console.log(updateUserResponse);
    if (updateUserResponse.statusCode === 200) {
      showSuccess(updateUserResponse.message || "Something went wrong");
      await updateUserList();
      closeModal();
    } else if (
      updateUserResponse.statusCode === 401 ||
      updateUserResponse.statusCode === 403
    ) {
      showError(updateUserResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(updateUserResponse.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={userDetails.firstName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, firstName: e.target.value })
          }
          isEdit={isEdit}
          placeholder="Enter First Name"
          className="w-[250px]"
          error={errorsUser.firstName}
        />
        <TextInput
          value={userDetails.lastName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, lastName: e.target.value })
          }
          isEdit={isEdit}
          placeholder="Enter Last Name"
          className="w-[250px]"
          error={errorsUser.lastName}
        />
        <TextInput
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          isEdit={isEdit}
          placeholder="Enter email "
          className="w-[250px]"
          error={errorsUser.email}
        />
        <SelectInput
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          isEdit={isEdit}
          error={errorsUser.role}
          label="Select role"
          value={userDetails.role}
          onChange={(e) =>
            setUserDetails({ ...userDetails, role: e.target.value })
          }
          className="w-[250px]"
        />
        <CheckboxInput
          label={"Is Active"}
          checked={!!userDetails.isActive}
          onChange={(e) =>
            setUserDetails({ ...userDetails, isActive: e.target.checked })
          }
        />
      </div>

      <div className="flex justify-center mb-4 mt-4 gap-2">
        <BackButton onClick={closeModal} label="Back" />
        <NextButton
          onClick={isEdit ? handleUserEdit : handleUserDetails}
          label="Submit"
        />
      </div>
    </>
  );
};

export default UserDetails;
