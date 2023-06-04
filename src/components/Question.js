import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [count, setCount] = useState(0);
  // add useEffect code
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearTimeout(timer); // Clear the timeout when countdown reaches 0
      onAnswered(false);
    }

    return () => {
      clearTimeout(timer); // Cleanup: clear the timeout if the component unmounts
    };
  }, [timeRemaining]);
  
  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
