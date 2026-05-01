const express= require('express');
const app= express();
const authRoutes= require('./routes/authRoutes');
const aiRoutes= require('./routes/aiRoutes');

app.use(express.json());

const PORT= process.env.port || 3000;

app.use('/api/auth',require(authRoutes))
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});