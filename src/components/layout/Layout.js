import {Navbar} from '../nav/Navbar';

export const Layout = ({children}) => {
  return (
    <>
      <Navbar></Navbar>

      {children}
    </>
  );
};
