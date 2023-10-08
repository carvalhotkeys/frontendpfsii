import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { urlBase } from "../utilitarios/definicoes";
import CaixaSelecao from '../componentes/CaixaSelecao';
import { Button, Table, Form } from 'react-bootstrap';


function TelaBanda(props) {
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [listaIntegrante, setListaIntegrante] = useState([]);
    const [nomeBanda, setNomeBanda] = useState([]);

    function gravarBanda() {
        fetch(urlBase + "/banda", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "idBanda": 0,
                "nomeBanda": nomeBanda,
                "listaIntegrante": listaIntegrante,
                "listaMusica": ""
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Banda cadastrada com sucesso!");
                    // Limpe os campos ou faça outra ação após o sucesso
                } else {
                    throw new Error("Erro ao cadastrar a banda.");
                }
            })
            .catch(error => {
                alert("Erro ao cadastrar a banda: " + error.message);
            });
    }


    const adicionarIntegrante = () => {
        const cpfExistente = listaIntegrante.some(item => item.cpf === produtoSelecionado.cpf);

        if (!cpfExistente) {
            const item = {
                cpf: produtoSelecionado.cpf,
                nome: produtoSelecionado.nome,
                endereco: produtoSelecionado.endereco,
                bairro: produtoSelecionado.bairro,
                cidade: produtoSelecionado.cidade,
                uf: produtoSelecionado.uf,
                telefone: produtoSelecionado.telefone,
                email: produtoSelecionado.email,
                funcaoid: produtoSelecionado.funcaoid,
                funcaoNome: produtoSelecionado.funcaoNome,
            };
            setListaIntegrante([...listaIntegrante, item]);
        } else {
            // CPF já existe na lista, exiba uma mensagem de erro ou lide com isso de outra forma
            alert("CPF ou ID já existe na lista");
        }
    };

    const limparTabela = () => {
        setListaIntegrante([]);
    };

    const pegaNomeBanda = (e) => {
        const novoNomeBanda = e.target.value;
        setNomeBanda(novoNomeBanda);
    };

    const mostrarConteudoLista = () => {
        alert(JSON.stringify(nomeBanda)); //nomeBanda  //listaIntegrante teste
    };

    return (

        <Container>
            <Form onSubmit={gravarBanda}>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nomeBanda" >Nome da Banda:</Form.Label>
                        <Form.Control type="text" id="nomeBanda" placeholder="Informe o nome da banda" value={nomeBanda} onChange={pegaNomeBanda} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor informe seu cpf!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Selecione o Integrante:</Form.Label>
                        <CaixaSelecao enderecoFonteDados="http://localhost:3040/integrante" campoChave="funcaoid" campoExibicao="nome" funcaoSelecao={setProdutoSelecionado} />
                    </Col>
                    <Col>
                        <h5 className='text-center'>Informações Integrante</h5>
                        <Table striped bordered hover variant="secondary">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Instrumento</th>
                                    <th>Endereço</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{produtoSelecionado.funcaoid}</td>
                                    <td>{produtoSelecionado.cpf}</td>
                                    <td>{produtoSelecionado.nome}</td>
                                    <td>{produtoSelecionado.funcaoNome}</td>
                                    <th>{produtoSelecionado.endereco}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Button onClick={adicionarIntegrante}  >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                                <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z" />
                            </svg>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <h3 className='text-center'>Banda:</h3>
                    <Table striped bordered hover variant="secondary">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Instrumento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaIntegrante.map((item, indice) => (
                                    <tr key={indice}>
                                        <td>{item.funcaoid}</td>
                                        <td>{item.cpf}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.funcaoNome}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Button type="button" variant="secondary" onClick={() => { props.setExibirTabela(true) }} className="mx-3">Voltar</Button>
                            <Button variant="secondary" onClick={limparTabela}>Cancelar Banda</Button>
                            <Button type="submit" variant="success">Confirmar Banda</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={mostrarConteudoLista}>
                                ?
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Container>

    );
}

export default TelaBanda;
