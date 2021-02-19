import {Navbar} from '../nav/Navbar';
import {Footer} from '../footer/Footer';
import {ShareDesktop} from '../share/ShareDesktop';

export const Layout = ({children}) => {
  return (
    <>
      <Navbar></Navbar>

      {children}

      <Footer></Footer>

      <ShareDesktop></ShareDesktop>
    </>
  );
};
