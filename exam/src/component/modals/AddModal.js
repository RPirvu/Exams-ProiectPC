import React,{useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {Context} from '../../api/Context';

const Modal = () => {

  const [open, setOpen] = React.useState(false);
  const { examData, examFilter } = useContext(Context);
  const [stateExam, setStateExam] = examData;
  const [stateDataFilter, setStateDataFilter] = examFilter;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const[subject,setSubject] = useState('');
  const[date,setDate] = useState('');

  const updateSubject = (e) => {
      setSubject(e.target.value);
  };

  const updateDate = (e) => {
      setDate(e.target.value);
  };

  const addExam = (e) => {
      axios.post('http://localhost:3001/exams',{subject , date})
      .then((response) => {
          const exam = {subject: subject,date: date};
          const newExams = [...stateExam,exam];
          setStateExam(newExams);
      });
      setOpen(false);
      refreshExams()
      
  }
  const refreshExams = async () => {
    await axios.get('http://localhost:3001/exams')
    .then(res => {
        setStateExam(res.data);
    });
    window.location.reload();
  }
  

  return (
    <div>
      <Button variant="outlined" color="White" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="subject"
            type="text"
            onChange={updateSubject}
            fullWidth
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="date" 
            type="date"
            onChange={updateDate}
            fullWidth
            
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addExam} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;