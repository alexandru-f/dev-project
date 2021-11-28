import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { fetchSubscriptionsNames, subscriptionsNames } from "../../features/subs-names-slice";
import {Placeholder, Message} from 'rsuite';
import { useSelector } from "react-redux";
// components

const SubscriptionForm = () => {
  
  const dispatch = useAppDispatch();
  // const loading = useAppSelector((state) => state.subscriptionsNames.loading);

  const subscriptionNames = useAppSelector(subscriptionsNames);
  const [subscriptionInputText, setSubscriptionInputText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchSubscriptionsNames());  console.log(subscriptionNames);
  }, []);

  const onChangeHandler = (inputText:string) => {
    let matches: string[] = [];
    if (inputText.length > 0) {
      matches = subscriptionNames.filter((subscriptionName: string) => {
          const regex = new RegExp(`${inputText}`, 'gi');
          return subscriptionName.match(regex);
      });
    }
    setSuggestions(matches);
    setSubscriptionInputText(inputText);
  }
  const onSuggestHandler = (inputText:string) => {
    setSubscriptionInputText(inputText);
  }
  return (
     <>
        <div className="flex content-center items-center justify-center h-full">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t mb-0 px-6 py-2 pb-6">

              <div className="flex-auto py-6 pt-0 px-0">
                <div className="text-blueGray-400 mb-3 font-bold text-left">
                  Add a new subscription
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
              </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Subscription Name
                    </label>
                    <div className="relative flex w-full flex-wrap items-stretch autocomplete-container"><span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i className="fas fa-search"></i></span>
                    <input type="text" placeholder="Search Subscription" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" 
                         onChange={e => onChangeHandler(e.target.value)}
                         value={subscriptionInputText}
                         onBlur={() => {
                           setTimeout(() => {
                             setSuggestions([]);
                           }, 100);
                         }}
                    />
                    </div>
                    {/* <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Subscription Name"
                      onChange={e => onChangeHandler(e.target.value)}
                      value={subscriptionInputText}
                    /> */}
                    <div className="autocomplete-items">
                      {suggestions && suggestions.map((suggestion, index) => 
                      <div 
                        key={index}
                        onClick={() => onSuggestHandler(suggestion)}
                      >{suggestion}</div>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </>
  );
}

export default SubscriptionForm;