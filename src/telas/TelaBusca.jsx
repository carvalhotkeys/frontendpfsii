import Paginas from '../templates/Paginas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/home.css'
import BarraBusca from '../componentes/BarraBusca';
import { useState } from 'react';

const listaClientes = [
    {
        cpf: "111.111.111-11",
        nome: "Heyder da Silva"
    },
    {
        cpf: "333.333.333.33",
        nome: "Roger Fernando"
    },
    {
        cpf: "222.222.222-22",
        nome: "Cristiano Parangaba"
    },
    {
        cpf: "444.444.444.44",
        nome: "Thiago Aurelio"
    }
]


function TelaBusca(props) {
    const [clienteSelecionado, setClienteSElecionado] = useState({});
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    return (
        <Paginas>
            <Container>
                <Row>
                    <BarraBusca placeHolder={'informe o nome do integrante para visualizar o evento em que vai tocar'} dados={listaClientes} campoChave={"cpf"} campoBusca={"nome"} funcaoSelecao={setClienteSElecionado} valor={""} />
                </Row>
            </Container>
            <Container className='home'>
                <Row>
                    <Col>
                        <Row className='my-3'>
                            <Col>
                                <Card.Title className='text-center'>Próximos Eventos</Card.Title>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 27/06/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='my-3'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 01/07/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 04/07/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Paginas>
    );
}

export default TelaBusca;