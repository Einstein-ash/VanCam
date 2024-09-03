// import React, { useState, useEffect } from 'react';

// const GroupSidebar = () => {
//   const [groups, setGroups] = useState([]);
//   const [newGroupName, setNewGroupName] = useState('');

//   // Function to fetch all groups (folders)
//   // const fetchGroups = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:5000/api/groups');
//   //     const data = await response.json();
//   //     setGroups(data.map(folder => folder.name)); // Assuming folder.name holds the folder name
//   //   } catch (error) {
//   //     console.error('Error fetching groups:', error);
//   //   }
//   // };


//   const fetchGroups = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/groups');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setGroups(data.map(folder => folder.name)); // Adjust based on actual data structure
//     } catch (error) {
//       console.error('Error fetching groups:', error);
//     }
//   };

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const handleCreateGroup = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/create-group', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ groupName: newGroupName }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setGroups(prevGroups => [...prevGroups, newGroupName]);
//         setNewGroupName('');
//       } else {
//         console.error('Error creating group:', result.error);
//       }
//     } catch (error) {
//       console.error('Error creating group:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Groups</h2>
//       <ul>
//         {groups.map((group, index) => (
//           <li key={index}>{group}</li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={newGroupName}
//         onChange={(e) => setNewGroupName(e.target.value)}
//         placeholder="New group name"
//       />
//       <button onClick={handleCreateGroup}>Create Group</button>
//     </div>
//   );
// };

// export default GroupSidebar;










// ----------test 3 - belwo is working - fine , fetching folder and create forlder -------------


// import React, { useState, useEffect } from 'react';

// const GroupSidebar = () => {
//   const [groups, setGroups] = useState([]);
//   const [newGroupName, setNewGroupName] = useState('');

//   const fetchGroups = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/folders");
//       const data = await response.json();
//       console.log('Folders:', data.folders);
//       setGroups(data.folders);  // Update groups state
//     } catch (error) {
//       console.error('--99999999---Error fetching folders:', error);
//     }
//   };
  



//   const handleCreateGroup = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/create_group', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ groupName: newGroupName }), // Ensure newGroupName is properly set
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const result = await response.json();
//       if (response.ok) {
//         setGroups(prevGroups => [...prevGroups, newGroupName]);
//         setNewGroupName('');
//       } else {
//         console.error('Error creating group:', result.error);
//       }
//     } catch (error) {
//       console.error('Error creating group:', error);
//     }
//   };

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   return (
//     <div>
//       <h2>Groups</h2>
//       <ul>
//         {groups.map((group, index) => (
//           <li key={index}>{group.name}</li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={newGroupName}
//         onChange={(e) => setNewGroupName(e.target.value)}
//         placeholder="New Group Name"
//       />
//       <button onClick={handleCreateGroup}>Create Group</button>
//     </div>
//   );
// };

// export default GroupSidebar;




// -= ---------- belwos is test to open folder -captuer- fetch folder image ----------

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupSidebar.css';  // Import the CSS file

const GroupSidebar = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/folders");
      const data = await response.json();
      setGroups(data.folders);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleGroupSelect = (groupName) => {
    onGroupSelect(groupName);
    navigate(`/camera/${groupName}`);
  };

  const handleCreateGroup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/create_group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: newGroupName }),
      });

      if (response.ok) {
        setGroups(prevGroups => [...prevGroups, { name: newGroupName }]);
        setNewGroupName('');
      } else {
        console.error('Error creating group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="group-sidebar">
      <h2 className="sidebar-title">Your Groups</h2>
      <div className="create-group">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter new group name"
          className="group-input"
        />
        <button type ="sumbit" onClick={handleCreateGroup} className="group-button">Create Group</button>
      </div>
      <ul className="group-list">
        {groups.map((group, index) => (
          <li key={index} className="group-item" onClick={() => handleGroupSelect(group.name)}>
            {group.name}
          </li>
        ))}
      </ul>
      {/* <div className="create-group">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter new group name"
          className="group-input"
        />
        <button onClick={handleCreateGroup} className="group-button">Create Group</button>
      </div> */}
    </div>
  );
};

export default GroupSidebar;
