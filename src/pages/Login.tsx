import { dataLogin } from "../components/data/data";
import Errormsg from "../components/errors/Errormsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loinSchema } from "../components/validation/validate";
import axiosInstance from "../components/config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { axiosError } from "../components/interfaces/interfaces";
interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loinSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setloading(true);
    try {
      const { status, data: logedData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status === 200) {
        toast.success("Success login!", {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      localStorage.setItem("logged", JSON.stringify(logedData));
      setTimeout(() => {
        location.replace("/");
      }, 1600);
    } catch (error) {
      const erroObj = error as AxiosError<axiosError>;
      toast.error(`${erroObj.response?.data?.error?.message}`, {
        duration: 1500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setloading(false);
    }
  };

  //=== RENDERING LOGIN FORM ========== */
  const loginForm = dataLogin.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          placeholder={placeholder}
          type={type}
          {...register(name, validation)}
        />
        {errors[name] && <Errormsg msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {loginForm}
        <Button fullWidth loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
