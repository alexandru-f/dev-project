import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface DropdownOptions {
  label: string,
  value: string | number
}

interface IInputProps {
  sx?: object,
  id: string,
  name: string,
  label: string,
  error?: string | null,
  value: any,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  dropdownItems?: Array<DropdownOptions>
}


const EnhancedInput:React.FC<IInputProps> = ({sx, id, error, name, label, value, onChange, dropdownItems}) => {
  return (
    <TextField
        sx={sx}
        id={id}
        select={dropdownItems ? true: false}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...error && {error: true, helperText: error}}
      >
        {dropdownItems && dropdownItems.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
  );

}

EnhancedInput.defaultProps = {
  sx: {width: '100%'},
  error: null
};

export default EnhancedInput;