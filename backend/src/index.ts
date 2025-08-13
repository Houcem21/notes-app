import PocketBase from 'pocketbase';
import express, {Application, Request, Response} from 'express';
import cors from 'cors';

const app : Application = express();
const port : number = 3000;
const pb = new PocketBase('http://0.0.0.0:8090');

app.use(cors())

const userData = await pb.collection('users').authWithPassword('test@example.com', '12345678');
console.log(userData);


// C operation
// const record = await pb.collection('notes').create({
//     title: "Einkaufslist",
//     content: "Milch und Brot"
// })

// R operation
// const record = await pb.collection('notes').getOne('s4j4ebi36i67z74', {
//     expand: 'title,content,drawingData',
// });
// console.log(record)

// U operation
// const record = await pb.collection('notes').update('s4j4ebi36i67z74', {
//     content: 'Käse und Fleisch',
// });
// console.log(record)

// D operation
// await pb.collection('notes').delete('s4j4ebi36i67z74');

// set up express server

app.use(express.json());

app.get('/', async (req: Request,res: Response) => {
    try {
        res.send('This is the homepage, pick a route <br> /r /c /d /u')
    } catch (error) {
        res.status(500).json({ error: 'Failed to find home' });
    }
})

app.get('/r', async (req: Request,res: Response) => {
    try {
        const records = await pb.collection('notes').getFullList({
            sort: '-created',
        });
        console.log(records)
        res.status(200).send(records)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read all' });
    }
})

app.get('/r/:id', async (req: Request,res: Response) => {
    try {
        const record = await pb.collection('notes').getOne(req.params.id, {
            expand: 'title,content,drawingData',
        });
        console.log(record)
        res.status(200).send(record)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read' });
    }
})

app.post('/c', async (req: Request,res: Response) => {
    try {
        const {title, content} = req.body;
        const record = await pb.collection('notes').create({title: title ,content: content});

        res.status(201).send(record)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
})

app.put('/u/:id', async (req: Request,res: Response) => {
    try {
        const {title, content} = req.body;
        const record = await pb.collection('notes').update(req.params.id ,{title: title ,content: content});

        res.status(201).send(record)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
})

app.delete('/d/:id', async (req: Request,res: Response) => {
    try {
        await pb.collection('notes').delete(req.params.id);
        res.status(201).send(req.params)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})