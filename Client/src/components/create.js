import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create(numMoves) {
    const [form, setForm] = useState({
      name: "",
      moves: numMoves,
    });
    const navigate = useNavigate();
    
    // These methods will update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }
    
    // This function will handle the submission.
    async function onSubmit(e) {
      e.preventDefault(); //prevents from doing what it normally does
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newHighScore = { ...form }; //unpacking it
    
      //
      await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHighScore),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setForm({ name: "", moves: ""});
      navigate("/");
    }

    return (
     <div>
        <h3>Submit Winner's Score</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                />
            </div>
        </form>
     </div>
    );
}