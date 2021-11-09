import React from 'react'
import '../styles/Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'

function Contact() {
    return (
        <div className="cont-icons">
            <a href="/#Facebook"><FontAwesomeIcon icon={faFacebook} className="facebook"/></a> 
            <a href="/#Instagram"><FontAwesomeIcon icon={faInstagram} className="instagram"/></a> 
            <a href="/#Youtube"><FontAwesomeIcon icon={faYoutube} className="youtube"/></a> 
            <a href="/#Twitter"><FontAwesomeIcon icon={faTwitter} className="twitter"/></a> 
        </div>
    )
}

export default Contact
