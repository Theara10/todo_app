import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './components/Input';
import {List} from './components/List';

function App() {
  const data = localStorage.getItem('todo') === null ? []:JSON.parse(localStorage.getItem('todo'));
  const [item, setItem] = useState(data);

  const onDeleted = () => {
    const items = localStorage.getItem('todo') === null ? []:JSON.parse(localStorage.getItem('todo'));
    setItem(items)
  }

  return (
    <div className="App">
      <Input onSubmit={ async e => {
        console.log(e)
        setItem([...item, e])
      }}/>
      <List items={item} onDeleted={onDeleted}/>
    </div>
  );
}

export default App;
