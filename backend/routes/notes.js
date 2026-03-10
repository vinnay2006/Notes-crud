const express=require('express');
const router=express.Router();
var fetchuser=require('../middleware/fetchuser');
const Notes=require("../models/Notes")
const {body,validationResult}=require('express-validator');
// creating a  get request for api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
try {
 const notes=await Notes.find({user:req.user.id})
 res.json(notes);   
}  catch(error){
    console.error(error.message);
 res.status(500).json({ error: "Some errors have taken place" });

}

});
// creating a post request for api/notes/addnote
router.post('/addnote', fetchuser,[    body('title').notEmpty().withMessage('Username is required'),
    body('description').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')], async (req, res) => {
  const {title,description,tag}=req.body;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
try {
const note=new Notes({
    tag,description,title,user:req.user.id
    })
    const savedNote=await note.save();
    res.json(savedNote);    
} catch(error){
    console.error(error.message);
    res.status(500).send("some errors have taken place ")
}
});
// creating a  put request for api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const {title,description,tag}=req.body;
 const newNote={};
 if(title){newNote.title=title};
 if(description){newNote.description=description};
  if(tag){newNote.tag=tag};
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("not found")}
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
});
// creating a  delete request for api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

 
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("not found")}
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  note=await Notes.findByIdAndDelete(req.params.id);
  res.json({"success":"Note has been deleted",note:note});
});
module.exports=router