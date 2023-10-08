import React, { useEffect, useState } from 'react';
import { Table, Row, Container, Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { urlBase } from '../utilitarios/definicoes';
import BarraBusca from '../componentes/BarraBusca';

export default function TabelaBandas(props) {
  const [termoBusca, setTermoBusca] = useState(''); // Adicionei um estado para rastrear o termo de busca

  useEffect(() => {
    // Chama a função de filtragem quando o componente é montado
    filtrarBandas(termoBusca); // Passei o termo de busca para a função de filtragem
  }, [termoBusca]); // Coloquei termoBusca como dependência para que a filtragem seja atualizada sempre que o termo de busca mudar

  function excluirBanda(idBanda) {
    if (window.confirm('Ao excluir a banda você desvincula todos os integrantes dela. Você tem certeza que deseja fazer isso?')) {
      const listaAtualizada = props.listaBandas.filter((banda) => banda.idBanda !== idBanda);
      props.setListaBandas(listaAtualizada);
      apagarBanda(idBanda);
    }
  }

  function filtrarBandas(termoBusca) {
    fetch(urlBase + `/banda/consultar?termo=${termoBusca}`, { method: 'GET' })
      .then((resposta) => resposta.json())
      .then((listaBandas) => {
        if (Array.isArray(listaBandas)) {
          props.setListaBandas(listaBandas);
        }
      });
  }

  function apagarBanda(idBanda) {
    fetch(urlBase + '/banda', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idBanda: idBanda,
      }),
    })
      .then((resposta) => {
        if (resposta.ok) return resposta.json();
      })
      .then((banda) => {
        alert('BANDA EXCLUÍDA COM SUCESSO!!');
      })
      .catch((erro) => {
        alert('ERRO INESPERADO!', +erro.message);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <BarraBusca
            placeHolder="Pesquisar banda"
            dados={props.listaBandas} // Passa a lista de bandas como dados
            campoChave="idBanda" // Campo chave da banda
            campoBusca="nomeBanda" // Campo de busca na banda (nome da banda)
            funcaoSelecao={(bandaSelecionada) => {
              // Ação a ser executada ao selecionar uma banda (pode ser vazia ou personalizada)
            }}
            onChange={(e) => setTermoBusca(e.target.value)} // Atualiza o termo de busca com o valor da barra de busca
          />
        </Col>
        <Col>
          <Button onClick={() => props.setExibirTabela(false)}>Cadastrar</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Banda</th>
              <th>Nome Banda</th>
              <th>Nomes Integrantes</th>
              <th>Telefone</th>
              <th>Exclusão</th>
            </tr>
          </thead>
          <tbody>
            {props.listaBandas?.map((banda) => {
              return (
                <tr key={banda.idBanda}>
                  <td>{banda.idBanda}</td>
                  <td>{banda.nomeBanda}</td>
                  <td>
                    {banda.listaIntegrante.map((integrante) => (
                      <div key={integrante.cpf}>{integrante.nome}</div>
                    ))}
                  </td>
                  <td>
                    {banda.listaIntegrante.map((integrante) => (
                      <div key={integrante.cpf}>{integrante.cpf}</div>
                    ))}
                  </td>
                  <td>
                    <Button
                      onClick={() => excluirBanda(banda.idBanda)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
