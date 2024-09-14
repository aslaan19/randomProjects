import React, { useState } from 'react';
import './tabs.css'
export default function TabMain({ tabcontent }) {
  const [crntindx, setCrntindx] = useState(0);

  function handleOnClick(getidx) {
    setCrntindx(getidx); // Correct the state update function
  }

  return (
    <div>
      {/* Tab buttons */}
      {tabcontent.map((tabItem, index) => (
        <div
          key={tabItem.label}
          onClick={() => handleOnClick(index)}
          className={`tab-item ${crntindx === index ? 'active' : ''}`}
          
        >
          <span className="label">{tabItem.label}</span>
        </div>
      ))}

      {/* Displaying the content of the active tab */}
      <div className="tab-content">
        {tabcontent[crntindx].content}
      </div>
    </div>
  );
}
