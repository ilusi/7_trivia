import { categories, difficulties } from './category.js'
import './Cover.css'

export default function Cover(props) {
   const optionElements = categories.map(cat => (
      <option value={cat.value} key={cat.value}>{cat.text}</option>
   ))

   const difficultyElements = difficulties.map(dif => (
      <option value={dif.value} key={dif.value}>{dif.text}</option>
   ))

   function handleSubmit(event) {
      event.preventDefault()

      const formData = Object.fromEntries(new FormData(event.target));

      props.setSettings(formData)
      props.toggleBtn()
   }

   return (
      <div className="cover">
         <h1>Quizzical</h1>
         <p>Your Trivia Quiz for the day.</p>
         <form onSubmit={handleSubmit} className="form--cover">
            <select name="category">{optionElements}</select>
            <select name="difficulty">{difficultyElements}</select>
            <button>Start Quiz</button>
         </form>
      </div>
   )
}
