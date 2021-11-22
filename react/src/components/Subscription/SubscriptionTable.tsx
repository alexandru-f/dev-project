import React from 'react';
import SubscriptionTableItem from "./SubscriptionTableItem";

const SubscriptionTable = () => {
  
  const tableHeaderClassNames = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"


  return (
    <>
    <div
      className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={"font-semibold text-lg text-blueGray-700 text-left"}
            >
              Current Subscriptions
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className={tableHeaderClassNames}>
              Subscription Name
            </th>
            <th className={tableHeaderClassNames}>
              Price
            </th>
            <th className={tableHeaderClassNames}>
              Status
            </th>
            <th className={tableHeaderClassNames}>
              Users  Responsible
            </th>
            <th className={tableHeaderClassNames}>
              Due Date
            </th>
            <th className={tableHeaderClassNames}></th>
          </tr>
        </thead>
        <tbody>
          <SubscriptionTableItem />
        </tbody>
      </table>
    </div>
  </div>
  </>
  );
}

export default SubscriptionTable;