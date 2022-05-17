const express = require('express');

const PORT = process.env.PORT || 5000

const app = express();


app.get('/weather', (req,res)=>{
    res.json({ express: req.query.city})
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});