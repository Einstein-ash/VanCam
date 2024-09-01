// Sidebar.js
import React, { useState, useEffect } from "react";

const Sidebar = ({ onGroupSelect, onGroupCreate }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/groups");
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleCreateGroup = async () => {
    if (newGroupName) {
      try {
        await fetch(`http://localhost:5000/api/groups`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newGroupName }),
        });
        // Refresh groups after creation
        fetchGroups();
        setNewGroupName("");
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  return (
    <div style={{ width: '200px', float: 'left', padding: '10px', borderRight: '1px solid #ddd' }}>
      <h3>Groups</h3>
      <ul>
        {groups.map((group, index) => (
          <li key={index} onClick={() => onGroupSelect(group)}>
            {group}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        placeholder="New group name"
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default Sidebar;
