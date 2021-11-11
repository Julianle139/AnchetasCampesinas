import React from "react";
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button'
import '../styles/SistemaGestion.css'
import { Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Logout from "../components/Logout"
toast.configure()

export default function SistemaGestion() {    
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(true);
  const notify = () => {
    toast(`!Secciones disponibles (Usuarios, Productos y Ventas)!`, {position: toast.POSITION.TOP_CENTER })
  }

  if (isLoading) {
    return <div className="spinner">
      <Button variant="primary" disabled>     
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Cargando...
  </Button></div>;
  }
 
  return (

    isAuthenticated && (
     <>
     
     
    
      <div className="cont-father">      
        <div className="cont-profile">
            <img className="imp-p" src={user.picture} alt={user.name} />
            <p>{user.email}</p>
        </div>
        <div className="cont">
                <div className="cont-buttons">
                <Link to="/AgregarUsuario" ><Button variant="warning"className="btn-usuarios text-white">Usuarios</Button></Link>   
                <Link to="/list-products" ><Button variant="primary" className="btn-productos">Productos</Button></Link> 
                <Link to="/AgregarVentas" ><Button variant="danger" className="btn-usuarios">Ventas</Button></Link>                   
                </div>               
            </div>           
      </div>
      <Logout />
  <div className="notify">
       <Button variant="info" onClick={notify} 
       ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill text-white" viewBox="0 0 16 16">
       <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
       <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
     </svg></Button>{' '}
     <div className="hand text-danger bg-white" ><i className="far fa-hand-point-left"></i></div>
  </div>
  
 <div className="toa">
   
  <ToastContainer>
      <Toast onClose={() => setShow(false)} show={show} delay={8000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Acesso exitoso {' '} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
</svg></strong>
          <small className="text-muted"></small>
        </Toast.Header>
        <Toast.Body> {` Hola ${user.name}, Bienvenido`} </Toast.Body>
      </Toast>
  </ToastContainer>

  </div>
  {/* <br/>
  <br/>
  <br/>
  <div align="center" > <h1 class="text-light bg-dark"> Arma tu Ancheta con los mejores productos<br/> campesinos del pais</h1> </div> */}
     </>
    )
    
  );
};
