import {useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({children}) => {
    const location = useLocation();
    const routesWithoutNav = ['/','/*'];
    const shouldShowNav = !routesWithoutNav.includes(location.pathname);
    return (
        <div>
            {shouldShowNav && <Navbar />}
            {children}
        </div>
    );
};

export default Layout;