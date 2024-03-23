// nomanAndRohan
// K501ZzdxOqqLRBRX
const express = require("express")
const app = express();

const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())

const { query } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://nomanAndRohan:K501ZzdxOqqLRBRX@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run(){
    try{
        const allServiceCollection = client.db('nomanandrohan').collection('services');
        
        app.get('/allservices', async(req,res)=>{
            const query = {}
            const result = await allServiceCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/services/:id', async(req,res)=> {
            const id = req.params.id
            const query = {serviceId : id}
            const result = await allServiceCollection.find(query).toArray();
            res.send(result)
        })
    }catch{
        console.log("database not connected");
    }
  }

  
run().catch(console.log)





app.get('/', (req, res) => {
    res.send('api is running')
})


app.listen(port, () => {
    console.log(`api is running on port ${port}`)
})