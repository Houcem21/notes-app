import PocketBase from 'pocketbase';
import express, {Application, Request, Response} from 'express';

const app : Application = express();
const port : number = 3000;
const pb = new PocketBase('http://127.0.0.1:8090');

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

app.get('/note-made', async (req: Request,res: Response) => {
    try {
        const record = await pb.collection('notes').create({title: "Einkaufslist",content: "Milch und Brot"})
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})