import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct, setProduct } from "./ListProductsService";
import "../styles/Product.css";
import imageNotFound from "../assets/img/undraw_Web_search_re_efla.svg";
import { Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const Product = () => {
  let { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        if (res.data.disponible === undefined) res.data.disponible = false;
        setProducto(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (event) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value,
    });
  };

  const guardar = (event) => {
    event.preventDefault();
    if (producto._id === undefined) producto._id = "new";
    if (producto.cantity < 0) {
      Swal.fire({
        icon: "warning",
        title: "El precio debe ser mayor a 0",
      });
    } else {
      setProduct(producto)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Producto guardado",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1>Producto</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-dark bg-light mb-2">
              <div className="card-body">
                <Form onSubmit={guardar}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Nombre"
                      onChange={handleInputChange}
                      value={producto.title}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Precio"
                      onChange={handleInputChange}
                      value={producto.price}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="cantity"
                      name="cantity"
                      placeholder="Cantidad"
                      onChange={handleInputChange}
                      value={producto.cantity}
                    />
                  </div>
                 
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      name="url"
                      placeholder="Url Imagen"
                      onChange={handleInputChange}
                      value={producto.url}
                    />
                  </div>
                  {/* <div className="input-group mb-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      
                    </label>
                    <select className="form-select" id="inputGroupSelect01">
                      <option value="1">Uno</option>
                      <option value="2">Dos</option>
                      <option value="3">Tres</option>
                    </select>
                  </div> */}
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      placeholder="Descripcion"
                      onChange={handleInputChange}
                      value={producto.description}
                    ></textarea>
                  </div>
                  {/*
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="disponible"
                      name="disponible"
                      onChange={handleInputChange}
                      value={producto.disponible}
                    />
                    <label class="form-check-label" for="exampleCheck1">
                      {producto.disponible ? "Desactivar" : "Activar"}
                    </label>
                  </div>
                  */}
                  <button className="btn btn-success btn-block" type="submit">
                    Guardar 
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-dark bg-light text-center">
              <img
                src={producto.url ? producto.url : imageNotFound}
                className="card-img-top"
                alt={producto.title}
              />
              <div className="card-body">
                <h3>
                  <b>Nombre:</b> {producto.title}
                </h3>
                <p>
                  <b>Precio:</b> ${producto.price}
                </p>
                <p>
                  <b>Cantidad:</b> {producto.cantity}
                </p>
                <p>
                  <b>Descripcion:</b> {producto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
