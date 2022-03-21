import './index.css'
import { useState } from 'react'

const FrameQuestions = (props)=>{
    const [ChangedClass,setChangedClass]= useState('changed-class')
    const [btnContent,setBtnContent] = useState('Answer It')
    const [answer,setAnswer] = useState(null) 
    const [isToggled,setIsToggled] = useState(true)

    const {eachQuestion} = props
    const {id,question,asked_by} = eachQuestion 


    const changedInput=(e)=>{
        setAnswer(e.target.value)
    }

    const submitAnswer=async(e)=>{
    //    await axios.post('http://localhost:5000/post-answer',{ans:answer,question_id:id,user_id,answered_id:UID},{headers:{'authorization' : `Bearer ${jwtToken}`}})
    //    .then(res => console.log(res.data)) 
    //    setQuestions(questions => questions.filter(each => {
    //        if(each.id !== id){
    //            return each
    //        }
    //        return null
    //    }))
    }

    const toggle = ()=>{
        if (isToggled){
            setChangedClass(null)
            setBtnContent('close-taggle')
        }
        else{
            setChangedClass('changed-class')
            setBtnContent('Answer-It')
        }
        setIsToggled(isToggled => !isToggled)
    }

   return(
       <div className='main-question-div'>

           <div className="bg-1-2"> 
              <div>
                  <p>Asked by <br/>
                       <p className='span-bg'>{asked_by[0]}</p> {asked_by} 
                    </p>
              </div>
              <div className='each-question-div'>
              <h1 className='text'>{question}</h1>
              <button onClick={toggle} className='answer-it-btn' type='button'>{btnContent}</button>
              </div>
           </div>
           <div className={` ${ChangedClass}`}>
               <div className='answer-div'>
               <textarea className='text-div' onChange={changedInput} placeholder='answer it'/>
               <button onClick={submitAnswer} className='submit-btn-in-home' type='button'>Submit</button>
               </div>
           </div>
       </div>
   )
}

export default FrameQuestions