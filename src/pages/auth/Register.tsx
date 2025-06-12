import * as React from 'react';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "../../components/common-components/button";
import InputField from "../../components/formFields/InputField";
import authService from "../../core/api/auth.service";
import SelectInput from "../../components/formFields/SelectInput";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../App.css";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formInput: any) => {
    try {
        formInput.avatar = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
      const res = await authService.handleRegister(formInput);
      if (res) {
        console.log("res:", res);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const roles = [
    { value: 'admin', label: "Admin" },
    { value: 'user', label: "User" },
  ];
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
        <h1 style={{ margin: 0, marginBottom: "10px", color: "#1976d2" }}>
          Register
        </h1>

        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputFields">
              <InputField
                label="Name"
                name="name"
                register={register}
                type={"text"}
                validation={{ required: true }}
                error={!!errors.name}
                errorMessage={"Name field is required"}
                variant="outlined"
              />
            </div>
         
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
            <div className="inputFields">
              <InputField
                label="Contact"
                name="phoneNumber"
                register={register}
                type={"number"}
                validation={{
                  required: "Contact Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number should be at least 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number should be at most 12 digits",
                  },
                }}
                error={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message ?? ""}
              />
            </div>

            <div className="inputFields">
              <SelectInput
                options={roles}
                label="Role"
                name="role"
                register={register}
                validation={{ required: "Role must be selected" }}
                error={!!errors.role}
                errorMessage={errors.role?.message ?? "Role must be selected"}
              />{" "}
            </div>
            <Button label={"Submit"} type={"submit"} variant={"contained"} />
          </form>
           
              <Link to="/login" className="text-white" style={{ marginTop: '1rem', display: 'block' }}>
           <ArrowBackIcon /> Back to login
          </Link>
        
        </div>
      </Box>
    </>
  );
};

export default Register;
