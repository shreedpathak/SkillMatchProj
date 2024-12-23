import React, { useState } from "react";
import axios from "axios";
import "../styles/skills.css"; // Importing CSS

const SkillManager = () => {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);
  const [popularity, setPopularity] = useState(50); // Default popularity value
  const [editMode, setEditMode] = useState(null); // Track skill being edited
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPopularity, setUpdatedPopularity] = useState(50);

  const handleAddSkill = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/skills/create", { name: skill, category, popularity });
      setSkills([...skills, response.data]); // Add new skill to the list
      setSkill(""); // Reset input
      setPopularity(50); // Reset popularity
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/delete/${id}`);
      setSkills(skills.filter((s) => s._id !== id)); // Remove skill from list
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleUpdateSkill = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/skills/update/${editMode}`, {
        name: updatedName,
        popularity: updatedPopularity,
      });
      setSkills(
        skills.map((s) => (s._id === editMode ? response.data : s)) // Update skill in the list
      );
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleViewSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/skills");
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
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
            {editMode === s._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Updated Skill Name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Updated Popularity (1-100)"
                  value={updatedPopularity}
                  min="1"
                  max="100"
                  onChange={(e) => setUpdatedPopularity(e.target.value)}
                />
                <button onClick={handleUpdateSkill}>Save</button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>{s.name}</strong> - Popularity: {s.popularity}
                </p>
                <button
                  onClick={() => {
                    setEditMode(s._id);
                    setUpdatedName(s.name);
                    setUpdatedPopularity(s.popularity);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteSkill(s._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
