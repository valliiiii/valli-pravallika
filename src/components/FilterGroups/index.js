import {BsSearch} from 'react-icons/bs'

import './index.css'

const FilterGroups = props => {
  const renderRangeFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeRange, salaryRangesId} = props
      const onClickRangeItem = () => changeRange(range.salaryRangeId)

      const ratingClassName =
        salaryRangesId === range.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item"
          key={range.salaryRangeId}
          onClick={onClickRangeItem}
        >
          {/* <img
            src={range.imageUrl}
            alt={`rating ${range.salaryRangeId}`}
            className="rating-image"
          /> */}
          <p className={ratingClassName}>{range.label}</p>
        </li>
      )
    })
  }

  const renderSalaryFilters = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderRangeFiltersList()}</ul>
    </div>
  )

  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {changeEmployment, employmentTypesId} = props
      const onClickEmploymentItem = () =>
        changeEmployment(employment.employmentTypeId)
      const isActive = employment.employmentTypeId === employmentTypesId
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`

      return (
        <li
          className="category-item"
          key={employment.employmentTypeId}
          onClick={onClickEmploymentItem}
        >
          <p className={categoryClassName}>{employment.label}</p>
        </li>
      )
    })
  }

  const renderEmploymentCategories = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderEmploymentList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button" data-testid="searchButton">
          <BsSearch className="search-icon" /> s
        </button>
      </div>
    )
  }

  //   const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderEmploymentCategories()}
      {renderSalaryFilters()}
      {/* <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button> */}
    </div>
  )
}

export default FilterGroups
