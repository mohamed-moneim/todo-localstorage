import Image from "next/image";
"use client"; // This is a client component 👈🏽
import React, { use, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { redirect } from 'next/navigation'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { todo } from "node:test";
export default function Home() {
    const [answer, setAnswer] = useState(false);
    var   [name, setName] = useState<string|null>(null)
    const [open, setOpen] =  useState(false);
    const [items, setItems] =  useState<string[][]|null>([]);
    useEffect(() => {
      const storedName = localStorage.getItem("name");
      if (!storedName) {
      redirect(`/`)  
      }
        const todos = localStorage.getItem("todos")!=null?JSON.parse(localStorage.getItem("todos") as string):[]
        let result:String[][]= [];
        todos.forEach((todo:string[])=>{
          let  j:string[]= [todo[0],todo[1],todo[2]]
          result.push(j);
        });
        setItems(todos);
      }, []);
    useEffect(() => {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setName(storedName)
      }
    }, []); 
        async function handleSubmit(e :React.ChangeEvent<any>){
          "user Server";
          e.preventDefault()
          const formURL = e.target.action
          var  i = items;
          let  j:string[] = [e.target[0].value,e.target[1].value,e.target[2].value]
          i.push(j);
           setItems(i);
          localStorage.setItem("todos",JSON.stringify(items));

  }
  async function removeTodo(id) {  
    const newTodos = items?.filter((todo) => todo[0] !== id) || []; // Create a new array
  
    setItems(newTodos); // Update state
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Update localStorage
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="body">    
          <img onClick={()=>{setOpen(!open)}} className='add' src='/img/add.png'/>
          
          <div
            className="modal show"
            style={open==true?{display: 'block'}:{display: 'none', position: 'initial' }}
          >
          <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Add Task
                </Modal.Title>
              </Modal.Header>
      
              <Modal.Body>
              <Form className="nopdng" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="black">User Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter Task title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="black">Task Desciption</Form.Label>
              <Form.Control className="textarea" as="textarea" name="desc" type="text" placeholder="Enter Task description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control name="date" type="date" placeholder="Enter  date" />
            </Form.Group>
            <Button className="btn btn-primary text-right" variant="primary" type="submit">
              save Changes
            </Button>
            <Button  onClick={()=>{setOpen(!open)}} className="btn btn-secondary text-right" variant="secondary">
              close
            </Button>
            </Form>
              </Modal.Body>
            </Modal.Dialog>
            </div>
      
          <div className="col-lg-8 col-md-12  center">
          <h2 className="text-center">Welcome {name}</h2>
          <div className="col-lg-12">
            {items.map(function(todo,i){
      return(
            <div key={i} className="todo">
            <img className="trash" src='/img/trash.png' onClick={async ()=>{removeTodo(todo[0])}} />
              <h4>{todo[0]}</h4>
              <p>{todo[1]}</p>
              <p>{todo[2]}</p>
              </div>)
            })}
            </div>
      </div>
      </div>
                   </main>
    </div>
  );
}
