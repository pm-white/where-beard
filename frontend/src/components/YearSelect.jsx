import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function YearSelect({ years, year, setYear }) {
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          multiple
          value={year}
          onChange={handleChange}
          input={<OutlinedInput label="Year" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {years.map((yr, i) => (
            <MenuItem key={i} value={yr}>
              <Checkbox checked={year.includes(yr)} />
              <ListItemText primary={yr} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
