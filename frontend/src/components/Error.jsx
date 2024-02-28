import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import '../styles/components/Error.css'
export default function Error(props) {
    const {msg, showw} = props
    if(showw){
        return (
            <Alert key='danger' variant='danger' className='danger-msg'>
                    {msg}
            </Alert>
        )
    }
    return null
}
