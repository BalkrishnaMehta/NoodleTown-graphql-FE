import { toast } from "react-toastify";

const errorToasting = (error: Error) => {
  toast.error(error.message);
};

export default errorToasting;
