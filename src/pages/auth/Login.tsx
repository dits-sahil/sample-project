import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "../../components/common-components/button";
import InputField from "../../components/formFields/InputField";
import authService from "../../core/api/auth.service";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../../core/services/storage.service";
import "../../App.css";
import toast, { Toaster } from 'react-hot-toast';




const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const notify = () => toast('Here is your toast.');
  
  const onSubmit = async (data: any) => {
    try {
      const res = await authService.handleLogin(data);
      if (res) {
        notify()
        storageService.set("access_token", res.data.access_token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>

      <Box
        sx={{
          p: "10px",
          borderRadius: 1,
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          maxWidth:'400px',
          width:'100%',
          textAlign:'center'
        }}
      >
        <Toaster />
        <h1 style={{ margin: 0, marginBottom: "10px", color: "#1976d2" }}>
          Login
        </h1>

        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputFields">
              <InputField
                label="Email"
                name="email"
                register={register}
                type={"text"}
                validation={{
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email address not valid",
                  },
                }}
                error={!!errors.email}
                errorMessage={errors.email?.message ?? ""}
                variant="outlined"
              />
            </div>
            <div className="inputFields">
              <InputField
                label="Password"
                name="password"
                register={register}
                type={"password"}
                validation={{ required: true }}
                error={!!errors.password}
                errorMessage={"Password is required"}
                variant="outlined"
              />
            </div>
            <Button label={"Submit"} type={"submit"} variant={"contained"} />
          </form>

          <Link
            to="/register"
            className="text-white"
            style={{ marginTop: "1rem", display: "block" }}
          >
            Don't have an account? Register here
          </Link>
        </div>
      </Box>
    </>
  );
};

export default Login;
