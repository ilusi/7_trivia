import React from "react"
import { categories } from "./category"

class Stat extends React.Component {
   constructor() {
      super()

      this.stat = JSON.parse(localStorage.getItem('quizzical-stat'))

      this.category = this.stat && categories.find(
         cat => cat.value === this.stat.category
      ).text
   }

   render() {
      return (
         this.stat &&
         <div className="stat-container">
            <h4>Your stats:</h4>
            <ul>
               <li>Last played on {this.stat.date}</li>
               <li>Category: {this.category}</li>
               <li>Difficulty: {this.stat.difficulty}</li>
               <li>
                  {
                     this.stat.score > 0
                        ? 'Score: ' + this.stat.score
                        : "You didn't complete the quiz."
                  }
               </li>
            </ul>
         </div>
      )
   }
}

export default Stat
