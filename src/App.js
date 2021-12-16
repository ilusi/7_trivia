import React from "react"
import Cover from './components/Cover'
import Form from './components/Form'
import './App.css'

export default function App() {
   console.log("*** App Rendering ***")

   // There are 3 pages total in the Trivia: List of pages and buttons' labels.
   const PAGE_COVER = "start-quiz"
   const PAGE_QUIZ = "check-answers"
   const PAGE_QUIZ_CHECK = "play-again"

   const [page, setPage] = React.useState(PAGE_COVER)
   const [settings, setSettings] = React.useState({
      category: '',
      difficulty: ''
   })

   // toggleBtn acts as the navigation to advance the page.
   function toggleBtn() {
      if (PAGE_COVER === page) {
         setPage(PAGE_QUIZ)
      } else if (PAGE_QUIZ === page) {
         setPage(PAGE_QUIZ_CHECK)
      } else {
         setPage(PAGE_COVER)
      }
   }

   return (
      <div className="App">
         <img
            src="/blobs-yellow.png"
            alt=""
            className="image-blob--top-right"
         />
         {
            (PAGE_COVER === page)
               ? <Cover setSettings={setSettings} toggleBtn={toggleBtn} />
               : <Form
                  page={page}
                  settings={settings}
                  toggleBtn={toggleBtn}
               />
         }
         <img
            src="/blobs-blue.png"
            alt=""
            className="image-blob--bottom-left"
         />
      </div>
   )
}
