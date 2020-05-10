import React,{useState,createContext,useEffect} from 'react';
import axios from 'axios';

export const Context = createContext();

export const ExamProvider = (props) => {

    const [ exams,setExams ] = useState([]);

    const refreshExams = async () =>{
        await axios.get('http://localhost:3001/exams')
        .then(res => {
            setExams(res.data);
        });
    }

    useEffect( () => {
        refreshExams();
    },[])

    return(
        
        <Context.Provider value={[exams,setExams]}>
            {props.children}
        </Context.Provider>
        
    );

}


 