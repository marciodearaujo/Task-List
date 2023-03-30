import './styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FaArrowLeft} from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Details=({history})=>{
     const [title,setTitle]=useState('');  
     const [description,setDescription]=useState(''); 
     const [date,setDate]=useState('');  
     const notifySave = () => toast("tarefa salva com sucesso!");
     const notifyRemove = () => toast("tarefa removida com sucesso!");

     const params=useParams();
     const id=params.id;

     useEffect(()=>{
        getTask()
     },[])

     const getTask=async ()=>{
        const task=await axios.get("http://localhost:8888/todo/"+id);
        setTitle(task.data.title);
        setDescription(task.data.description);
        const formattedDate=new Date(task.data.date);
        setDate(formattedDate);
        console.log(task);
     }

     const removeTask=async()=>{
        await axios.delete("http://localhost:8888/todo/"+id);
        notifyRemove();
        history.push('/');

     }

     const updateTask=async ()=>{
        
        await axios.put("http://localhost:8888/todo/"+id,{
            title,
            description,
            date
        })
        notifySave();
    }
     
    


    return(
        <div className="container-details">
            <ToastContainer />
            <div className="subcontainer-details">
                <Link to="/">
                    <div className="voltar">
                        <FaArrowLeft/>
                        <h2>Voltar</h2>
                    </div>
                </Link>
                <div className="textos">
                    <input value={title}placeholder='Tarefa' onChange={(txt)=>setTitle(txt.target.value)}/>
                    <textarea value={description} placeholder="Descrição" onChange={(txt)=>setDescription(txt.target.value)}/>
                    <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(txt)=>setDate(txt)} />
                </div>
                <div className="botoes">
                    <button onClick={updateTask}>Salvar</button>
                    <button onClick={removeTask}>Excluir</button>
                </div>
            </div>
        </div>

    );
}


export default Details;