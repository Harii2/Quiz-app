import Header from "../../header";
//import axios from "axios";
import React, { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import './index.css'
import axios from "axios";

 const Questions = [{id:0,q:'___ is object oriented language',a:'oops',b:'sqlite',c:'networking',d:'Debuging',is_seen:false,is_answered:false},{id:1,q:'Whaat is name',a:1,b:2,c:3,d:4,ans:'a',is_seen:false,is_answered:false},{id:2,q:'ur world',a:189,b:265,c:398,d:498,ans:'b',is_seen:false,is_answered:false},{id:3,q:"Hello",a:1,b:3,c:8,d:10,ans:'c',is_seen:false,is_answered:false},{id:4,q:'world',a:3,b:'k',c:'df',d:'k',ans:'d',is_seen:false,is_answered:false}];

//let NewQuestions = [{id:0,q:'___ is object oriented language',a:'oops',b:'sqlite',c:'networking',d:'Debuging',is_seen:false,is_answered:false}];

let NewQuestions = []

function Timer(props) {
   const {submitBtnClicked,isTimedOut,range} = props 
   const secs = range*60
   const [count, setCount] = useState(secs);
    
   let time = useRef()
    
    useEffect(() => {
      let timer =  setTimeout(() => {
      setCount((count) => count - 1);
    }, 1000);
    if(count <1){
        isTimedOut(time.current) 
    }
    time.current = timer
    return () => clearTimeout(time.current)
    }, [count]);

    const clicked = ()=>{
        submitBtnClicked(time.current) 
    }

    const minutes = ()=>{ 
        if(count/60 <10){
            return `0${Math.floor(count/60)}`
        }
        return Math.floor(count/60)
    }

    const seconds = ()=>{
        if(count%60 <10){
            return `0${count%60}`
        }
        return count%60
    }
    let colorBg = ''
    if (count < secs/2){
         colorBg = 'red-bg'
    }
    else{
        colorBg = 'green-bg'
    }

    return  (
            <div className='timer-btn-bg'>
             <h1 className= {colorBg}> {minutes()}:{seconds()} </h1>
             <button onClick={clicked} className="questions-submit-btn">Submit Exam</button>
            </div>
    )
  } 





const Button = (props)=>{
      const {BtnNoClicked,each}= props 
     
      const {id,is_answered,is_seen} = each 
      const greenBg = is_answered ? 'green-bg' : null 
      const redBg = (is_seen === true &&is_answered === false) ? 'red-bg' : null
    const  BtnClicked=()=>{
          BtnNoClicked(id)
      }
      return(
           <button key={each.id} onClick={BtnClicked} type='button' className= {`btn-question ${greenBg} ${redBg}`}>{each.id}</button>
      )
}

function Exam() {
    const id = localStorage.getItem('id')
    const jwtToken = localStorage.getItem('jwtToken')
    const headers = {'Authorization':`Bearer ${jwtToken}`}
    let NewQuestions = []
    async function getData(){
        let id =1;
       await axios.get('http://localhost:5000/write-exam/exam',{headers})
        .then(res => {
             const {data} = res
            //console.log(data.data)
            for (let each of data.data){
                const {question,a,b,c,d,ans} = each 
                const q = question
                let  newData = {id,q,a,b,c,d,ans,is_seen:false,is_answered:false}
                id += 1;
               // console.log(newData)
                NewQuestions.push(newData)
            }
          id=1;  
        })
        console.log(NewQuestions)
        return NewQuestions 
    }
    getData()

    
    //const [Questions,setQ] = useState(NewQuestions)
    
    const [BtnContent,setBtnContent] = useState('Save and Next')
    const [currAns,setCurrAns] = useState(null)
    const [answersArray,setAnswersArray] = useState([]) 
 
    const navigate = useNavigate()
    const range = parseInt(localStorage.getItem('range'))
    const topic = parseInt(localStorage.getItem('topic')) 

    

    
   // const [Questions,setQ] = useState(NewQuestions)
    const [question,setQuestion] = useState(Questions[0])
     
    const isTimedOut = (time)=>{
        clearInterval(time)
        let finalScore = 0;
        for(let each of answersArray){
            if(each.userAns === each.ans){
                finalScore += 1;
            }
        }
        alert(`Time out and Your score is ${finalScore}/${Questions.length}`)
        navigate('/dash-board')
        
    }

    const submitBtnClicked = (time) =>{
        clearInterval(time)
        let finalScore = 0;
        alert('Are you sure for submitting all questions')
        for(let each of answersArray){
            if(each.userAns === each.ans){
                finalScore += 1;
            }
        }
        alert(`Your score is ${finalScore}/${Questions.length}`)
        navigate('/dash-board')
    }
    

    const NextBtnClicked = ()=>{

        if (question.is_answered){
            const updateAnswers = answersArray.find(each =>each.id === question.id) 
            
            if(updateAnswers !== undefined){
                const index = answersArray.findIndex(each => each.id === question.id)
                answersArray.splice(index,1)
                const userAnswers = {'id':question.id,'userAns':currAns,'ans':question.ans}
                answersArray.push(userAnswers) 
            }
            else{
                const userAnswers = {'id':question.id,'userAns':currAns,'ans':question.ans}
                answersArray.push(userAnswers)
            }
        } 

        
        const nextQuestion =  Questions.find(each => each.is_answered===false && each.id >  question.id) 
        const nxt = () =>{
            if(nextQuestion !== undefined){
                return nextQuestion
            }
            else{
                throw Error('All completed')
            }
        }
        try{
            setQuestion(nxt())
        }
        catch(e){
            console.log(e) 
            setBtnContent('Submit')
            alert('End of the question')
        }
        setCurrAns(null)
    }

    const BtnNoClicked = (id)=>{ 
        setCurrAns(null)
       Questions.find(each => {
            if(each.id === id){
                setQuestion(each)
            } 
            return null
        }) 
        const prevAns = answersArray.find(each => each.id === id)
        if (prevAns !== undefined){
            setCurrAns(prevAns.userAns) 
            console.log(prevAns,answersArray)  
        } 
        else{
            setCurrAns(null)
        }
       // console.log(BtnId)
    }

   
  const changedInput = (e)=>{
      setCurrAns(e.target.value)  
      question.is_answered=true
  } 

    return (
        <>
        {question.is_seen = true} 
            <Header />
            <div>
                <Timer submitBtnClicked={submitBtnClicked} isTimedOut={isTimedOut} range={range}/>
            </div>
            <div className="questions-and-no-questions-div">
                <div className="questions-div">
                <div>
               <h1>{question.id}. {question.q}</h1>
               <div className="two-inputs-div">
                <div>
                   <input id={question.a} onChange={changedInput} checked={ currAns === 'a' } value='a' type='radio' name={question.a} />
                   <label htmlFor={question.a}>{question.a}</label>
                </div>
                <div>
                    <input id={question.b} onChange={changedInput} checked={  currAns === 'b' } type='radio' value='b' name={question.a} />
                    <label htmlFor={question.b}>{question.b}</label>
                </div>
                </div>
                <div className="two-inputs-div">
                <div>
                    <input id={question.c} onChange={changedInput} checked={  currAns === 'c' }  type='radio' value='c' name={question.a} />
                    <label htmlFor={question.c}>{question.c}</label>
                </div>
                <div>
                    <input id={question.d} onChange={changedInput} checked={ currAns ==='d' } type='radio' value='d' name={question.a} />
                    <label htmlFor={question.d}>{question.d}</label>
                </div> 
                </div>
            </div>
                        

                        <button type='button' onClick={NextBtnClicked} className="next-btn">{BtnContent}</button>
                </div> 
                <div className="no-questions-div">
                    {
                        Questions.map(each => <Button key={each.id} each={each} BtnNoClicked={BtnNoClicked}/>)
                    }
                </div> 
            </div>
        </>  

    );
}

export default Exam
