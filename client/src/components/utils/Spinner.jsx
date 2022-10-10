import React from 'react'
import spinner from '../../assets/spinner1.gif'

function Spinner() {
    return (
        <div style={{ textAlign: 'center'}}>
            <img src={spinner} alt='Loading...' />
        </div>
    )
}

export default Spinner