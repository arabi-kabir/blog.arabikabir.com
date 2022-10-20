import React from 'react'

function Footer() {
    return (
        <div 
            style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#2c3e50', color: 'white', textAlign: 'center', padding: '10px' }}
        >
            blog.arabikabir.com ©{ new Date().getFullYear() } created with &hearts; by arabi
        </div>
    )
}

export default Footer