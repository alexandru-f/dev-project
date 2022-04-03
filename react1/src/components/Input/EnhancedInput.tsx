import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import NumberFormat from 'react-number-format';

interface DropdownOptions {
  label: string,
  value: string | number
}

interface IInputProps {
  sxProps?: object,
  id: string,
  name: string,
  label: string,
  error?: string | null,
  value: any,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  dropdownItems?: Array<DropdownOptions>
  currencySymbol?: string;
  inputProps?: any;
}


const EnhancedInput:React.FC<IInputProps> = ({sxProps, id, error, name, label, value, onChange, dropdownItems, currencySymbol, inputProps}) => {
  
  switch(name) {
    case 'monthlyPrice':
      return (
        <NumberFormat
          thousandsGroupStyle="thousand"
          prefix={currencySymbol}
          decimalSeparator="."
          displayType="input"
          type="text"
          customInput={TextField}
          thousandSeparator={true}
          allowNegative={true}
          sx={sxProps}
          id={id}
          name={name}
          label={label}
          onChange={onChange}
          value={value}
          {...error && {error: true, helperText: error}}
        />
      );
    default: 
    return (
      <TextField
          sx={sxProps}
          id={id}
          select={dropdownItems ? true: false}
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          InputProps={inputProps ? inputProps : false}
        >
          {dropdownItems && dropdownItems.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    );
  }
}

EnhancedInput.defaultProps = {
  sxProps: {width: '100%'},
  error: null
};
export default EnhancedInput;