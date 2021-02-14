import {Navbar} from '../nav/Navbar';
import {Footer} from '../footer/Footer';

export const Layout = ({children}) => {
  return (
    <>
      <Navbar></Navbar>

      {children}

      <Footer></Footer>
    </>
  );
};
