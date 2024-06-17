import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItems from '../SimilarJobItems'
import SkillCard from '../SkillCard'
// import CompanyCard from '../CompanyCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    skillData: [],
    companyData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
  })

  getFormattedSkillData = eachSkill => ({
    name: eachSkill.name,
    imageUrl: eachSkill.image_url,
    description: eachSkill.description,
    imageUrl1: eachSkill.image_url,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      //   const updatedData = this.getFormattedData(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSkillData = fetchedData.job_details.skills.map(eachSkill =>
        this.getFormattedSkillData(eachSkill),
      )
      //   const updatedCompany = fetchedData.job_details.skills.map(
      //       eachSkill => ({
      //        description: eachSkill.description,
      // imageUrl: eachSkill.image_url,
      //       }),
      //     )
      const updatedCompany = this.getFormattedSkillData(
        fetchedData.job_details.life_at_company,
      )
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        skillData: updatedSkillData,
        companyData: updatedCompany,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData, skillData, companyData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      companyWebsiteUrl,
      rating,
      title,
      packagePerAnnum,
    } = jobData
    const {description, imageUrl} = companyData

    return (
      <div className="product-details-success-view">
        <div className="product-item">
          <div className="developer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="thumbnail"
            />
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
          <h1>Description</h1>
          <h1>Description</h1>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
          <div className="product-details">
            <p>{jobDescription}</p>
          </div>
          <h1>Skills</h1>
          {skillData.map(eachSkill => (
            <SkillCard skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </div>
        <h1>Life at Company</h1>
        <div className="company-at">
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
        {/* {companyData.map(eachSkill => (
          <CompanyCard companyDetails={eachSkill} key={eachSkill.description} />
        ))} */}
        <h1 className="similar-products-heading">Similar Jobs</h1>
        <ul className="similar-products-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItems
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
