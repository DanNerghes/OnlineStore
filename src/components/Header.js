import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import jumbotron_background from '../images/jumbotron_background.jpg'
import './Header.css'
import {SiFoursquare} from 'react-icons/si'


export default function Header() {
    return (
        <div>
            <Jumbotron fluid='false' className='jumbo' style={{backgroundImage:`url(${jumbotron_background})`}}>
                <Container>
                    <h1><SiFoursquare />Shopping</h1>
                    <h3 className='text-center'>
                    Christmass spirit everyday!
                    </h3>
                </Container>
            </Jumbotron>
        </div>
    )
}
