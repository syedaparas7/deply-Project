import React from 'react'
import './AdminSummary.css'

const SummaryCard = ({ icon, text, number, bgColor }) => {
  return (
    <div className="summary-card" style={{ borderLeft: `5px solid ${bgColor}` }}>
      <div className="summary-card-icon" style={{ color: bgColor }}>{icon}</div>
      <div className="summary-card-info">
        <span className="summary-card-text">{text}</span>
        <span className="summary-card-number">{number}</span>
      </div>
    </div>
  )
}

export default SummaryCard


