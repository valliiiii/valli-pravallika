import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = jobData

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="developer">
          <img src={companyLogoUrl} alt="company logo" className="thumbnail" />
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
        <div className="job-type">
          <p className="brand"> {location}</p>
          <p className="price"> {employmentType}</p>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1>Description</h1>
        <p>Visit</p>
        <div className="product-details">
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
