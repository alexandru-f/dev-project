import { useEffect, useState, useCallback, useRef, RefObject } from 'react';
import { fetchSubscriptionsNames, subscriptionsNames, subscriptionLoadingStatus, clearSuggestions} from "../../features/subs-names-slice";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { HTTP_STATUS } from '../../app/constants';
//@ts-ignore
import debounce from 'lodash.debounce';
import SubscriptionCard from './SubscriptionCard';
import LoadingGif from '../../assets/img/loading_gif.gif';
import { unwrapResult } from '@reduxjs/toolkit';

const SubscriptionSearch: React.FC = () => {

  const useKeyPress = (targetKey: string, ref: RefObject<HTMLInputElement>) => {
      const [keyPressed, setKeyPressed] = useState(false);

      function keyDownHandler({key} : {key: string}) {
        if (key === targetKey) setKeyPressed(true);
      }
      function keyUpHandler({key} : {key: string}) {
        if (key === targetKey) setKeyPressed(false);
      }

      useEffect(() => {
        ref.current?.addEventListener('keydown', keyDownHandler);
        ref.current?.addEventListener('keyup', keyUpHandler);

        return () => {
          ref.current?.removeEventListener('keydown', keyDownHandler);
          ref.current?.removeEventListener('keyup', keyUpHandler);
        }
      });

      return keyPressed;
  }

  const [query, setQuery] = useState<string>("");
  const [subscriptionName, setSubscriptionName] = useState<string>('');
  const suggestedSubscriptionNames = useAppSelector(subscriptionsNames);
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(subscriptionLoadingStatus);
  const inputRef = useRef<HTMLInputElement>(null);
  const downPress = useKeyPress("ArrowDown", inputRef);
  const upPress = useKeyPress('ArrowUp', inputRef);
  const enterPress = useKeyPress("Enter", inputRef);
  const [hovered, setHovered] = useState<undefined | string>(undefined);
  const [cursor, setCursor] = useState<number>(0);

  const handleSearch = (query: string) => {
    setSubscriptionName(query);
    debouncedChangeHandler(query);
  }
  
  const debouncedChangeHandler = useCallback (
    debounce((query: string) => setQuery(query), 300)
  , [query]);

  const setSelected = (suggestion: string) => {
    setSubscriptionName(suggestion);
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
    inputRef.current?.focus();
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, []);

  useEffect(() => {
    if (suggestedSubscriptionNames.length && downPress) {
      setCursor(prevState => 
        prevState < suggestedSubscriptionNames.length - 1 ? prevState + 1: prevState  
      );
    }
  }, [downPress]);

  return (
    <>
      <input type="text" placeholder="Search Subscription" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
          onChange={(e) => handleSearch(e.target.value)}
          value={subscriptionName}
          // onBlur={() => {
          //   setTimeout(() => {
          //     dispatch(clearSuggestions());
          //   }, 100);
          // }}
          ref={inputRef}
      />
      <div className="autocomplete-items">
          {loadingStatus === HTTP_STATUS.PENDING && (
            <div className="loading-elements-container">
              <img src={LoadingGif} alt="Loading Gif" />
            </div>
          )}
            {loadingStatus === HTTP_STATUS.FULFILLED && query !== "" && suggestedSubscriptionNames.map((item, index) => 
              <SubscriptionCard 
                setHovered={setHovered}
                setSelected={setSelected} 
                key={item.id} id={item.id} 
                name={item.name} 
                path={item.path} 
              />
            )
            }
      </div>
    </>
  );
}

export default SubscriptionSearch;
