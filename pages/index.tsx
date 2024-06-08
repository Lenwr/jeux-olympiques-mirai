
import React, {FormEvent, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Checkbox, Datepicker, Label, TextInput} from "flowbite-react";


export default function Home() {
  let [date] = useState<string>(new Date().toISOString().split('T')[0]);
  const [name, setName] = useState('');
  const [chassis, setChassis] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = () => toast("Formulaire envoyé");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true);
    const form = {
      date,
      name,
      chassis
    }
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const content = await response.json();
    {notify()}
    setLoading(false);
    date=''
    setName('')
    setChassis('')
  }
  return (
    <main

    >
      <div className="container mx-auto p-4">
            <span className="py-4 text-center">
                  <h1> Formulaire d' enregistrement Toyota JO</h1>
            </span>
        <form className="flex max-w-md flex-col gap-4 py-4 " onSubmit={handleSubmit}>
          <div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nom" value="Nom et prénoms"/>
            </div>
            <TextInput id="nom" name="name" value={name} onChange={e => setName(e.target.value)} type="text"
                       placeholder="votre nom" className="rounded" required/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Chassis" value="Chassis"/>
            </div>
            <TextInput id="chassis" name="chassis" value={chassis} onChange={e => setChassis(e.target.value)}
                       type="text" placeholder="Numéro de chassis" required/>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember"/>
            <Label htmlFor="remember">Les informations sont exactes</Label>
          </div>
          <Button type="submit"
                  disabled={loading}
                  className="bg-[#1da1f2]">
            {loading ? "Envoi en cours..." : "Envoyer"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
          </Button>
        </form>
      </div>

      <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </main>
  );
}
