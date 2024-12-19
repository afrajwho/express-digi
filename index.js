import express from 'express';

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

let teaData = []
let nextId = 1

// Create a new tea
app.post('/tea', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

// Get all teas
app.get('/tea', (req, res) => {
    res.status(200).send(teaData);
})

// Get a specific tea by ID
app.get('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === id);
    if(tea){
        res.status(200).send(tea);
    }else{
        res.status(404).send('Tea not found');
    }
})

// Update a tea
app.put('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, price} = req.body;
    const tea = teaData.find(tea => tea.id === id);
    if(tea){
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    }else{
        res.status(404).send('Tea not found');
    }
})

// Delete a tea
app.delete('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = teaData.findIndex(tea => tea.id === id);
    if(index !== -1){
        teaData.splice(index, 1);
        res.status(204).send('deleted successfully');
    }else{
        res.status(404).send('Tea not found');
    }
})