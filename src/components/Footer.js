import React from 'react'
import './Footer.css'
import {SiFoursquare} from 'react-icons/si'
import {FaFacebook} from 'react-icons/fa'
import {IoLogoWhatsapp} from 'react-icons/io'
import {GrLinkedin} from 'react-icons/gr'


export default function Footer() {
    return (
        <div className='footer mt-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className=''>
                            <h3>Contact</h3>
                            <ul className='list-unstyled'>
                                <li>+40 0722743642</li>
                                <li>Brasov, Romania</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col'>
                        <div className=''>
                            <ul className='list-unstyled d-flex justify-content-between'>
                                <li>WhatsApp <span> <IoLogoWhatsapp color='green' size='40' /> </span> </li>
                                <li>Facebook <a href='https://www.facebook.com/dan.nerghes/' target="_blank" rel="noopener noreferrer"> <FaFacebook size='40' /> </a> </li>
                                <li>LinkedIn <a href='https://www.linkedin.com/in/nerghes-dan-9457a11a1' target="_blank" rel="noopener noreferrer"> <GrLinkedin size='40' /> </a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <p className='col-sm'> &copy;{new Date().getFullYear()} <SiFoursquare />Shopping | All rights reserved</p>
                </div>
            </div>
        </div>
    )
}
