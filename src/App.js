import React,{useState,useEffect} from "react"
import Axios from "axios"
import Images from './components/Images'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import './App.css';

require('dotenv').config()

function App() {

 const[images,setImages]=useState([]);
 const[change,setChange]=useState(false);
 const[timer,setTimer]=useState(10)
 const [current,setCurrent]=useState(1)
 const[loading,setloading]=useState(false)
  useEffect(() =>{
    setloading(true)
  },[]);

useEffect(()=>{
  if(change){
            if(timer>0)
            setTimeout(()=>{setTimer(timer-1)},1000)
            else{setTimer(0)}
            }
})

useEffect(()=>{
  setloading(true)
  setChange(false)
  setTimer(10)
},[timer===0])

useEffect(()=>{
  if(loading)
  {
  setCurrent(Math.floor(Math.random()*10))
  getrequest();
  setloading(false)
  }
},[loading])

const getrequest = async()=>{
      await Axios.get(`${process.env.REACT_APP_WEB_KEY}${process.env.REACT_APP_CLIENT_KEY}&&page=${current}&&per_page=15`).then(async(response)=>{
      const data=await response.data;
      setImages(data);
    })
  }
  return (
    <div>
    <Navbar>
    <Navbar.Brand>Gallery</Navbar.Brand>
    <Button size="lg"className="ml-auto" onClick={()=>{setChange(true); console.log(change)}} variant="secondary">Timer</Button>
    <span className="timer">{timer}</span>
  </Navbar>
    {images.map((image) => (
    <Images alt={image.alt_description} url={image.urls.small}/>
    ))}
    </div>
  );
}

export default App;
