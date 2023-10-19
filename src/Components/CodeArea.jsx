import React, { useState,useRef } from 'react'
import '../Styles/CodeArea.css'
import Stack from '../../node_modules/@mui/material/Stack';
import Button from '../../node_modules/@mui/material/Button';

const CodeArea = () => {

    const[read,setread]=useState(false);

    const txtarea = useRef();
    
    const [value, setValue] = useState('');

    function handleChange(event) {
        setValue(event.target.value);
      }

    const handelsave=()=>{
        if(txtarea.current.value===''){
            alert("Please enter code");
        }
        else{ 
            console.log('save button')
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
        console.log('lock unclock button')
        if(read===true){
            setread(false)
        }
        else{
            setread(true)
        }
    }

    const handleCopy=()=>{
        console.log("Copy button")
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
            <div className='code-btns'>
                <Stack spacing={2} direction="row">
                    <Button  variant="contained" size="large" onClick={handelsave}>Save</Button>
                    <Button variant="contained" size="large" onClick={handleCopy}>Copy</Button>
                    <Button variant="contained" size="large" color="error" onClick={handlelockunclock}>Lock/Unlock</Button>
                </Stack>
            </div>
            <textarea className="code-container" name="" id="" cols="200" rows="30" readOnly={read} ref={txtarea} onKeyDown={handlekeydown} onChange={handleChange} value={value}/>
        </div>
    </>
  )
}

export default CodeArea
