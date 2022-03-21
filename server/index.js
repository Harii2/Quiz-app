const express = require('express');
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dbPath = path.join(__dirname,'quizDatabase.db');
let db = null;

const app = express()
const  cors = require("cors");
const { response } = require('express');

app.use(cors())
app.use(express.json())

const initiliazeServer = async()=>{
    try{
        db= await open({filename:dbPath,driver:sqlite3.Database})
        app.listen(5000,()=>{
            console.log('server is running at http://localhost:5000/')
        })
    }
    catch(e){
        console.log(`DB Error:${e.message}`)
        process.exit(1)
    }
}

initiliazeServer();



app.get('/',(req,res)=>{
    res.send('Hello World from express')
})



//Authentication Token MiddleWare
const authenticateToken = (req,res,next)=>{
    //console.log(req.headers['authorization'])
    let jwtToken ;
    const authHeader = req.headers['authorization']
    if(authHeader !== undefined){
        jwtToken = authHeader.split(" ")[1];
    }
    if(jwtToken===undefined){
        res.status(401)
        res.send('Invalid JWT Token')
    }
    else{
        jwt.verify(jwtToken,'MY_SECRET_TOKEN',async(error,payload)=>{
            if(error){
                res.status(401)
                res.send('Invalid JWT Token')
            }
            else{
                next()
            }
        })
    }
}

//SignUp post method
app.post('/sign-up',async (req,res)=>{
    try{
        const {firstName,lastName,email,mobileNo,password} = req.body;
        const query = `SELECT * FROM user WHERE email='${email}';`;
        const id = await db.get(query);
        if(id===undefined){
            //Inserting Into DB
            const parsedPassword = await bcrypt.hash(password,10);
            const insertQuery = `INSERT INTO user(first_name,last_name,email,mobile_no,password) VALUES('${firstName}','${lastName}','${email}','${mobileNo}','${parsedPassword}');`;
            await db.run(insertQuery);
            res.send('Signed-in succesfully');
        }
        else{
            res.status(400);
            res.send('Email already exists')
        }
    } 
    catch(e){
        res.status(400)
        res.send(e)
        console.log(`ERROR : ${e.message}`)
    }
  
})

//Log-in
app.post('/log-in',async(req,res)=>{
    const {email,password} = req.body;
    const uniqueIdQuery = `SELECT * FROM user WHERE email = '${email}';`;
    const dbUser = await db.get(uniqueIdQuery);
    if(dbUser === undefined){
        const msg = '*No user existed with that id'
        res.status(400);
        res.send(msg)
    }
    else{
        const hashedPassword = dbUser.password;
        const isPasswordMatched = bcrypt.compare(password,hashedPassword)
        if(isPasswordMatched){
            const payload = {
                username:email 
            } 
            const jwtToken = jwt.sign(payload,'MY_SECRET_TOKEN')
            const {id} = dbUser
            res.status(200);
            const msg = 'Login succesfully'
            res.send({id,jwtToken,email,msg})
        }
        else{
            res.status(400);
            const msg = 'Invalid password'
            res.send(msg)
        }
    }
})


//Exam Questions 

app.get('/write-exam',(req,res)=>{
    const {topic,questions} = req.query;
    console.log(topic,questions)
    res.send('Exams is working...')
})


//post asked Question

app.post('/add-question',authenticateToken,async(req,res)=>{
   const {id,question,topic} = req.body 
   const insertQuestionQuery = `INSERT INTO questions(question,user_id,topics) VALUES('${question}',${id},'${topic}');`;
   await db.run(insertQuestionQuery);
   const msg = 'Question submited succesfully'
   res.send(msg);
})

//post anwser 

app.post('/post-answer',authenticateToken,async(req,res)=>{
    const {ans,user_id,answered_id,question_id} = req.body 
    console.log(ans,user_id,answered_id,question_id) 
    const insertAnswerquery = `INSERT INTO answers(answer,user_id,answered_id,question_id) VALUES('${ans}',${user_id},${answered_id},${question_id});`;
    await db.run(insertAnswerquery)
    res.send('succes')
})

//write-exam

app.get('/write-exam/exam',authenticateToken,async(req,res)=>{
    const getQuery = `SELECT * FROM MCQS;`;
    const data = await db.all(getQuery);
    res.send({data})
})

//Get Questions
app.get('/home/get-questions',authenticateToken,async (req,res)=>{
    //console.log(res)
    const {id} =  req.query
    const getQuestionsQuery = `SELECT * FROM questions LEFT JOIN answers ON questions.id = answers.question_id ; `
    const vals = await db.all(getQuestionsQuery)
    res.send({vals})
})