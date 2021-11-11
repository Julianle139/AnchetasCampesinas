import React, { Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import "../styles/Ventas.css";

function ListProducts() {
  let productos = [
    {
     },
  ];

  return (
    <Fragment>
      <Container className="mb-2 mt-0 ">
        <Row>
          {productos.map((producto, index) => {
            return (
              <div className="col-md-4" key={producto.id}>
                <div className="card mt-3">
                  <div className="product align-items-center p-2 text-center">
                    <img
                      src={producto.imagen}
                      alt=""
                      className="rounded"
                      width="160"
                      height="160"
                    />
                    <h5>{`${index + 1}. ${producto.nombre}`}</h5>
                    {/**
                      <div className="mt-3 info">
                        <span className="text1 d-block">SUbtitulo</span>
                        <span className="text1"> otro</span>
                      </div>
                       */}
                    <div className="cost mt-3 text-dark ">
                      <span>${producto.precio}</span>
                    </div>
                  </div>
                  <div className="p-2 edit text-center text-white mt-2 cursor">
                    <span className="text-uppercase">                  
                      Vender
                    </span>
                  </div>
                  <div className="p-3 edit text-center text-white mt-3 cursor">
                    <span className="text-uppercase">
                      
                      Total vendidos: --
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
}

export default ListProducts;
