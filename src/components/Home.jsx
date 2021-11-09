import React from 'react'
import Contact from '../shared/Contact'
import '../styles/Home.css'
import LoginButton from './LoginButton'
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button'


export default function Home() {
    const {isLoading } = useAuth0();
    if (isLoading) {
        return <div className="spinner">       
        <Button variant="primary" disabled>
        <Spinner as="span"  animation="grow" size="sm" role="status" aria-hidden="true"/>Loading...</Button></div>;
      }
    return (
        <>
        
         <LoginButton/>
        <div className="cont">
            <div className="cont-home">
                <h1>Anchetas Campesinas</h1>
                <div> </div>
                <h2>Productos de alta calidad y naturales</h2>
            </div>
            <Contact/>
        </div>
        </>
    )
}
