import React from 'react'

export const FilterControl = ({ filterStatus, setFilterStatus, theme }) => {
  // how can i keep track of filterStatus
  

  const handleStatus = (status) => {
    // console.log('clicked')
    setFilterStatus(status)
  }
  // console.log(filterStatus)

  // setting up classNames to activate CSS for each clicked button/span
  const all = filterStatus === 'all' ? 'active' : '';
  const active = filterStatus === 'active' ? 'active' : '';
  const completed = filterStatus === 'completed' ? 'active' : '';

  return (
    <div className={`items-statuses ${theme}`}>
        <span className={`${all} ${theme}`} onClick={()=> handleStatus('all')}>All</span>

        <span className={`${active} ${theme}`} onClick={()=> handleStatus('active')}>Active</span>
        
        <span className={`${completed} ${theme}`} onClick={()=> handleStatus('completed')}>Completed</span>
    </div>
  )
} 