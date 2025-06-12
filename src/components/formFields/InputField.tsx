import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  type?: string;
  register: any;
  name: string;
  validation?: any;
  error?: boolean;
  errorMessage?: string;
  variant?: string;
  value?: string;
}

const InputField = ({
  label,
  type = "text",
  register,
  name,
  error,
  errorMessage,
  variant,
  validation,
  value = "",
}: InputFieldProps) => {
  return (
    <div className="inputFields" style={{ marginBottom: '20px' }}>
      <TextField
      label={label}
      variant={variant}
      type={type}
      defaultValue={value}
      {...register(name, validation)}
      error={error}
      helperText={error ? errorMessage : ''}
      fullWidth
      />
    </div>
  );
};

export default InputField;
