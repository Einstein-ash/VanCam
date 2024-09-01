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










// ----------test 3
import React, { useState, useEffect } from 'react';

const GroupSidebar = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/groups');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGroups(data.map(folder => folder.name)); // Extract folder names
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName: newGroupName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (response.ok) {
        setGroups(prevGroups => [...prevGroups, newGroupName]);
        setNewGroupName('');
      } else {
        console.error('Error creating group:', result.error);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        placeholder="New Group Name"
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default GroupSidebar;
