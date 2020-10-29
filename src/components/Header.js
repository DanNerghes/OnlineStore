import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import banner from '../images/banner.jpg'
import './Header.css'
import {SiFoursquare} from 'react-icons/si'


export default function Header() {
    return (
        <div className='mt-0'>
            <Jumbotron fluid='false' className='jumbo' style={{backgroundImage:`url(${banner})`}}>
                <Container>
                    <h1><SiFoursquare />Store</h1>
                    <h3 className='text-center'>
                    Christmass spirit everyday!
                    </h3>
                </Container>
            </Jumbotron>
        </div>
    )
}
