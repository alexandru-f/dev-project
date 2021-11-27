import React, {useState, createRef, useRef} from "react";
import { createPopper } from "@popperjs/core";

const NotificationDropdown = () => {
  
  const [dropdownShow, setDropdownShow] = useState(false);
  const btnDropdownRef = createRef<HTMLAnchorElement>();
  const popoverDropdownRef = createRef<HTMLDivElement>();
  
  //Functions
  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "left-start"
      });
    }
    setDropdownShow(true);
  }

  const closeDropdownPopover = () => {
    setDropdownShow(false);
  }

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownShow ? closeDropdownPopover() : openDropdownPopover(); 
        }}    
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        
        ref={popoverDropdownRef}
        className={
          (dropdownShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;