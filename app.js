const express = require('express');
const app = express();
app.use(express.json());

const PRODUCTS = [
    { id: 1, title: "Apple iPhone", date: "2023-01-01", price: 1000 },
    { id: 2, title: "Samsung Galaxy", date: "2023-02-15", price: 900 },
    { id: 3, title: "Google Pixel", date: "2023-03-20", price: 850 },
    { id: 4, title: "Nokia 3310", date: "2000-10-10", price: 50 },
    { id: 5, title: "Sony Xperia", date: "2023-01-30", price: 800 }
];

app.post('/products/search', (req, res) => {
    let {
        title = '',
        filter_items = [],
        order = 'asc',
        filter = 'id',
        offset = 0,
        limit = 10
    } = req.body;

    let result = PRODUCTS;

    
    if (title) {
        result = result.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    }

   
    if (filter_items.length > 0) {
        result = result.filter(p => filter_items.includes(p.id));
    }

    
    result.sort((a, b) => {
        if (filter === 'date') {
            return (order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
        } else {
            return (order === 'asc' ? a[filter] - b[filter] : b[filter] - a[filter]);
        }
    });

   
    result = result.slice(offset, offset + limit);

    res.json(result);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
