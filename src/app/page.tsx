import Image from "next/image";
"use client"; // This is a client component 👈🏽
import React, { use, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { redirect } from 'next/navigation'
import './App.css';

export default function Home() {
    const [answer, setAnswer] = useState(true);
    var   [name, setName] = useState<string|null>(null)
    useEffect(() => {
      const storedName = localStorage.getItem("name");
      if (storedName) {
      }
    }, []);
        async function handleSubmit(e:React.ChangeEvent<any>){
          "user Server";
          e.preventDefault()

          const formURL = e.target.action
          console.log(e)
          setName(e.target[0].value);
          localStorage.setItem("name",e.target[0].value);
          redirect(`/todos`) // Navigate to the new post page

  }
  async function  stopload(){
    const time =  setTimeout(async() =>{      
       setAnswer(false)
     },3000)
     }
   stopload()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="App"> 
           {answer===true?
             <img className='logo' src='/img/applogo.png' />
             :
            name==null?
             <Form onSubmit={handleSubmit} className="col-md-8 center">
               <h1 className="text-center">Welcome to To Do List App</h1>
               <h3 className="text-center">Please Enter your name</h3>
             <Form.Group className="mb-3 frm" controlId="formBasicEmail">
               <Form.Label>User Name</Form.Label>
               <Form.Control name="name" type="text" placeholder="Enter your name" />
             </Form.Group>
             <Button className="sbmt" variant="primary" type="submit">
               Submit
             </Button>
           </Form> : null
}</div> 
                   </main>
    </div>
  );
}
