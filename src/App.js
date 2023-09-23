import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaHome from './telas/TelaHome';
import TelaConsulta from './telas/TelaConsulta';
import TelaContato from './telas/TelaContato';
import BarraBusca from './componentes/BarraBusca';
import CaixaSelecao from './componentes/CaixaSelecao';
import TelaCadastroIntegrante from './telas/TelaCadastroIntegrante';
import TelaCadastroMusica from './telas/TelaCadastroMusica';
import TelaCadastroFuncao from './telas/TelaCadastroFuncao';
import TelaCadastroMaterial from './telas/TelaCadastroMaterial';
import { useState } from 'react';
                              // dados fake
const listaClientes = [
  {
    cpf:"111.111.111-11",
    nome:"Joao Marco Antonio Lourente"
  },
  {
    cpf:"222.222.222-22",
    nome:"Cristiano Parangaba"
  },
  {
    cpf:"333.333.333.33",
    nome:"Marilda Fernanda"
  },
  {
    cpf:"444.444.444.44",
    nome:"Josefina Soares Silva"
  }
]
                                          //dados real : http://localhost:3040/integrante ou material ou funcao
function App() {
  const [clienteSelecionado, setClienteSElecionado] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  return (
                                                                      /// SO TROCAR O FINAL PARA ACESSAR O BANCO material/integrante/funcao  NO ENDERECO DA FONTE
    <div>
      <BrowserRouter>
        <Routes>                                                                                 
          <Route path='/' exact element={<TelaHome/>}/>
          <Route path='/home' exact element={<TelaHome/>}/>
          <Route path='/integrantes' exact element={<TelaCadastroIntegrante/>}/>
          <Route path='/funcoes' exact element={<TelaCadastroFuncao/>}/>
          <Route path='/musicas' exact element={<TelaCadastroMusica/>}/>
          <Route path='/materiais' exact element={<TelaCadastroMaterial/>}/>
          <Route path='/contato' exact element={<TelaContato/>}/>
          <Route path='/consultas' exact element={<TelaConsulta/>}/>
          <Route path='/buscar' exact element={<BarraBusca placeHolder={'informe o nome do cliente'} dados={listaClientes} campoChave={"cpf"} campoBusca={"nome"} funcaoSelecao={setClienteSElecionado}  valor={""}/>}/>
          <Route path='/caixa' exact element={<CaixaSelecao enderecoFonteDados="https://fakestoreapi.com/products" campoChave="id" campoExibicao="title" funcaoSelecao={setProdutoSelecionado} />}/>
        </Routes>                      
      </BrowserRouter>
    </div>
  );
}

export default App;
