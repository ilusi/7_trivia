import React from "react"
import Quiz from './Quiz'
import { nanoid } from "nanoid"
import './Form.css'
import Confetti from 'react-confetti'
// import data from './data'

export default function Form(props) {
   const initStat = {
      date: '',
      category: '',
      difficulty: '',
      score: ''
   }

   const reducer = (stat, action) => {
      let newStat

      switch (action.type) {
         case 'settings':
            newStat = {
               ...stat,
               category: action.value.category,
               difficulty: action.value.difficulty
            }
            break

         case 'score':
            newStat = {
               ...stat,
               date: new Date().toDateString(),
               score: action.value
            }
            break

         default:
            newStat = stat
      }

      localStorage.setItem('quizzical-stat', JSON.stringify(newStat))

      return newStat
   }

   const [stat, dispatch] = React.useReducer(reducer, initStat)
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
            score={stat.score}
         />
      )
   });

   // Fetch Trivia data.
   React.useEffect(() => {
      // Save settings to local storage.
      dispatch({
         type: 'settings',
         value: {
            category: props.settings.category,
            difficulty: props.settings.difficulty
         }
      })

      const url = 'https://opentdb.com/api.php?'
         + 'amount=5'
         + '&category=' + props.settings.category
         + '&difficulty=' + props.settings.difficulty

      console.log('Getting Trivia data from ' + url)

      async function getTrivia() {
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
         dispatch({ type: 'score', value: -1 })
      } else {
         dispatch({ type: 'score', value: quiz.length - wrongAnswers.length })
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
         {
            (quiz.length > 0)
               ? quizElements
               : <img
                  src="/loading.gif"
                  alt="Loading. . ."
                  className="image-loading"
               />
         }
         <div className="form--quiz__submit-button-container">
            {
               (stat.score === quiz.length) && <Confetti />
            }
            {
               (stat.score > 0)
               && <p>You scored <strong>{stat.score}</strong>/{quiz.length} correct answers</p>
            }
            {
               (stat.score < 0)
               && <p className="form--quiz__paragraph-error">
                  Please answer all of the questions before submitting
               </p>
            }
            <button>{capitalize(props.page)}</button>
         </div>
      </form >
   )
}
