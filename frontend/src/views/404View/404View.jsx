import React from 'react'
import logo from '../../assets/market_logo_black.png'
export default function ErrorView() {
  return (
    <div 
    className='d-flex justify-content-center flex-column'
    style={{width: '100%'}}>
      <img src={logo} alt="logo" style={{width: '300px', margin: 'auto'}}/>
      <h1 style={{textAlign:"center"}}>404</h1>
      <h2 style={{textAlign:"center"}}>Page not found</h2>
    </div>
  )
}
