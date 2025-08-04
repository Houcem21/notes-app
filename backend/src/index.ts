// import PocketBase from 'pocketbase';

// const pb = new PocketBase('http://127.0.0.1:8090');

// const userData = await pb.collection('users').authWithPassword('test@example.com', '12345678');

// console.log(userData);


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