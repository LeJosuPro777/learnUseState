import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Note } from "./Note";
import "./App.css";

export const App = () => {
  const [notes, setNotes] = useState([]);
  const initalNoteObject = { title: "", body: "" };
  const [newNote, setNewNote] = useState(initalNoteObject);
  const [loading, setLoading] = useState(false);

  const handleChangeTitle = (e) => {
    const data = e.target.value;
    setNewNote((note) => ({ ...note, title: data }));
  };
  const handleChangeContent = (e) => {
    const data = e.target.value;
    setNewNote((note) => ({ ...note, body: data }));
  };
  const createNote = (e) => {
    e.preventDefault();
    const newID = notes.length + 1;

    const noteObject = {
      ...newNote,
      id: newID,
      important: Math.random() < 0.5,
    };
    setNotes((prevNotes) => {
      return [...prevNotes, noteObject];
    });
    axios
      .post("https://jsonplaceholder.typicode.com/posts", noteObject)
      .then((response) => {
        setNotes((prevNotes) => {
          prevNotes.pop()
          return prevNotes
        })
        setNotes((prevNotes) => {
          return [...prevNotes, response.data];
        });
      });
    setNewNote(initalNoteObject)
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setNotes(response.data);
          setLoading((loading) => !loading);
        });
    }, 800);
  }, []);

  if (loading) {
    return (
      <>
        <div className="loading">
          <h1>Loading...</h1>
        </div>
        ;
      </>
    );
  }

  return (
    <>
      <header className="header">
        <h1>Notes</h1>
      </header>
      <ol>
        {notes.map(({ id, title, body, important }) => {
          return <Note key={id} id={id} title={title} body={body} important={important}/>;
        })}
      </ol>

      <form onSubmit={createNote}>
        <input
          value={newNote.title}
          onChange={handleChangeTitle}
          placeholder="Title"
        />
        <input
          value={newNote.body}
          onChange={handleChangeContent}
          placeholder="Content"
        />
        <button type="submit">Create Note</button>
      </form>
    </>
  );
};


// pasar evento por props