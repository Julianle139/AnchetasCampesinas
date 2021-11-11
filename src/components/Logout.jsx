import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Logout.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default function Logout() {
    const { logout } = useAuth0();
    function closeSesion(){
        let timerInterval
        Swal.fire({
          html: 'Cerrando en <b></b> millisegundos',
          timer: 1800,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Closing by timer')
          }
        })
    }

    return (
        <div className="cont-buttonn" onClick={() => closeSesion()} >
            <button onClick={() => logout()} variant="danger" type="submit" className="boton-off"><i class="fas fa-power-off text-danger"></i></button>
        </div>
    )
}
