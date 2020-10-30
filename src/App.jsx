import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import {MY_DATA} from './data'

class App extends React.Component {
  state = {
    data: MY_DATA,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      lastName:"",
      materno:"",
      rfc: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var cont = 0;
    var dataArray = this.state.data;
    dataArray.map((registro) => {
      if (dato.id == registro.id) {
        dataArray[cont].name = dato.name;
        dataArray[cont].rfc = dato.rfc;
        dataArray[cont].lastName = dato.lastName;
        dataArray[cont].materno = dato.materno;

      }
      cont++;
    });
    this.setState({ data: dataArray, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var dataArray = this.state.data;
      dataArray.map((registro) => {
        if (dato.id == registro.id) {
          dataArray.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: dataArray, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th> 
                <th>Ap. Paterno</th> 
                <th>Ap. Materno</th>
                <th>RFC</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.lastName}</td>
                  <td>{dato.materno}</td>
                  <td>{dato.rfc}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Modificar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
        </Container>

        {/* modal forms */}

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Personal</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                name: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ap. Paterno: 
              </label>
              <input
                className="form-control"
                name="lastname"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.lastName}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ap. Materno: 
              </label>
              <input
                className="form-control"
                name="materno"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.materno}
              />
            </FormGroup>            
            <FormGroup>
              <label>
                RFC: 
              </label>
              <input
                className="form-control"
                name="rfc"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.rfc}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Nuevo personal:</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                name: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Ap. Paterno: 
              </label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ap. Materno: 
              </label>
              <input
                className="form-control"
                name="materno"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                RFC: 
              </label>
              <input
                className="form-control"
                name="rfc"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
