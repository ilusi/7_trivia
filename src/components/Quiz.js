export default function Quiz(props) {
   const question = decodeHTMLEntity(props.question)
   const choices = props.choices.map((choice, idx) => {
      const choiceDecoded = decodeHTMLEntity(choice)
      let bgColor = ''

      // Styling - Highlight in/correct answer on the Quiz/Check Answer page.
      if (props.score > 0) {
         if (choice === props.answer) {
            bgColor = '#94D7A2' // green
         } else if (choice === props.correctAnswer) {
            bgColor = '#F8BCBC' // pink
         } else {
            bgColor = '#fff'
         }
      } else if (choice === props.answer) {
         bgColor = '#D6DBF5' // purple
      } else {
         bgColor = '#fff'
      }

      const styles = { backgroundColor: bgColor }

      return (
         <li
            key={`${props.id}-${idx}`}
            style={styles}
         >
            <input
               type="radio"
               id={`${idx}-${props.id}`}
               name={`answer-${props.id}`}
               value={choice}
               checked={props.answer === choice}
               onChange={props.handleChange}
            />
            <label htmlFor={`${idx}-${props.id}`}>{choiceDecoded}</label>
         </li>
      )
   })

   // decodeHTMLEntity converts HTML entity to its ASCII symbol equivalent.
   function decodeHTMLEntity(str) {
      const doc = new DOMParser().parseFromString(str, "text/html")

      return doc.documentElement.textContent
   }

   return (
      <fieldset className="form--quiz__fieldset">
         <p className="form--quiz__paragraph">{question}</p>
         <ul className="form--quiz__list">{choices}</ul>
      </fieldset>
   )
}
