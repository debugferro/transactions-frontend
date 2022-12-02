import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export function SelectInput({ label, name, placeholder, opts, className, ...otherFieldProps }) {
  const defaultCss = { width: "20rem" };
  const inputLabelId = `${name}-inputlabel`;

  return (
    <FormControl
      css={className ? null : defaultCss}
      className={className}
      sx={{ m: 1, width: 1 }}
    >
      <InputLabel shrink id={inputLabelId}>
        {label}
      </InputLabel>
      <Select
        notched
        MenuProps={{ style: { maxHeight: "50%" } }}
        labelId={inputLabelId}
        label={label}
        {...otherFieldProps}
      >
        {placeholder && (
          <MenuItem selected value="" disabled>
            <span css={{ color: "var(--medium-gray)" }}>{placeholder}</span>
          </MenuItem>
        )}
        {opts.map((opt) => (
          <MenuItem key={`${opt.value}_${opt.label}`} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
