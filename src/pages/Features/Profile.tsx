import { useState } from "react";
import { Avatar, Box, Grid, Paper, TextField } from "@mui/material";
import Button from "../../components/common-components/button";
import InputField from "../../components/formFields/InputField";
import { useForm } from "react-hook-form";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    // Handle form submission logic here
    console.log("Form submitted with data:", data);
  };
  return (
    <>
      <h1 style={{ textAlign: "left", marginBottom: 16 }}>Profile</h1>
      <Grid container spacing={2}>
        <Grid
          item
          size={{ xs: 12, md: 4 }}
          display={{ xs: "none", md: "block" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              style={{ flex: 1, padding: 16, textAlign: "center" }}
            >
              <Box>
                <div>
                  <Avatar
                    src="https://via.placeholder.com/150"
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mt={4} width="100%">
                      <InputField
                        label={"Old Password"}
                        type={"text"}
                        name={"oldPassword"}
                        register={register}
                        validation={{ required: true }}
                        error={!!errors.oldPassword}
                        errorMessage="Old password is required"
                      />
                      <InputField
                        label={"New Password"}
                        type={"password"}
                        name={"newPassword"}
                        register={register}
                        validation={{ required: true }}
                        error={!!errors.newPassword}
                        errorMessage="New password is required"
                      />
                      <InputField
                        label={"Confirm Password"}
                        type={"password"}
                        name={"confirmPassword"}
                        register={register}
                        validation={{
                          required: true,
                          validate: (value: string, formValues: any) =>
                            value === (formValues?.newPassword || "")
                              ? true
                              : "Passwords do not match",
                        }}
                        error={!!errors.confirmPassword}
                        errorMessage={
                          errors.confirmPassword?.message ||
                          "Confirm password is required"
                        }
                      />
                      <Button type="submit" label={"Change Password"} variant="contained" />
                    </Box>
                  </form>
                </div>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          size={{ xs: 12, md: 8 }}
          display={{ xs: "none", md: "block" }}
        >
          <Paper
            elevation={3}
            style={{ flex: 1, padding: 16, textAlign: "center" }}
          >
            <Box>
              <div>
                <Avatar
                  src="https://via.placeholder.com/150"
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
