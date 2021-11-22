import React from 'react';
import IPage from '../interfaces/page';
import {Link} from 'react-router-dom';

const PageNotFound: React.FunctionComponent<IPage> = props => {

  return (
    <div>
      <div>Nothing to see here</div>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
};

export default PageNotFound;