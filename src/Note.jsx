import { useState } from "react"

export const Note = ({id, title, body, important  = false}) => {
  const [status, setStatus] = useState(important);

  const handleCLick = () => {
    setStatus((prevStatus) => !prevStatus)
  }
  return(
    <li>
    <h3>{`${title}`}</h3>
    <p>{body}</p>
    <button onClick={handleCLick}>
      {status ? "important" : "no important"}
    </button>
  </li>
  )
}