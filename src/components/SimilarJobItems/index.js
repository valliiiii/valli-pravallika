import './index.css'

const SimilarJobItems = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-product-item">
      <img
        src={companyLogoUrl}
        className="similar-product-image"
        alt="similar job company logo"
      />
      <h1 className="similar-product-title">{title}</h1>
      <div className="similar-product-rating-container">
        <p className="similar-product-rating">{rating}</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          alt="star"
          className="similar-product-star"
        />
      </div>
      <p className="similar-products-brand">{jobDescription}</p>
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price"> {location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItems
