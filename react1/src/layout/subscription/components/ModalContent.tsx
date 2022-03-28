import { useState, useCallback, useEffect } from "react";
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { fetchSubscriptionsNames, subscriptionsNames, clearSuggestions} from '../../../features/subs-names-slice';
import { addSubscription, subscriptionLoadingStatus, clearLoadingState } from "../../../features/subscription-slice";
import debounce from 'lodash.debounce';
import { unwrapResult } from '@reduxjs/toolkit';
import {CDN_PATH, HTTP_STATUS} from '../../../app/constants';
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


const ModalContent:React.FC<IModalContentProps> = ({open, handleClose, classes}) => {

  const [query, setQuery] = useState<string>("");
  const [formValues, setFormValues] = useState<IFormState>(initialFormValues);
  const [errors, setErrors] = useState<IValidationObject>(initialErrorValues);
  const dispatch = useAppDispatch();
  const suggestedSubscriptionNames = useAppSelector(subscriptionsNames);
  const loadingStatus = useAppSelector(subscriptionLoadingStatus);


  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validateFormFields()) {
      dispatch(addSubscription(formValues)).then(unwrapResult).catch((obj) => {
        dispatch(addSubscription(formValues));
      }).finally(() => {
        console.log('in finally')
        handleClose();
      });
    }
  }

  const handleSearch = (query: string) => {
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
              options={suggestedSubscriptionNames}
              filterOptions={(x) => x}
              renderInput={(params) => <TextField {...errors.subscriptionName && {error: true, helperText: errors.subscriptionName}} {...params} label="Subscription Name"/>}
              renderOption={(props, option) => (
                <Box key={option.id} className={classes.listItems} component="li" {...props}>
                  <img onError={({currentTarget}) => {
                    currentTarget.onerror = null;
                    currentTarget.src='https://lab.csschopper.com/placeholder/images/placeholder_image_logo.png';
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
             {loadingStatus === HTTP_STATUS.REJECTED ? <Alert variant="standard" severity="error">
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
        loading={loadingStatus === HTTP_STATUS.PENDING ? true : false}
        onClick={handleSubmit}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Create Subscription
      </LoadingButton>
    );
  }


  useEffect(() => {
    if (!query) return;
    const fetchResults = () => {
      dispatch(fetchSubscriptionsNames(query)).then(unwrapResult).catch((obj) => {
        dispatch(fetchSubscriptionsNames(query));
      });
    };
    
    fetchResults();
  }, [query, dispatch]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  useEffect(() => {
    if (subscriptionsNames.length > 0) {
      dispatch(clearSuggestions());
    }
    if (loadingStatus === HTTP_STATUS.REJECTED) {
      dispatch(clearLoadingState());
    }
  }, []);
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

