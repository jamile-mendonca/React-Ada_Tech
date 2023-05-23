import { useEffect, useState } from "react"
import MeuComponente from "./components/MeuComponent"
import MeuContador from "./components/MeuContador"
import MinhaLista from "./components/MinhaLista"
import style from './assets/button.module.css'

const minhaLista2 = [
  {id:'1', value: 'Fruta'},
  {id:'2', value: 'Legume'},
  {id:'3', value: 'Carne'},
 ]

 const tarefas = [
  {id:'1', title:'minha primeira tarefa'},
  {id:'2', title:'minha segunda tarefa'},
  {id:'3', title:'minha terceira tarefa'},
  {id:'4', title:'minha quarta tarefa'},
 ]

function App() {

const [produtos, setProdutos] = useState(minhaLista2)
const [pesquisa, setPesquisa] = useState('')

useEffect(
  () => {
    if(pesquisa) {
    const novaLista = minhaLista2.filter((item) => {
     return item.value.toLowerCase().includes(pesquisa.toLowerCase())
    })
    setProdutos(novaLista)
  } else {
    setProdutos(minhaLista2)
  }
  },
  [pesquisa]
)

const [tarefas, setTarefas] = useState([])

useEffect(() => {
  async function buscarDados(){
const resultado = await fetch('https://jsonplaceholder.typicode.com/todos')
const resultadoFinal = await resultado.json()
return resultadoFinal
  }

buscarDados().then(res => setTarefas(res))

}, [])

    return (
      <div>
  <h1>Olá mundo, React</h1>
  <MeuComponente></MeuComponente>

  <MeuBotao conteudo='me clique'/>
  <MeuBotao conteudo='depois aqui'/>
  <MeuBotao conteudo='e por fim aqui'/>

  <MeuContador/>

  <h1>Listas no React</h1>

 
  <MinhaLista/>

  <div>
    <h1> Efeitos Colaterais</h1>
    <input value={pesquisa}
    onChange={(e) => setPesquisa(e.target.value)}
    placeholder="pesquise aqui" />
    {produtos.map((item) => {
      return (
        <div key={item.id}>  
          <h4>{item.value}</h4>
          </div> 
      )
    })}
  </div>
<div>
<h1>Buscando Dados</h1>
<ol>

{tarefas.map((tarefa) => {
  return (
    <div>
    <li key={tarefa.id}>{tarefa.title}
    {tarefa.completed ? ' - Tarefa Concluída' : null}
    </li>

    </div>
  )
})}

</ol>
</div>

  </div>
 )
 }

function MeuBotao(props) {
  return(
  <button>{props.conteudo}</button>
  )
}



export default App
