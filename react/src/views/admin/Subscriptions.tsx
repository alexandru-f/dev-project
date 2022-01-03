import React, { useState } from 'react';
import SubscriptionTable from '../../components/Subscription/SubscriptionTable';


//Import CSS for Subscriptions page
import '../../assets/style/subscriptions.css';
import CreateSubscriptionModal from '../../components/Subscription/SubscriptionModal';

const Subscriptions = () => {
  
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* <div className="w-full mx-autp items-center flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4 add-items-bar py-3 w-full mb-12">
      </div> */}
      {/* Subscriptions Table */}
      <div className="relative px-4 md:px-10 mx-auto w-full pt-6">
        <div className="flex flex-wrap">
          <div className="w-full mb-12 px-4">
            <div className="w-full mx-autp items-center flex justify-end md:flex-nowrap flex-wrap md:px-9 px-4 add-items-bar py-3 w-full">
              {showModal && <CreateSubscriptionModal show={showModal} handleClose={closeModal}/>}
              <button 
              onClick={openModal} 
              className="add-button focus:outline-none"
              >
                <i className="fas fa-plus-circle text-lightBlue-500 text-4xl hover:text-lightBlue-600"></i>
              </button>
            </div>
            <SubscriptionTable />
          </div>
        </div>
      </div>
    </>
  );
};


export default Subscriptions;
