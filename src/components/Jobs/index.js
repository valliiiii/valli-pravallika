import AllJobsSection from '../AllJobsSection'
import Profile from '../Profile'
// import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="product-sections">
      <Profile />
      <AllJobsSection />
    </div>
  </>
)

export default Jobs
