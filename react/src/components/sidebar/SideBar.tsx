import {Link, useLocation} from 'react-router-dom';

function SideBar() {
  
  let  {pathname: pathName} = useLocation();

  return (
    <>
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap text-left  w-full mx-auto">
        {/* Brand */}
        <Link
          className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          to="/"
        >
          CompanyName
        </Link>
          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Layout Pages
          </h6>
          {/* Navigation */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathName.includes("/admin/dashboard") 
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/dashboard"
              >
                <i
                  className={
                    "fas fa-tv mr-2 text-sm " +
                    (pathName.includes("/admin/dashboard")
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Dashboard
              </Link>
            </li>
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathName.includes("/admin/subscriptions")
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/subscriptions"
              >
                <i
                  className={
                    "fas fa-table mr-2 text-sm opacity-75 " +
                    (pathName.includes("/admin/subscriptions")
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Subscriptions
              </Link>
            </li>
          </ul>

      </div>
    </nav>
  </>
  );
}

export default SideBar;