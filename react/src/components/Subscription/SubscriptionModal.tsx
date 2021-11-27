import React, { useEffect } from 'react';
import SubscriptionForm from '../Subscription/SubscriptionForm';

interface Props {
  show: boolean,
  handleClose: () => void
}

const SubscriptionModal:React.FC<Props> = ({show, handleClose}) => {  

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    }
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  }, []);

  return (
    <> 
    <div className={
      (show ? "block " : "hidden ") +
      "modal opacity-0 fixed w-full h-full top-0 left-0 flex items-center z-10 justify-center subscription-modal"
    }
    >
    <div className="modal-overlay absolute w-full h-full bg-blueGray-800 opacity-50"></div>
    
    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto w-fullw-full lg:w-4/12 px-4  bg-blueGray-100">
      


      <div className="modal-content py-4 text-left px-0">
        <div className="flex justify-end pb-2 items-center pb-3">
          <div onClick={handleClose} className="modal-close cursor-pointer z-50">
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div> 
        <SubscriptionForm />
      </div>
    </div>
  </div>
    </>
  );
}

export default SubscriptionModal;