import React, { useState } from "react";
import axios from "axios";
import "../styles/skills.css"; // Importing CSS

const SkillManager = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [popularity, setPopularity] = useState(50); // Default popularity value

  const handleAddSkill = async () => {
    try {
      const response = await axios.post("/api/skills", { name: skill, popularity });
      setSkills([...skills, response.data]); // Add new skill to the list
      setSkill(""); // Reset input
      setPopularity(50); // Reset popularity
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`/api/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id)); // Remove skill from list
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleUpdateSkill = async (id, updatedName, updatedPopularity) => {
    try {
      const response = await axios.put(`/api/skills/${id}`, {
        name: updatedName,
        popularity: updatedPopularity,
      });
      setSkills(
        skills.map((s) => (s._id === id ? response.data : s)) // Update skill in the list
      );
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleViewSkills = async () => {
    try {
      const response = await axios.get("/api/skills");
      setSkills(response.data); // Populate skills from the database
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  return (
    <div className="skill-manager">
      <h1>Skill Manager</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Skill Name"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <input
          type="number"
          placeholder="Popularity (1-100)"
          value={popularity}
          min="1"
          max="100"
          onChange={(e) => setPopularity(e.target.value)}
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>

      <div className="skills-list">
        <h2>Your Skills</h2>
        <button onClick={handleViewSkills}>Refresh Skills</button>
        {skills.map((s) => (
          <div key={s._id} className="skill-item">
            <p>
              <strong>{s.name}</strong> - Popularity: {s.popularity}
            </p>
            <button onClick={() => handleUpdateSkill(s._id, `${s.name} (Updated)`, s.popularity)}>
              Update
            </button>
            <button onClick={() => handleDeleteSkill(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
