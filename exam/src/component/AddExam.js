import React,{useState,useContext} from 'react';
import axios from 'axios';
import {Context} from '../api/Context';
const AddExam = () => {
    const[exams,setExams]=useContext(Context);
    const[subject,setSubject] = useState('');
    const[date,setDate] = useState('');

    const updateSubject = (e) => {
        setSubject(e.target.value);
    };

    const updateDate = (e) => {
        setDate(e.target.value);
    };

    const addExam = (e) => {
        axios.post('http://localhost:3001/exams',{subject: subject,date: date})
        .then((response) => {
            let { exams } = {subject: subject,date: date};
            exams.push(response.data);
            // this.setState({exams,newExamModal: false});
        });
        // this.setState({filteredExams: []})
    }

    return(
        <form onSubmit={addExam}>
            <input type="text" subject="subject" onChange={updateSubject}/>
            <input type="date" name="date" onChange={updateDate}/>
            <button>Submit</button>
        </form>
    )
}
export default AddExam;

  