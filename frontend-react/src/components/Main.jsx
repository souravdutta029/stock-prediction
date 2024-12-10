import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className='text-light'>Stock Prediction App</h1>
          <p className="text-light lead">
            Stock prediction leverages historical data, machine learning, and market trends to forecast future stock prices. 
            Analysts use algorithms, sentiment analysis, and technical indicators to identify patterns. Accurate predictions 
            empower investors to make informed decisions, though market volatility and external factors can pose challenges 
            to precision.
          </p>
          <Button text="Explore Now" class="btn btn-info" url="/dashboard" />
        </div>
      </div>
    </>
  )
}

export default Main