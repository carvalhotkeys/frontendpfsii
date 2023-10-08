import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useState } from 'react';
import { urlBase } from "../utilitarios/definicoes";
import CaixaSelecao from "../componentes/CaixaSelecao";


function NovoEvento(props) {
  const [validado, setValidado] = useState(false);
  const [eventos, setEventos] = useState({
    codigo: '',
    nome: '',
    data: '',
    hora: '',
    descricao: '',
    banda: '',
    musica: ''
  });

  function manipulaMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEventos({ ...eventos, [id]: valor });
  }

  function reloadPage() {
    window.location.reload();
  }


  function gravarEvento() {
    fetch(urlBase + "/evento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "codigo": eventos.codigo,
        "nome": eventos.nome,
        "data": eventos.data,
        "hora": eventos.hora,
        "descricao": eventos.descricao,
        "banda": bandaSelecionada.idBanda,
        "musica": musicaSelecionada.id,
      })
    })
    .then(response => {
      if (response.ok) {
        alert("Evento cadastrado com sucesso!");
        
      } else {
        throw new Error("Erro ao cadastrar o evento.");
        
      }
    })
    .catch(error => {
      alert("Erro ao cadastrar o evento: " + error.message);
      
    });
  }

  const [bandaSelecionada, setBandaSelecionada] = useState({});
  const [musicaSelecionada, setMusicaSelecionada] = useState({});

  const mostrarConteudoLista = () => {
    alert(JSON.stringify(bandaSelecionada));
  };

  return (
    <Container className="formulario">
      <Form noValidate validated={validado} onSubmit={gravarEvento} className="mb-5">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Codigo: </Form.Label>
              <Form.Control type="number" onChange={manipulaMudanca} value={eventos.codigo} id="codigo" placeholder="informe o id do evento." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o id do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Titulo do Evento: </Form.Label>
              <Form.Control type="text" value={eventos.nome} onChange={manipulaMudanca} id="nome" placeholder="informe o titulo do evento." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o titulo do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data do Evento:</Form.Label>
              <Form.Control type="date" value={eventos.data} onChange={manipulaMudanca} id="data" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o data do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Hora do Evento:</Form.Label>
              <Form.Control type="time" value={eventos.hora} onChange={manipulaMudanca} id="hora" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe a hora do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Descrição do Evento: </Form.Label>
              <Form.Control as="textarea" value={eventos.descricao} onChange={manipulaMudanca} id="descricao" placeholder="Por favor informe a descrição do evento!" style={{ height: '250px' }} />
              <Form.Control.Feedback type='invalid'>
                Por favor informe a descrição do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Selecione a Banda: </Form.Label>
              <CaixaSelecao enderecoFonteDados="http://localhost:3040/banda" campoChave="idBanda" campoExibicao="nomeBanda" funcaoSelecao={setBandaSelecionada} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Selecione a Musicas: </Form.Label>
              <CaixaSelecao enderecoFonteDados="http://localhost:3040/musica" campoChave="id" campoExibicao="nome" funcaoSelecao={setMusicaSelecionada} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="button" variant="secondary" onClick={() => { props.exibirTabela(true) }} className="mx-3">Voltar</Button>
            <Button type="reset" variant="danger" className="mx-3">Cancelar</Button>
            <Button type="submit" variant="success" className="mx-3">Concluir</Button>
            <Button onClick={mostrarConteudoLista}>
              ?
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default NovoEvento;

