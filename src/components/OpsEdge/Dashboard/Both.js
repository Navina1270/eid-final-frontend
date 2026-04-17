//Both user and admin request body for OpsEdge Dashboard
const loginRequest = {
    "email": "john@example.com", 
    "password": "yourpassword"
}

const loginResponse = {
  statusCode: "STATUSCODE",
  token: "abc123xyz",
  firstName: "Adarsh",
  lastName: "Shet",
  emailId: "adarsh.shet@example.com",
  mobile: "1234567890",
  role: "admin",
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
  projects: ["Project 1", "Project 2"],
};


////////////////////////////////////////////

const forgotPasswordRequest = {
    "email":"john@email.com"
}

const forgotPasswordResponse = {
  statusCode: "STATUSCODE",
  message: "Password reset link sent to your registered email.",
};


/////////////////////////////////////


const otpResetRequest = {
    "email":"john@email.com", 
    "code":"077344",
    "newPassword":"password@123"
}

const otpResetResponse = {
  statusCode: "STATUSCODE",
  message: "Password reset successfully.",
};

/////////////////////////////////////

const getUserDetailsRequest = {
    "userId":"c1931d9a-1031-70fb-715d-28a939b15e10"
}

const getUserDetailsResponse = {
  statusCode: "STATUSCODE",
  message: "User details fetched successfully.",
  data: {
    firstName: "Adarsh",
    lastName: "Shet",
    email: "adarsh.shet@example.com",
    role: "admin",
    userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
    project: "Project1",
  },
};

/////////////////////////////////////

const updatePasswordRequest = {
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
  oldPassword: "oldpassword@123",
  newPassword: "newpassword@123",
};

const updatePasswordResponse = {
  statusCode: "STATUSCODE",
  message: "Password updated successfully.",
};

/////////////////////////////////////




