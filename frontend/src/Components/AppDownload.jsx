import { assets } from '../assets/assets'
import './AppDownload.css'
import React from 'react'

const AppDownload = () => {
  return (
    <div className="app-download" id = "app-download">
        <p>For better Experience Download <br/> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt=""/>
            <img src={assets.app_store} alt = ""/>
        </div>
      
    </div>
  )
}

export default AppDownload
