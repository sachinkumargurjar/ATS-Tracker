import logo from "./logo.svg";
import "./App.css";
import FileUploader from "./components/fileupload";
import Recommend from "./components/recommend";
import Navbar from "./components/navbar";
import Modal from "./components/jdmodal";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);

  return (
    <>
      {(!check) && <FileUploader setOpen={setOpen} />}
      {open && (
        <Modal setCheck={setCheck} setData={setData} setOpen={setOpen} />
      )}
      {check && <Recommend data={data}/>}
    </>
  );
}

export default App;
