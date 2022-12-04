import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { GET_CATEGORIES } from "../../../graphql/queries/getCategories";
import { buildCategories } from "../../../utils/buildCategories";

export function EditDialog({ open, onClose }) {
  const { data } = useQuery(GET_CATEGORIES);
  const [category, setCategory] = useState("");

  const categories = data?.categories;
  const categoriesOpts = buildCategories(categories);
  const outputData = { categoryId: category };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a new category for your transaction.
        </DialogContentText>
        <TextField
          margin="dense"
          id="category"
          label="Category Name"
          variant="outlined"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          autoFocus
          fullWidth
          select
          SelectProps={{
            MenuProps: { style: { maxHeight: "30%" } },
          }}
        >
          {categoriesOpts.map((opt) => (
            <MenuItem aria-label="select categories" key={`c_${opt.value}_${opt.label}`} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button aria-label="cancel edit mode" onClick={(e) => onClose(e, "cancel")}>Cancel</Button>
        <Button aria-label="confirm edit changes"onClick={(e) => onClose(e, "submit", outputData)}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
