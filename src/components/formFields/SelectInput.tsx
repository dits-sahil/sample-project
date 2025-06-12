import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

interface SelectFieldProps {
  name: string;
  label: string;
  options: any[];
  register: any;
  error: any;
  validation?: any;
  errorMessage: string;
}

const SelectInput = ({
  name,
  label,
  options,
  register,
  error,
  errorMessage,
  validation,
}: SelectFieldProps) => {
  return (
    <div className="inputFields" style={{ marginBottom: "20px" }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-select`}
          label={label}
          defaultValue=""
          {...register(name, validation)}
        >
          {options.map((items) => (
            <MenuItem value={items.value} key={items.value}>
              {items.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default SelectInput;
