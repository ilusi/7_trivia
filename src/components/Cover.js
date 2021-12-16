import React from "react"
import { categories, difficulties } from './category.js'
import './Cover.css'
import Stat from './Stat'

class Cover extends React.Component {
   constructor(props) {
      super(props)

      this.optionElements = categories.map(cat => (
         <option value={cat.value} key={cat.value}>{cat.text}</option>
      ))

      this.difficultyElements = difficulties.map(dif => (
         <option value={dif.value} key={dif.value}>{dif.text}</option>
      ))

      this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit(event) {
      event.preventDefault()

      const formData = Object.fromEntries(new FormData(event.target));

      this.props.setSettings(formData)
      this.props.toggleBtn()
   }

   render() {
      return (
         <div className="cover">
            <h1>Quizzical</h1>
            <p>Your Trivia Quiz for the day.</p>
            <form onSubmit={this.handleSubmit} className="form--cover">
               <select name="category">{this.optionElements}</select>
               <select name="difficulty">{this.difficultyElements}</select>
               <button>Start Quiz</button>
            </form>
            <Stat />
         </div>
      )
   }
}

export default Cover
