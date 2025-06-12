import { useForm } from "react-hook-form";
import InputField from "../formFields/InputField";
import Button from "../common-components/button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface UserProps {
  email: string | undefined;
  name: string | undefined;
  onSubmit: (data: FormData) => void;
  open?: boolean;
  handleModal: (open: boolean) => void;
}

interface UpdateUserFormData {
  email: string;
  name: string;
}

const UpdateUserDialog: React.FC<UserProps> = ({ email, name, onSubmit, open, handleModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormData>();

  const closeModal = () => {
    reset(); // Reset the form fields
    handleModal(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="dialog">
        <DialogTitle id="alert-dialog-title">
          Update User Information
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
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
                value={email} 
              />
            </div>
            <div className="inputFields">
              <InputField
                label="Name"
                name="name"
                register={register}
                type={"text"}
                validation={{ required: true }}
                error={!!errors.name}
                errorMessage={"Name is required"}
                variant="outlined"
                value={name}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button label="Cancel" onClick={() => closeModal()} variant="outlined" />
            <Button label={"Submit"} type={"submit"} variant={"contained"} />
          </DialogActions>


        



        </form>
      </div>
    </Dialog>
  );
};

export default UpdateUserDialog;
