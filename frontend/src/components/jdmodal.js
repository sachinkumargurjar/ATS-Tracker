import React, {useState} from 'react';
import {sendjdToBackend} from "./api/endpoints";

const Modal = ({ setOpen, setData, setCheck }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () =>{
    
    sendjdToBackend(description,setCheck).then((res) => {
      console.log(res);
      setData(res);
      setOpen(false);
    });
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ border: '2px solid black', borderRadius: '10px', padding: '20px', width: '300px', position: 'relative', backgroundColor: 'white' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} onClick={()=>setOpen(false)}>
          X
        </div>
        <h3>Add Role</h3>
        <div>
          <label htmlFor="role">Role*</label>
          <input
            type="text"
            id="role"
            name="role"
            style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', width: '100%', boxSizing: 'border-box', fontWeight: 'bold', overflowY: 'auto', maxHeight: '100px' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jobDescription">Job Description*</label>
          <input
            type="text"
            id="jobDescription"
            name="jobDescription"
            style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', width: '100%', boxSizing: 'border-box', fontWeight: 'lighter' }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button style={{ flex: 1, marginRight: '10px', borderRadius: '10px' }} onClick={()=>setOpen(false)}>Cancel</button>
          <button style={{ flex: 1, backgroundColor: 'blue', color: 'white', borderRadius: '10px' }} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
