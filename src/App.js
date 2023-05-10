import { FiSearch } from 'react-icons/fi';
import './estilo.css';
import { React, useState }  from 'react'
import api from './services/api'

export const App = () => {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handlepesquisar(){

    if (input === ''){
      alert("CEP inválido!")
      return
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Opsss algo deu errado");
      setInput("");
    }
  }

  return (
    <div className='container'>
      <h1 className='titulo'> Buscador  CEP</h1>
      <div className='input-cep'>
        <input type='text' placeholder='Digite o CEP...' value={input} onChange={(e) => setInput(e.target.value)  }/> 
          {/* target.value = pegando o valor digitado e mandando para a useState */}

        <button className='pesquisar' onClick={handlepesquisar}>
          <FiSearch size={25} color='#000'/>
          
        </button>
      </div>

    {Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2> CEP: {cep.cep} </h2>
          <span> Endereço: {cep.logradouro} </span>
          <span> Complemento: {cep.complemento} </span>
          <span> Bairro: {cep.bairro} </span>
          <span> Cidade: {cep.localidade} - {cep.uf} </span>
        </main>
    )}


    </div>
  )
}
export default App;
