import { toast } from "react-toastify";
import theme from "@/config/theme";
import "react-toastify/dist/ReactToastify.css";

export default function Toast(message) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    progressStyle: { background: "#04323A" },
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      color: "#04323A",
    },
  });
}
