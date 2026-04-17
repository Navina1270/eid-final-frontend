import { toast } from "sonner";

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    style: {
      background: "#1e293b",
      color: "#87FF9F",
      fontWeight: 600,
      fontSize: "1rem",
      border: "1px solid #87FF9F",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    style: {
      background: "#1e293b",
      color: "#FF3838",
      fontWeight: 600,
      fontSize: "1rem",
      border: "1px solid #FF3838",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};


export const showWarning = (message) => {
  toast.warning(message, {
    duration: 4000,
    style: {
      background: "#1e293b", 
      color: "#FACC15", 
      fontWeight: 600,
      fontSize: "1rem",
      border: "1px solid #FACC15", 
      borderRadius: "0.5rem",
      padding: "1.5rem",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
