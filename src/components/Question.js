import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  const { id, prompt, answers, correctIndex } = question;

  useEffect(() => {
    let timerId;

    if (timeRemaining > 0) {
      timerId = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else {
      onAnswered(false);
      setTimeRemaining(10);
    }

    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button 
          key={answer} 
          onClick={() => handleAnswer(index === correctIndex)}
        >
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
