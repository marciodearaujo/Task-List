import './styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck } from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home=()=>{
     const [title,setTitle]=useState('');  
     const [description,setDescription]=useState(''); 
     const [date,setDate]=useState(''); 
     const [tasksBD,setTasksBD]=useState([]);
     const notify=()=>toast("Tarefa salva com sucesso!")
     
    
     useEffect(()=>{
        getTasks();
     },[]);

     const saveTask= async ()=>{
        const task = await axios.post("http://localhost:8888/todo",{
            title,
            description,
            date
        });
        getTasks();
        notify();
     } 

     const getTasks=async()=>{
        const tasks = await axios.get("http://localhost:8888/todo");
        setTasksBD(tasks.data);
        console.log(tasks);
     }

     const updateTask=async (id,status)=>{
        
        await axios.put("http://localhost:8888/todo/"+id,{
            status:!status,
        })
        getTasks();
    }


     return(
        <div className="container-home">
            <ToastContainer />
            <div className="subcontainer-home">
                <div className="container-left">
                    <h1>Task-list</h1>
                    <p>Junte-se a mais de meio milhão de usuários e gerencie sua rotina da melhor forma.  </p>
                    <div className="container-form">
                        <input placeholder='tarefa' onChange={(txt)=>setTitle(txt.target.value)}/>
                        <textarea placeholder='descrição'onChange={(txt)=>setDescription(txt.target.value)}/>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(txt)=>setDate(txt)} />
                        <button onClick={saveTask}>salvar</button>
                    </div>
                </div>
                    <ul className="container-right">
                        {tasksBD.map(item=>{   
                            const formattedDate= moment(item.date).format("DD/MM/yyyy");
                            return(
                            <li key={item._id}>
                                <div>
                                    <Link to={"/Details/"+item._id}>
                                        <h2 style={item.status? {} : {textDecoration:'line-through'} }>{item.title}</h2>
                                        <h3>{formattedDate}</h3>
                                        <h3>{item.description}</h3>
                                    </Link>
                                </div>  
                                <button onClick={()=>updateTask(item._id,item.status)}>
                                    <FaCheck size={22} color={"#1a1a1a"}/>
                                </button>
                            </li>  
                            ) 
                             })} 
                    </ul>
            </div>
        </div>
     )
}

export default Home;