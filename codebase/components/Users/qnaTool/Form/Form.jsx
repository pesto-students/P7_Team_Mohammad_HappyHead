import { useState } from 'react';
import { useRouter } from 'next/router';

// Import the default questionnaire data array
import defaultQuestionnaireData from '../../../../models/api/questions'

const QnAPage = () => {
  const router = useRouter();
  const { username } = router.query;

  // State to hold the user's answers
  const [answers, setAnswers] = useState(Array(defaultQuestionnaireData.length).fill(''));

  // Function to handle selecting an answer
  const handleSelectAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Function to handle submitting the answers
  const handleSubmit = async () => {
    try {
      // Create an object with the answers and recommendation
      const data = {
        questions: defaultQuestionnaireData.map((question) => question.question),
        answers,
        recommendation: defaultQuestionnaireData.map((question, index) => question.recommendations[answers[index]]),
      };

      // Send a POST request to save the data
      const response = await fetch(`/pages/api/qna/form/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Data saved successfully, redirect to a success page or perform any other actions
        router.push('/success');
      } else {
        // Handle error case
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      {defaultQuestionnaireData.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          {question.type === 'checkbox' ? (
            // Render checkbox options
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="checkbox"
                    checked={answers[index] === optionIndex}
                    onChange={() => handleSelectAnswer(index, optionIndex)}
                  />
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            // Render radio button options
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="radio"
                    checked={answers[index] === optionIndex}
                    onChange={() => handleSelectAnswer(index, optionIndex)}
                  />
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QnAPage;
