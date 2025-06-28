// src/components/Notes.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  return (
    <div>
      <h1>Subject Notes</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
