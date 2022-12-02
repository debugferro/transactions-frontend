import { FormControl, TextField } from "@mui/material";

export function TextInput({ className, ...otherFieldProps }) {
  const defaultCss = { width: "50rem" };

  return (
    <div css={className ? null : defaultCss} className={className}>
      <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
        <TextField {...otherFieldProps} />
      </FormControl>
    </div>
  );
}
