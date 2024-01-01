import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
        <Link className='text-white' to='https://mdbootstrap.com/'>
          GoFood.com
        </Link>
      </div>
    </MDBFooter>
  );
};

export default Footer;
