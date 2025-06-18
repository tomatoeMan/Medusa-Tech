const express =require("express");
const app =express();
console.log(app);
const port=4011;
const path=require("path");
//const bodyParser=require("body-parser");

const nodemailer=require("nodemailer");
const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname,"css")));
app.use(express.static(path.join(__dirname,"img")));
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const cors=require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Admin:aAikybFeQPz9RCVG@welcome.ie3bi.mongodb.net/?retryWrites=true&w=majority&appName=Welcome";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let corsOptions = {
  origin : ["https://your-website-preview.co.za"],
   //origin : ["https://localhost:4011"],
    methods:["GET","POST"],
    allowedHeaders:["Content-Type","Authorization"],
};

const transporter=nodemailer.createTransport(
    {
       // host:"mail.your-website-preview.co.za",
        //server: "smtpauth.truehost.cloud",
        //Encryption:"TLS",
        //host: "patrick-hove-construction.co.za",
        //port:587,
        //secure:false,
        service:"gmail",
        auth:
        {
            user:"",
            pass:""
        },
        //rejectUnauthorized: false,
        //logger:true,
        //debug:true,
});


//origin : ["https://www.patrick-hove-construction.co.za/Patric_Hove's_Construction_Quote"],

let openWeb=0;
app.use(cors(corsOptions));

app.get("/",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"demo.html"));
    console.log("Home Page Sent");
  	openWeb++;
  	console.log("No:"+openWeb);
});

app.get("/Medusa_about",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"about.html"));
    console.log("about page");
    
});

app.get("/Medusa_services",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"services.html"));
    console.log("service page");
 
});
let cont=0;
app.get("/Medusa_contact",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"contact.html"));
    console.log("Contact page "+cont);
  	cont++;
});

app.listen(port,()=>
{
    console.log("Port:"+port+" is open")
});

app.post("/dataOut",async(req,res)=>
{
    try
    {
        let names=req.body.Names;
        let email=names[2];
        const info=await transporter.sendMail(
        {
                from:"Admin <tomatoes602@gmail.com>",
                to:email,
                subject:"Greetings from Medusa-Tech",
                html:"<label style='text-align:center'>Hello, thanks for taking a interest in my website.<br><br>I also have a business group if you would like to join<br><br><a style='width:100px;background-color:rgba(0, 255, 247, 0.47); border:1px solid black; border-radius:100px;height:40px;padding:5px;text-decoration:none;color:black;' href='https://web.facebook.com/share/g/1HvXimXoLi/'>Business Group</a></label><br>"
        });
        res.json(true)
    }
    catch(err)
    {
        res.json(false);
    }
});
let users=0;

app.post("/checkEm",async(req,res)=>
{
    try
    {
        await connect();
        let email=req.body.Email;
        let pass1=req.body.pass;
        let data=await collection.findOne({Email:email});
        console.log(email);
        if(data==null)
        {
            res.json("noEm");
        }
        else if(data.Pass!=pass1)
        {
            res.json("noPass");
        }
        else if(data.Pass==pass1)
        {
            let temp=[data,true];
            res.json(temp);
        }
        await client.close();
    }
    catch(err)
    {
        res.json(false);
    }
});
let database;
let collection;
async function connect()
{
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    database=await client.db("Medusa");
    collection=await database.collection("Clients");
}

app.post("/dataSend",async(req,res)=>
{
    try
    {
        await connect();
        let names=req.body.Names;
        let email=await collection.findOne({Email:names[2]});
        if(email==null)
        {
            let user=new Object();
            
                console.log("users signing up:"+users);
                users++;
                let id;
                

                let data=await collection.findOne({_id:"A1"});
                if(data==null)
                {
                    id="A1";
                    user=
                    {
                        _id:"A1",
                        Name:names[0],
                        Last:names[1],
                        Email:names[2],
                        Cell:names[3],
                        Pass:names[4]
                    }
                    collection.insertOne(user);
                }
                else
                {
                    let temp="";
                    let A="A";
                    for(let i=2;data!=null;i++)
                    {
                        let num=i.toString();
                        temp=A.concat(num);
                        data=await collection.findOne({_id:temp});
                    }
                    user=
                    {
                            _id:temp,
                            Name:names[0],
                            Last:names[1],
                            Email:names[2],
                            Cell:names[3],
                            Pass:names[4]
                    }
                    console.log(user._id);
                    await collection.insertOne(user);
                }
                //client.close();
                console.log(user);
                await client.close();
                res.json(true);
        }
        else
        {
            res.json("false");
        }
        
    }
    catch(err)
    {
        console.log(err);
        await client.close();
        res.json(false);
    }
    
});

app.post("/otp",async(req,res)=>
{
    
    try
    {
        let email=req.body.Email;
        console.log(email);
        let num=0;
        for(let i=0;i<6;i++)
        {
            if(i==0)
            {
                num=Math.floor(Math.random()*10);
                num=num.toString();
            }
            else
            {
                let temp=Math.floor(Math.random()*10);
                temp=temp.toString();
                num=num+temp;
            }
        }
        try
        {
            const info=await transporter.sendMail(
            {
                from:"'Admin' <tomatoes602@gmail.com>",
                to:email,
                subject:"Your OTP for Medusa Tech",
                html:"<label>"+num+"</label><br><br><a href='https://affiliates.olitt.com/idevaffiliate.php?id=272'>Build your own website here</a>"
            });
            res.json(num);
          	console.log("Sending "+num+" to "+email);
        }
        catch(err)
        {
            res.json(false);
            console.log(err);
          
        }
    }
    catch(err)
    {
        console.log(err)
        res.json(false);
    }
});

app.post("/user",async(req,res)=>
{
    
  try
    {
        let user=req.body.Person;
        const info=await transporter.sendMail(
        {
                from:"'Admin' <tomatoes602@gmail.com>",
                to:"tomatoes602@gmail.com",
                subject:"Web Client",
                html:user[0]+"<br>"+user[1]+"<br>"+user[2],
        });
        res.json(true);
    }
    catch(err)
    {
        res.json(false);
    }
});