import React from 'react'
import '../styles/Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'

function Contact() {
    <div></div>
    return (
        
        <div className="cont-icons">
            
            <a href="/#Facebook"><FontAwesomeIcon icon={faFacebook} className="facebook bg-white"/></a> 
            <a href="/#Instagram"><FontAwesomeIcon icon={faInstagram} className="instagram bg-white"/></a> 
            <a href="/#Youtube"><FontAwesomeIcon icon={faYoutube} className="youtube bg-white"/></a> 
            <a href="/#Twitter"><FontAwesomeIcon icon={faTwitter} className="twitter bg-white"/></a> 
        </div>
    )
}
export default Contact
