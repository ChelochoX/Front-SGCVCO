import { useState } from "react";
import axios from "axios";
import "../EstilosComponentes/EstiloFormularioCobranza.css";

const urlDatosClientes = "https://tuvendedor.up.railway.app/api/cliente/datos";
const urlFacturasPendientes =
  "https://tuvendedor.up.railway.app/api/cliente/factura/pagada/";

function FormularioCobranza() {
  const [criterioBusqueda, SetcriterioBusqueda] = useState("");
  const [valorBusqueda, SetvalorBusqueda] = useState("");
  const [datosClientes, SetdatosClientes] = useState([]);
  const [codigoCliente, SetcodigoCliente] = useState("");
  const [nroFacturaPendiente, SetnroFacturaPendiente] = useState([]);

  {
    /*Funcion para Obtener Datos de Clientes*/
  }
  const handleBuscarDatosCliente = async (e) => {
    e.preventDefault();
    console.log("Valor de criterioBusqueda:", criterioBusqueda);
    console.log("Valor de valorBusqueda:", valorBusqueda);

    {
      /*Aqui Validamos los Criterios de Busqueda con los Valores de Busqueda*/
    }
    const req = {
      cedula: criterioBusqueda === "1" ? valorBusqueda : "",
      nombre_apellido: criterioBusqueda === "2" ? valorBusqueda : "",
      direccion: criterioBusqueda === "3" ? valorBusqueda : "",
      criteriobusqueda: criterioBusqueda,
    };

    {
      /*Solicitamos los datos del cliente para mostrar en el listado*/
    }
    try {
      const result = await axios.post(urlDatosClientes, req);
      SetdatosClientes(result.data);
      console.log(datosClientes);
    } catch (error) {
      console.error("Ocurrio Error al Solicitar datos del Cliente:", error);
      console.log("Hola mundo");
    }
  };

  const handleSeleccionCodigoCliente = (valor) => {
    SetcodigoCliente(valor);
    console.log(codigoCliente);
    handleBuscarFacturasPendienrtes(codigoCliente);
  };

  {
    /*Funcion para Obtener Datos de Facturas Pendienes*/
  }
  const handleBuscarFacturasPendienrtes = async (codigo_cliente) => {
    try {
      const url = urlFacturasPendientes + codigo_cliente;
      console.log("url del Get", url);

      const result = await axios.get(url);
      SetnroFacturaPendiente(result.data);
      console.log(nroFacturaPendiente);
    } catch (error) {
      console.error(
        "Ocurrio Error al Solicitar datos de Facturas Pendientes:",
        error
      );
    }
  };
  return (
    <div className="container mt-5">
      <h5>Seleccionar la Opcion de Busqueda</h5>

      <div className="row ">
        <div className="col-md-6">
          <form className="column">
            <div className="col-md-8 mb-1">
              <input
                type="radio"
                id="cedula"
                name="opcionRadio"
                value="1"
                onChange={(e) => SetcriterioBusqueda(e.target.value)}
                defaultChecked
              />
              <label htmlFor="cedula" className="custom-label">
                Cedula
              </label>
            </div>
            <div className="col-md-8 mb-1">
              <input
                type="radio"
                id="nombreApellido"
                name="opcionRadio"
                value="2"
                onChange={(e) => SetcriterioBusqueda(e.target.value)}
              />
              <label htmlFor="nombreApellido" className="custom-label">
                Nombre o Apellido
              </label>
            </div>
            <div className="col-md-8 mb-1">
              <input
                type="radio"
                id="direccion"
                name="opcionRadio"
                value="3"
                onChange={(e) => SetcriterioBusqueda(e.target.value)}
              />
              <label htmlFor="direccion" className="custom-label">
                Direccion
              </label>
            </div>
            <div className="col-md-8 mt-3 mb-3">
              <input
                className="form-control"
                type="text"
                id="valorbusqueda"
                name="valorbusqueda"
                placeholder="Ingrese el Valor de la Busqueda"
                value={valorBusqueda}
                onChange={(e) => SetvalorBusqueda(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={handleBuscarDatosCliente}
            >
              Buscar Cliente
            </button>
          </form>
          <div className="col-md-8 mb-3">
            <h5>Listado de CLientes</h5>
            <ul className="list-group lista-clientes">
              {datosClientes.map((valor, index) => {
                const ObtenerCodigoCliente = () => {
                  handleSeleccionCodigoCliente(valor.COD_CLIENTE);
                };
                return (
                  <li
                    className="list-group-item"
                    key={index}
                    onClick={ObtenerCodigoCliente}
                  >
                    {valor.CI} {"  "} {valor.NOM_APE}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Factura Pendientes de Pago</h5>
          <ul className="list-group lista-facturas">
            {nroFacturaPendiente.map((valor, index) => {
              const ObtenerNroFacturaPendiente = () => {
                /*handleSeleccionCodigoCliente(valor.COD_CLIENTE);*/
              };
              return (
                <li
                  className="list-group-item"
                  key={index}
                  onClick={ObtenerNroFacturaPendiente}
                >
                  {valor.DOCUMENTO_FACTURACION}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FormularioCobranza;
