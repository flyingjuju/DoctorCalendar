const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path')


app.get('/',(req,res)=>{
    res.status(200).send('ok')
})

app.listen(PORT, console.log(`Server listening on port ${PORT}`));