import React from "react"
import Quiz from './Quiz'
import { nanoid } from "nanoid"
import './Form.css'

export default function Form(props) {
   const [score, setScore] = React.useState(0)
   const [quiz, setQuiz] = React.useState([]);
   const quizElements = quiz.map(item => {
      return (
         <Quiz
            key={item.id}
            id={item.id}
            handleChange={handleChange}
            question={item.question}
            choices={item.choices}
            answer={item.answer}
            correctAnswer={item.correct_answer}
            score={score}
         />
      )
   });

   // Fetch Trivia data.
   React.useEffect(() => {
      console.log('Getting Trivia data...')

      async function getTrivia() {
         const url = 'https://opentdb.com/api.php?'
            + 'amount=5'
            + '&category=' + props.settings.category
            + '&difficulty=' + props.settings.difficulty

         const res = await fetch(url)
         const data = await res.json()

         setQuiz(data.results.map(item => {
            // Collect answer choices and randomize their order.
            const choices = [...item.incorrect_answers, item.correct_answer]
               .map(answer => ({ answer, sort: Math.random() }))
               .sort((a, b) => a.sort - b.sort)
               .map(({ answer }) => answer)

            return { ...item, choices: choices, id: nanoid() }
         }))
      }

      getTrivia()
   }, [props.settings.category, props.settings.difficulty])

   // handleChange updates the data when user answers the Trivia.
   function handleChange(event) {
      const { name, value } = event.target
      const id = name.replace('answer-', '')

      // Append user's answers.
      setQuiz(prevQuiz => prevQuiz.map(quiz => {
         return quiz.id === id
            ? { ...quiz, answer: value }
            : quiz
      }))
   }

   // handleSubmit validates empty form and computes score.
   function handleSubmit(event) {
      event.preventDefault()

      let noAnswers = 0

      const wrongAnswers = quiz.filter(item => {
         noAnswers += item.answer ? 0 : 1

         return item.answer && (item.answer !== item.correct_answer)
      })

      if (noAnswers > 0) {
         setScore(-1)
      } else {
         setScore(quiz.length - wrongAnswers.length)
         props.toggleBtn() // Advanced to home page (Cover page).
      }
   }

   // capitalize capitalizes string.
   function capitalize(str) {
      return str.split('-')
         .map(word => word[0].toUpperCase() + word.slice(1))
         .join(' ')
   }

   return (
      <form onSubmit={handleSubmit} className="form--quiz">
         {quizElements}
         <div className="form--quiz__submit-button-container">
            {
               (score > 0)
               && <p>You scored <strong>{score}</strong>/{quiz.length} correct answers</p>
            }
            {
               (score < 0)
               && <p className="form--quiz__paragraph-error">
                  Please answer all of the questions before submitting
               </p>
            }
            <button>{capitalize(props.page)}</button>
         </div>
      </form >
   )
}
