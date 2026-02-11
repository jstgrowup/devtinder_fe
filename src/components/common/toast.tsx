import { type AxiosError } from "axios";
import toast from "react-hot-toast";
export const openErrorToast = ({
  error,
  message,
}: {
  error?: Error | AxiosError<{ message: string }>;
  message?: string;
}) => {
  let updatedMessage = "";
  const axiosError = error as AxiosError<{ message: string }>;
  console.log("axiosError:", axiosError);

  if (axiosError?.response?.data?.message) {
    updatedMessage = axiosError?.response?.data?.message ?? "";
  } else {
    updatedMessage = message ?? "Something went wrong";
  }

  return toast.error(<p>{updatedMessage}</p>, {
    duration: 1000,
    position: "top-right",
  });
};

export const openSuccessToast = ({ message }: { message?: string }) => {
  return toast.success(<p>{message ?? "Success"}</p>, { duration: 3000 });
};
