import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './components/Input';
import {List} from './components/List';

function App() {
  const data = localStorage.getItem('todo') === null ? []:JSON.parse(localStorage.getItem('todo'));
  const [item, setItem] = useState(data);

  const onDeleted = () => {
    const data = localStorage.getItem('todo') === null ? []:JSON.parse(localStorage.getItem('todo'));
    console.log(data)
    setItem(data)
  }

  return (
    <div className="App">
      <Input onSubmit={ e => {
        setItem([...item, e])
      }}/>
      <List items={item} onDeleted={onDeleted}/>
    </div>
  );
}

export default App;
