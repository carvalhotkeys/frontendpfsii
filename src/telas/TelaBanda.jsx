import React, { useState } from 'react';
import Paginas from '../templates/Paginas';
import TabelaBanda from '../tabela/TabelaBanda'; // Certifique-se de importar a tabela de bandas correta
import TelaFormularioBanda from '../formularios/TelaFormularioBanda'; // Certifique-se de importar o formulário correto

function TelaBanda(props) {
  const [exibirTabela, setExibirTabela] = useState(false);
  const [bandas, setBandas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [bandaEdicao, setBandaEdicao] = useState({
    idBanda: "",
    nomeBanda: "",
    listaIntegrante: [],
    listaMusica: ""
  });

  function editarBanda(banda) {
    setModoEdicao(true);
    setBandaEdicao(banda);
    setExibirTabela(false);
  }

  return (
    <Paginas>
      <h3 className='text-center'>Cadastro de Banda</h3>
      {
        exibirTabela ?
          <TabelaBanda 
            listaBandas={bandas}
            setListaBandas={setBandas}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            banda={bandaEdicao}
            setExibirTabela={setExibirTabela} />
          :
          <TelaFormularioBanda
            listaBandas={bandas}
            setListaBandas={setBandas}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            banda={bandaEdicao}
            setExibirTabela={setExibirTabela}
          />
      }
    </Paginas>
  );
}

export default TelaBanda;
