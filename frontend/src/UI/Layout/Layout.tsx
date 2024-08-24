import React from 'react';
import Toolbar from '../Toolbar/Toolbar.tsx';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main className="container-fluid">{children}</main>
        </>
    );
};

export default Layout;
