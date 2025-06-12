import { Button  as MiUiBUtton} from "@mui/material";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
}
const Button = ({ label, type, variant, onClick }: ButtonProps) => {
  return (
    <MiUiBUtton  type={type} variant={variant} fullWidth onClick={onClick}>
      {label}
    </MiUiBUtton>
  );
};

export default Button;