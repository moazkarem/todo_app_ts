import { registerData } from "../components/data/data";
import Errormsg from "../components/errors/Errormsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../components/validation/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../components/config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { axiosError } from "../components/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("Success registeration!", {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(()=>navigate('/login'),1600)
      }
    } catch (error) {
      const errorObj = error as AxiosError<axiosError>;

      toast.error(`${errorObj.response?.data.error.message}`, {
        duration:1500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
     
    } finally {
      setLoading(false);
    }
  };

  /========== RENDER===========/;
  const RenderInputs = registerData.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <Errormsg msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {RenderInputs}
        <Button fullWidth loading={loading}>
          {" "}
          Register{" "}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
