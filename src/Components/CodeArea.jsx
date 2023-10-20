import React, { useState,useRef } from 'react'
import '../Styles/CodeArea.css'
import Stack from '../../node_modules/@mui/material/Stack';
import Button from '../../node_modules/@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CodeArea = () => {

    const[read,setread]=useState(false);

    const txtarea = useRef();
    
    const [value, setValue] = useState('');

    const[btn,setlcbtn]=useState(<LockOpenIcon/>)

    function handleChange(event) {
        setValue(event.target.value);
      }

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

    const handleCopy=()=>{
       
        txtarea.current.select();
        navigator.clipboard.writeText(txtarea.current.value);
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
                    <Button  variant="contained" size="large" onClick={handelsave}><SaveIcon/></Button>
                    <Button variant="contained" size="large" onClick={handleCopy}><ContentCopyIcon/></Button>
                    <Button variant="contained" size="large" color="error" onClick={handlelockunclock}>{btn}</Button>
                </Stack>
            </div>
            <textarea className="code-container" name="" id="" cols="200" rows="30" readOnly={read} ref={txtarea} onKeyDown={handlekeydown} onChange={handleChange} value={value}/>
        </div>
    </>
  )
}

export default CodeArea
