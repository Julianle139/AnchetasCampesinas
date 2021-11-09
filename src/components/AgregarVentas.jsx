import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Component} from 'react'
import Table from "react-bootstrap/Table"
import swal from 'sweetalert'
import Swal from "sweetalert2"
import "../styles/AgregarVentas.css"

class AgregarVentas extends Component{
    constructor(props) {
        super(props);
        this.state = {
          producto: '',
          cliente: '',
          idCliente:'',
          vendedor:'',
          precio:'',
          cantidad: '',
          ventas: [],
          textBuscar: '',
          productoBackup:[],
          _id: ''
        };
      
      this.handleChange = this.handleChange.bind(this);
       this.addSell = this.addSell.bind(this);
    }
    
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      }

      addSell(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`https://anchetascampesinasbackend.herokuapp.com/api/ventas/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              producto: this.state.producto,
              cliente: this.state.cliente,
              idCliente:this.state.idCliente,
              vendedor: this.state.vendedor,
              precio: this.state.precio,
              cantidad: this.state.cantidad
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              this.setState({_id: '',producto: '', cliente: '',idCliente:'',vendedor:'',precio:'',cantidad:''});
              this.fetchTasks();
            });
            swal({
              title: "Venta Actualizada",
              icon: "success",
              button: true,
            });
            
        } 
          else {
          fetch('https://anchetascampesinasbackend.herokuapp.com/api/ventas', {
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
                title: "Venta Agregada",
                icon: "success",
                button: true,
              });
              this.setState({producto: '', cliente: '',idCliente:'',vendedor:'',precio:'',cantidad:''});
              this.fetchTasks();
          })
          .catch(err => console.error(err));
        }
    
      }
      editSell(id) {
        fetch(`https://anchetascampesinasbackend.herokuapp.com/api/ventas/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            producto: data.producto,
            cliente: data.cliente,
            idCliente:data.idCliente,
            vendedor: data.vendedor,
            precio: data.precio,
            cantidad: data.cantidad,
            _id: data._id
          });
        });
      }

      deleteSell(id) {
        if(Swal.fire({
          title: '¿Esta seguro?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '!Si, eliminarla!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminada!',
              'success'
            )
          }
        })) {
          fetch(`https://anchetascampesinasbackend.herokuapp.com/api/ventas/${id}`, {
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
      filter(event){
        var text = event.target.value
        const data = this.state.productoBackup
        const newData = data.filter(function(item){
          const itemDataClien = item.cliente.toUpperCase()
          const itemDataVend = item.vendedor.toUpperCase()
          const itemIDCliente=item.idCliente    
          const itemID=item._id.toUpperCase()
          const campo = itemDataClien+" " + itemDataVend+ " "+itemIDCliente+" "+itemID
          const textData = text.toUpperCase()
          return campo.indexOf(textData) > -1
        })
      this.setState({
        ventas: newData,
        text: text,
      })
      }
     actualizar(){
      swal({
        title: "Edite la venta primero y luego actualizala",
        icon: "error",
      });
    
    }

    componentDidMount() {
      this.fetchTasks();      
    }
    
      fetchTasks() {
        fetch(`https://anchetascampesinasbackend.herokuapp.com/api/ventas`)
          .then(res => res.json())
          .then(data => {
            this.setState({ventas: data,
            productoBackup:data});
            console.log(this.state.ventas);
            
          });
      }
    
    render(){
      return(
        <>
        <div align="center" > <h2> Ventas</h2> </div>
          <br />
          <Container>
          <Form onSubmit={this.addSell}>
              <div className="cont-fatherr">
                <div><h5 align="center" > Control de las ventas en<br/> Anchetas Campesinas </h5></div>
               <div className="cont-form">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Producto</Form.Label>
                      <Form.Control name="producto" onChange={this.handleChange} value={this.state.producto}  type="text" placeholder="Ingrese producto" />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Cliente</Form.Label>
                      <Form.Control name="cliente" onChange={this.handleChange} value={this.state.cliente} type="text" placeholder="Ingrese cliente" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>ID Ciente</Form.Label>
                      <Form.Control name="idCliente" onChange={this.handleChange} value={this.state.idCliente} type="text" placeholder="Ingrese identificador cliente" />
                  </Form.Group>

      
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Vendedor</Form.Label>
                      <Form.Control name="vendedor" onChange={this.handleChange} value={this.state.vendedor} type="text" placeholder="¿Quien hizo la venta?" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control name="precio" onChange={this.handleChange} value={this.state.precio} type="text" placeholder="Ingrese precio" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control name="cantidad" onChange={this.handleChange} value={this.state.cantidad} type="text" placeholder="Ingrese cantidad vendida" />
                  </Form.Group>
              </div>
              </div>           
  </Form>
  <div align="center" >
              <Button variant="primary" type="submit" className="justify-content center" >
                  Agregar Venta {' '} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                  </svg>
              </Button>
              <Button variant="success"  className="justify-content center" onClick={this.actualizar} >
                  Actualizar {' '}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
              </Button>
              </div>
  <br />
  <div className="break">
  
  </div>
            <div className="search">    
                <div className="icon-search"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></div>
            <input class="form-control"  placeholder="Buscar por cliente, ID cliente o id venta" value={this.state.text} onChange={(text) => this.filter(text)}  />
            </div>
  <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cliente</th>
                <th>ID Cliente</th>
                <th>Vendedor</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Editar | Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ventas.map(venta => {
               return (
                  <tr key={venta._id}>
                    
                    <td>{venta.producto} </td>
                    <td>{venta.cliente} </td>
                    <td>{venta.idCliente} </td>
                    <td>{venta.vendedor} </td>
                    <td>{venta.precio} </td>
                    <td>{venta.cantidad} </td>                   
                    <td>
                        <Button variant="light" onClick={() => this.editSell(venta._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                        </Button>{' '}
                        <Button variant="danger" onClick={() => this.deleteSell(venta._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                        </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
  </Container>
  </>
      )
  }
  }


export default AgregarVentas;