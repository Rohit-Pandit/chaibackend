import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/tea',(req,res)=>{
    const {name,price}=req.body;
    const newTea={id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).json(newTea);

})
// get all teas
app.get('/tea',(req,res)=>{
    res.status(200).json(teaData);
})

// get a tea by id
app.get('/tea/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const tea=teaData.find(t=>t.id===id);
    if(tea){
        res.status(200).json(tea);
    }
    else{
        res.status(404).json({message:"Tea not found"});
    }
});

app.delete('/tea/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const teaIndex=teaData.findIndex(t=>t.id===id); 
    if(teaIndex!==-1){
        const deletedTea=teaData.splice(teaIndex,1);
        res.status(200).send("Tea deleted successfully");
    }
    else{
        res.status(404).json({message:"Tea not found"});
    }
});

// update a tea by id
app.put('/tea/:id',(req,res)=>{
    const id=parseInt(req.params.id);       
    const {name,price}=req.body;
    const teaIndex=teaData.findIndex(t=>t.id===id);
    if(teaIndex!==-1){

        teaData[teaIndex]={id,name,price};
        res.status(200).json(teaData[teaIndex]);
    }
    else{
        res.status(404).json({message:"Tea not found"});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});