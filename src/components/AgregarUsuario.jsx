import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Component} from 'react'
import Table from "react-bootstrap/Table"
import swal from 'sweetalert'
import Swal from "sweetalert2";
import "../styles/AgregarUsuario.css"

class AgregarUsuario extends Component{
    constructor(props) {
        super(props);
        this.state = {
          nombre: '',
          email: '',
          estado: '',
          usuarios: [],
          _id: ''
        };    
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
      }

      actualizar(){
          swal({
            title: "Seleccione editar usuario y a continuación lo actualiza",
            icon: "error",
            button: true,  
          });       
      }
    
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      }

      addUser(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`https://anchetascampesinasbackend.herokuapp.com/api/usuarios/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              nombre: this.state.nombre,
              email: this.state.email,
              estado: this.state.estado
              }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
              })
            .then(res => res.json())    
            .then(data => {
              this.setState({_id: '',nombre: '', email: '',estado: ''});
              this.fetchTasks();
              });
            
            swal({
              title: "Usuario Actualizado",
              icon: "success",
              button: true, 
              });
            
          } else {
            fetch('https://anchetascampesinasbackend.herokuapp.com/api/usuarios', {
              method: 'POST',
              body: JSON.stringify(this.state),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
              })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              swal({
                title: "Usuario Agregado",
                icon: "success",
                button: true,               
                });
              this.setState({nombre: '', email: '',estado: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
          }
    
        }
        editUser(id) {
          fetch(`https://anchetascampesinasbackend.herokuapp.com/api/usuarios/${id}`)
            .then(res => res.json())
            .then(data => {
              console.log(data);
              this.setState({
                nombre: data.nombre,
                email: data.email,
                estado: data.estado,
                _id: data._id
              });
            });
          }

      deleteUser(id) {
        if(Swal.fire({
          title: '¿Está seguro?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '!Si, eliminarlo!'
          })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
              )
            }
          })) {
          fetch(`https://anchetascampesinasbackend.herokuapp.com/api/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              this.fetchTasks();
              });
          }
        }

      componentDidMount() {
        this.fetchTasks();
      }
    
      fetchTasks() {
        fetch(`https://anchetascampesinasbackend.herokuapp.com/api/usuarios`)
          .then(res => res.json())
          .then(data => {
            this.setState({usuarios: data});
            console.log(this.state.usuarios);
          });
        }

      render(){
        return(
          <>
          <div align="center"><h2 >Usuarios</h2></div>
          <Container className="justify-content center">
          <div className="cont-form1" align="center">
          <Form onSubmit={this.addUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" onChange={this.handleChange} value={this.state.nombre}  type="text" placeholder="Ingrese el nombre del usuario" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" onChange={this.handleChange} value={this.state.email} type="text" placeholder="Ingrese el email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Rol</Form.Label>
                <Form.Control name="estado" onChange={this.handleChange} value={this.state.estado} type="text" placeholder="Ingrese el Rol" />
            </Form.Group>
            <div className="boton">
            <h5 align="center" >Agrega un usuario con el rol de administrador o usuario<br/> Actualiza información o elimina usuarios</h5>
            <Button variant="primary" type="submit" className="btn" >
                Agregar Usuario{''} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </Button>
            <Button variant="success" type="submit" className="btn" onClick={this.actualizar}>
                Actualizar{''}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
            </Button>
            </div>
  </Form>
  </div>
  <br/>
  <div className="break"></div>
  <div className="cont-form2">
      <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Editar | Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.usuarios.map(usuario => {
                return (
                    <tr key={usuario._id}>
                      
                      <td>{usuario.nombre} </td>
                      <td>{usuario.email} </td>
                      <td>{usuario.estado} </td>                 
                      <td>
                          <Button variant="light" onClick={() => this.editUser(usuario._id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                  </svg>
                          </Button>{''}
                          <Button variant="danger" onClick={() => this.deleteUser(usuario._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                  </svg>
                          </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
        </div>     
      </Container>
      </>
    )
  }
}
export default AgregarUsuario;