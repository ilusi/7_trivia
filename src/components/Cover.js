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

      // Use previous settings if user has played.
      this.state = JSON.parse(localStorage.getItem('quizzical-stat'))

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   // handleChange updates the state with category and difficulty settings.
   handleChange(event) {
      this.setState(({ [event.target.name]: event.target.value }))
   }

   // handleSubmit saves the user's trivia settings.
   handleSubmit(event) {
      event.preventDefault()

      const formData = Object.fromEntries(new FormData(event.target))

      this.props.setSettings(formData)
      this.props.toggleBtn()
   }

   render() {
      return (
         <div className="cover">
            <h1>Quizzical</h1>
            <p>Your Trivia Quiz for the day.</p>
            <form onSubmit={this.handleSubmit} className="form--cover">
               <select
                  name="category"
                  value={this.state ? this.state.category : ''}
                  onChange={this.handleChange}
               >
                  {this.optionElements}
               </select>
               <select
                  name="difficulty"
                  value={this.state ? this.state.difficulty : ''}
                  onChange={this.handleChange}
               >
                  {this.difficultyElements}
               </select>
               <button>Start Quiz</button>
            </form>
            <Stat />
         </div>
      )
   }
}

export default Cover
