import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find the Job That Fits Your Life</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
            alt="Find the Job That Fits Your Life"
            className="home-mobile-img"
          />
          <p className="home-description">
            millions of people are searching for jobs, salary information,
            company reviews. find the job that fits your ability and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="shop-now-button">
              Find Jobs
            </button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          alt="Find the Job That Fits Your Life"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home
