import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HTTP_STATUS } from '../app/constants';
import { RootState } from '../app/store';
import {ISubscriptionState} from '../interface/IApi'
import {isSomeAsyncActionsPending, isSomeAsyncActionsFulfilled, isSomeAsyncActionsRejected} from './sliceHelper';
import {IFormState} from '../interface/IModalContent';

const initialState: ISubscriptionState = {
  loading: '',
  data: [],
};
  
export const addSubscription = createAsyncThunk(
  'subscription/addSubscription',
  async (subscription: IFormState) => {
      await axios.post('/api/subscription/v1/register', subscription);
  }
);

export const getSubscriptions = createAsyncThunk(
  'subscription/getSubscriptions',
  async () => {
    const {data} =  await axios.get('/api/subscription/v1');
    return data;
  }
);

const actionsArray = [addSubscription, getSubscriptions];

const isActionPending = isSomeAsyncActionsPending(actionsArray);
const isActionFulfilled = isSomeAsyncActionsFulfilled(actionsArray);
const isActionRejected = isSomeAsyncActionsRejected(actionsArray);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearLoadingState(state, action: PayloadAction) {
      state.loading = '';
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isActionPending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addMatcher(isActionFulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addMatcher(isActionRejected, (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
    })
  }
});

// export const {clearLoadingState} = subscriptionSlice.actions;
// export const subscription = (state: RootState) => state.subscription.data; 
// export const subscriptionLoadingStatus = (state: RootState) => state.subscription.loading;
export default subscriptionSlice.reducer;
