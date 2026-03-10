import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'



function Noteitem(props) {

  const context=useContext(noteContext);
  const {deleteNote}=context;
    const{note,updateNote}=props;
  return (
    
    <div className='col-md-3 '>
     <div className="card mx-1 my-1" >
 
  <div className="card-body"style={{width: "11rem",Height:"200px",backgroundColor:"grey"}}>
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
   <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
   <i className="fa-solid fa-pen mx-2" onClick={()=>{
    updateNote(details);}}></i>
  </div>
</div>
     
    </div>
  )
}

export default Noteitem
