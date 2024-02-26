import React from 'react'
import Alert from 'react-bootstrap/Alert'
import '../styles/components/Error.css'

export default function Correct(props) {
    const {msg, showw} = props
    if(showw){
        return (
            <Alert key='success' variant='success' className='danger-msg'>
                    {msg}
            </Alert>
        )
    }
    return null
}
