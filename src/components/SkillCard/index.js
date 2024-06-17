import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="similar-job-item">
      <div className="skill-container">
        <img src={imageUrl} alt="name" className="skill-image" />
        <h1>{name}</h1>
      </div>
    </li>
  )
}

export default SkillCard
