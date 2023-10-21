import React, { useState,useRef } from 'react'
import '../Styles/CodeArea.css' 
import Stack from '../../node_modules/@mui/material/Stack';
import Button from '../../node_modules/@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CodeArea = () => {

    const[read,setread]=useState(false); //Using to manage the state for readOnly property 

    const txtarea = useRef(); //Using to get reference for textarea
    
    const [value, setValue] = useState(''); //Using to manage the state to get the immidiate value of textarea

    const[btn,setlcbtn]=useState(<LockOpenIcon/>) //Using to manage the state for Icon of lock/unlock button

    //Method that set the state for value
    function handleChange(event) {
        setValue(event.target.value);
      }
    
    //Method that handles the save operation 
    const handelsave=()=>{
        if(txtarea.current.value===''){
            alert("Please enter code");
        }
        else{ 
           
            const blob = new Blob([txtarea.current.value]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            if(window.confirm("do you want to save the code")){
                link.download = "code.txt";
                link.click();
                alert("your file is saved");
            }
        }
    }
    //Method that handles Lock/Unlock operation
    const handlelockunclock=()=>{
       
        if(read===true){
            setread(false)
            setlcbtn(<LockOpenIcon/>)
        }
        else{
            setread(true)
            setlcbtn(<LockIcon/>)
        }
    }

    //Method that handles copy operation
    const handleCopy=()=>{
       
        txtarea.current.select();
        if(txtarea.current.value!==''){
            navigator.clipboard.writeText(txtarea.current.value);
            alert('code copied')
        }
        else{
            alert('please write some code first')
        }
    }

    const handlekeydown=(event)=>{
        if (event.key === 'Enter') {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
      
            // Insert tab character at the beginning of the new line
            setValue(
              value.substring(0, start) + '\n  ' + value.substring(end),
              () => {
                event.target.selectionStart = event.target.selectionEnd = start + 1;
              }
            );
          }
    }

  return (
    <>
        <div className='code-editor-container'>
            
            <div className='heading'>
                <h1>AS-Code</h1>
            </div>

            <div className='code-btns'>
                <Stack spacing={2} direction="row">
                    <div className='tooltip'>
                        <Button  variant="contained" size="large" onClick={handelsave}><SaveIcon/></Button>
                        <span className='save-tooltip'>Save</span>
                    </div >
                    <div className='tooltip'>
                        <Button variant="contained" size="large" onClick={handleCopy} ><ContentCopyIcon/></Button>
                        <span className='copy-tooltip'>Copy</span>
                    </div>
                    <div className='tooltip'>
                        <Button variant="contained" size="large" color="error" onClick={handlelockunclock}>{btn}</Button>
                        <span className='lock-unlock-tooltip'>lock/unlock button</span>
                    </div>
                </Stack>
            </div>
            
            <textarea className="code-container" name="" id="" cols="200" rows="30" readOnly={read} ref={txtarea} onKeyDown={handlekeydown} onChange={handleChange} value={value}/>
        
        </div>
    </>
  )
}

export default CodeArea
