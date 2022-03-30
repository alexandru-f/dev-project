import { useState, useCallback, useEffect } from "react";
import debounce from 'lodash.debounce';
import {CDN_PATH} from '../../../app/constants';
import TextField from '@mui/material/TextField';
import { Autocomplete, Grid, Typography, Tooltip } from "@mui/material";
import Modal from '../../../components/Modal/Modal';
import Box from '@mui/material/Box';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {IFormState, IModalContentProps, IValidationObject, ObjectLiteral} from '../../../interface/IModalContent';
import EnhancedInput from "../../../components/Input/Input";
import {initialFormValues, initialErrorValues, currencies, licensesStatus, validatePrice} from '../Helper';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useGetAllNamesQuery } from "../../../features/subscriptionNamesApi";
import { useAddSubscriptionMutation } from "../../../features/subscriptionApi";

const ModalContent:React.FC<IModalContentProps> = ({open, handleClose, classes}) => {

  const [query, setQuery] = useState<string>("");
  const [formValues, setFormValues] = useState<IFormState>(initialFormValues);
  const [errors, setErrors] = useState<IValidationObject>(initialErrorValues);
  const [skip, setSkip] = useState<boolean>(true);
  const { data: subscriptionNames = [] } = useGetAllNamesQuery(query, {skip});
  const [addSubscription, 
    {isSuccess: addSubscriptionIsSuccess,
     isLoading: addSubscriptionIsLoading, 
     isError: addSubscriptionIsError
    }] = useAddSubscriptionMutation();
  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validateFormFields()) {
      addSubscription(formValues);
    }
  }

  const handleSearch = (query: string) => {
    if (skip) {
      setSkip(false);
    }
    
    setFormValues(prevState => ({
      ...prevState,
      subscriptionName: query
    }))
    debouncedChangeHandler(query);
  }

  const debouncedChangeHandler = useCallback(
    debounce((query: string) => setQuery(query), 350)
  , [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateFormFields({[name]: value});
  }

  const onChangeHandler = (value, event?: React.SyntheticEvent<Element, Event>) => {
    const currentObject: ObjectLiteral = {};
    if (event === undefined) {
      if (value === null) return;
      currentObject.payingDueDate = value;
    } else {
      currentObject.subscriptionName = value?.name || "";
    }
    setFormValues(prevState => ({
      ...prevState,
      ...currentObject
    }));
    validateFormFields(currentObject);
  }

  const resetPricingAreaHandler = () => {
    setFormValues(prevState => ({
      ...prevState,
      currency: 'USD',
      monthlyPrice: ''
    }));
  }
  
  const validateFormFields = (fieldValues: (IFormState | ObjectLiteral) = formValues) => {
    let temp = {...errors};
    if ('subscriptionName' in fieldValues)
      temp.subscriptionName = fieldValues.subscriptionName ? "" : "This field is required";
    if ('monthlyPrice' in fieldValues)
      temp.monthlyPrice = validatePrice(fieldValues.monthlyPrice);
    if ('payingDueDate' in fieldValues)
      temp.payingDueDate = fieldValues.payingDueDate !== null ? "" : "This field is required";
    setErrors({
      ...temp
    });
    if (fieldValues == formValues)
      return Object.values(temp).every( x => x === "");
  }
  const renderFields = () => {
    return (
      <Box>
         <Grid container spacing={1} rowSpacing={2}>
           <Grid item xs={12}>
            <Autocomplete 
              sx={{my: "10px", width: '100%'}}
              id="free-solo"
              freeSolo
              autoHighlight
              getOptionLabel={(option) => option.name || ""}
              options={subscriptionNames}
              filterOptions={(x) => x}
              renderInput={(params) => <TextField {...errors.subscriptionName && {error: true, helperText: errors.subscriptionName}} {...params} label="Subscription Name"/>}
              renderOption={(props, option) => (
                <Box key={option.id} className={classes.listItems} component="li" {...props}>
                  <img onError={({currentTarget}) => {
                    currentTarget.onerror = null;
                    currentTarget.src='https://cdn.icon-icons.com/icons2/1378/PNG/512/imagemissing_92832.png';
                  }} 
                  className={classes.subsIcons} alt={option.name + " logo"} 
                  src={CDN_PATH + option.path.replace('/subscriptions-images', '')} />
                  <Typography sx={{lineHeight: "28px", fontSize: "1.1rem"}} variant="caption">{option.name}</Typography>
                </Box>
                )}
              onInputChange={(event, newInputValue) => {
                handleSearch(newInputValue);
              }}
              onChange={(event, newInputValue) => {
                onChangeHandler(newInputValue, event);
              }}
            />
           </Grid>
           <Grid item xs={4}>
             <EnhancedInput 
              id="select-currency" 
              value={formValues.currency} 
              name="currency" 
              label="Currency" 
              onChange={handleInputChange} 
              dropdownItems={currencies}
            />
           </Grid>
           <Grid item xs={5}>
            <EnhancedInput 
              id="monthly-price" 
              value={formValues.monthlyPrice} 
              name="monthlyPrice" 
              label="Price" 
              onChange={handleInputChange}
              error={errors.monthlyPrice}
            />
           </Grid>
           <Grid item sm={3}>
            <Box sx={{display: "flex", height: "100%"}}>
              <Tooltip title="Reset price/currency" placement="top">
                <IconButton color="primary" onClick={resetPricingAreaHandler}>
                    <RestartAltIcon />
                </IconButton>
              </Tooltip>
            </Box>
           </Grid>
           <Grid item xs={12}>
            <EnhancedInput 
              id="select-status" 
              value={formValues.status} 
              name="status" 
              label="Status" 
              onChange={handleInputChange} 
              dropdownItems={licensesStatus}
            />
           </Grid>
           <Grid item xs={12}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Next Due Date"
                disablePast
                value={formValues.payingDueDate}
                onChange={(newValue) => { onChangeHandler(newValue)}}
                renderInput={(params) => <TextField sx={{width: '100%'}} {...params} {...errors.payingDueDate && {error: true, helperText: errors.payingDueDate}} />}
              />
            </LocalizationProvider>
           </Grid>
           {/* {Will generate warning that I need to fix later } */}
           <Grid item xs={12}>
           <EnhancedInput 
              id="select-currency" 
              value={formValues.responsibleUsers} 
              name="responsibleUsers" 
              label="Responsible User" 
              onChange={handleInputChange} 
              dropdownItems={[{label: 'afa', value: 'Afa'}]}
            />
           </Grid>
           <Grid item xs={12}>
             {addSubscriptionIsError ? <Alert variant="standard" severity="error">
              <AlertTitle sx={{display: 'inline'}}>Error occured.</AlertTitle>Please try again.
            </Alert>: ''}
           </Grid>
          </Grid>
        </Box>
    );
  };

  const loadingButton = () => {
    return (
      <LoadingButton
        size="medium"
        loading={addSubscriptionIsLoading}
        onClick={handleSubmit}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Create Subscription
      </LoadingButton>
    );
  }

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  useEffect(() => {
    if (addSubscriptionIsSuccess) {
      handleClose();
    }
  }, [addSubscriptionIsSuccess, handleClose]);

  return (
    <Modal 
      open={open} 
      handleClose={handleClose} 
      children={renderFields} 
      title="Add new subscription"
      button={loadingButton}
    />
  );
}

export default ModalContent;

