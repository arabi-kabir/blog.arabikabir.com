import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import Navigation from './Navigation';

const Layout =({children}) =>{
    return(
        <>
            <div>
                <Navigation/>
                <main>
                    {children}
                </main>
                <Footer 
                    style={{ textAlign: 'center', bottom: '0', width:'100%', backgroundColor: '#34495e', color: 'white', marginTop: '400px' }}
                >
                    blog.arabikabir.com ©{ new Date().getFullYear() } created with &hearts; by arabi
                </Footer>
            </div>
        
        </>
    )
}

export default Layout;