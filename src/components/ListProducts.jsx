import React, { Fragment, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/ListProducts.css";
import imageNotFound from "../assets/img/undraw_Web_search_re_efla.svg";
import { getProducts, deleteProduct } from "./ListProductsService.js";
import Swal from "sweetalert2";
import FormControl from "react-bootstrap/FormControl";


function ListProducts() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const borrarProducto = (id) => {
    Swal.fire({
      title: "¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then((res) => {
            const productosActuales = productos.filter(
              (producto) => producto._id !== id
            );
            setProductos(productosActuales);
            Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
          })
          .catch((err) => {
            Swal.fire("Error", "El producto no ha sido eliminado", "error");
          });
      }
    });
  };

  return (
    <>
    
            
    <div align="center" > <h1 class="text-primary p-1"> Productos</h1> </div>       
    <Fragment>  
      <Container className="mb-2 mt-0">
      <div className="cont-form1">
      <FormControl
              type="search"
              placeholder="Buscar"
              className="mr-4"
              aria-label="Search"
            />
            
            
            <br />
        <Row>
          <div className="col-12">
            <Link to="/product/new">
              <button className=" btn-lg btn-warning text-white" >Agregar Producto {''} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg></button>
            </Link>
          </div>
        </Row>
        <Row>
          {productos.map((producto, index) => {
            return (
              <div className="col-md-4" key={producto._id}>
                <div className="card mt-4">
                  <div className="product align-items-center p-2 text-center">
                    <img
                      src={producto.url ? producto.url : imageNotFound}
                      alt={producto.title}
                      className="rounded"
                      width="320"
                      height="160"
                    />
                    <h5>{`${index + 1}. ${producto.title}`}</h5>
                    <div className="mt-2 info">
                      <span className="text2 d-block">
                        <b>Cantidad:</b> {producto.cantity}
                      </span>
                    </div>
                    <div className="cost mt-1 text-dark">
                      <span>$ {producto.price}</span>
                    </div>
                   {
                   /* // <div
                   //   className={  producto.disponible  ? "alert alert-success" : "alert alert-danger" }
                   //   role="alert"
                  // >{producto.disponible ? "Disponible" : "No disponible"}
                   // </div> */
                  }
                  </div>
                  
                  <div className="row justify-content-center" >
                    <div className="col-5" >
                      <Link to={`/product/${producto._id}`}>
                        <div className="p-2 edit text-center mt-7 cursor bg-primary text-white">
                          <span>
                            <i className="fas fa-pen" ></i>{' Editar'}
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-4" >
                      <div
                        className="p-2 delete text-center text-white mt-7 cursor"
                        onClick={(e) => borrarProducto(producto._id)} 
                      >
                        <span className="text-uppercase">
                          <i className="far fa-trash-alt"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
        </div>
      </Container>
    </Fragment>
    </>
  );
}

export default ListProducts;
