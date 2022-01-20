import { useParams } from 'react-router-dom'
import React, {useState} from 'react';
import getQuiz from "../Getter";

import "./quiz.scss";
function Symbol(props){
    return(
        <p className = "symbol centered">{props.symbol}</p>
    )
}
function QuizPanel(props){
    const quiz = getQuiz(props.topicId);
    
    const handleKeyPress = (event) =>{
        if(event.key === "Enter"){
            let ans = document.getElementById("answer");
            if(props.color !== "normal"){
                props.setColor("normal");
                props.upQn();
                ans.value = "";
            }
            else if(ans.value === quiz.answers[props.qn]){
                props.setColor("correct");
            } else{
                props.setColor("incorrect");
            }
            console.log(ans.value);
        }
    }
    return (
        <div>
            
            <div className = "centered">
            <h3>Question #{props.qn+1}</h3>
            <p className ="questions">What is this symbol?</p>
            <Symbol  symbol = {quiz.questions[props.qn]} key = {quiz.questions[props.qn].id}/>
            </div>
            <div>
            <input type="text" id = 'answer' 
                name="answer"  
                placeholder="..." 
                autoComplete="off" 
                onKeyPress = {handleKeyPress}
                autoFocus></input>
            </div>
        </div>

    )
}
export default function Quiz(){
    const { topicId } = useParams();
    const [questionNum, setQuestionNum] = useState(0);
    const upQn = () => setQuestionNum(questionNum + 1);
    const [color, setColor] = useState("normal");
    return (
        <div className = {"quiz-container centered " + color}>
            <p><i>This is the <b>Quiz</b> page, the topic is #{topicId}</i></p>
            <QuizPanel topicId = {topicId} 
                qn = {questionNum} 
                color = {color} 
                setColor = {setColor}
                upQn = {upQn}/>

        </div>
    )
}