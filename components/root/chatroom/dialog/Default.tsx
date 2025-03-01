import React from 'react'

export default function Default() {
  return (
    <div className={`w-full flex`}>
      <div className={`max-w-[70%] max-lg:w-full flex`}>
          <p className="text-sm text-pretty bg-customBlue-100 py-3 px-5 rounded-2xl text-customWhite-100">
            Sorry, I don't understand what you're saying.😅<br />
            But I can help you with the following:<br /><br />
            <ul>
              <li>- Checking Flight Status</li>
              <li>- Checking Scheduled Flights</li>
              <li>- Recommending Places</li>
              <li>- Checking Weathers</li>
            </ul>
          </p>
        </div>
    </div>
  )
}
