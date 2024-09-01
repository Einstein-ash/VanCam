import logo from './logo.svg';
import './App.css';
import CameraComponent from './pages/camera';

function App() {
  return (
    <div className="App">
      <CameraComponent/>
    </div>
  );
}

export default App;



// import React, { useState } from "react";
// import GroupSidebar from "./pages/GroupSidebar";
// import CameraComponent from "./pages/camera";

// const App = () => {
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleGroupSelect = (groupName) => {
//     setSelectedGroup(groupName);
//   };

//   return (
//     <div>
//       <GroupSidebar onGroupSelect={handleGroupSelect} />
//       <CameraComponent selectedGroup={selectedGroup} />
//     </div>
//   );
// };

// export default App;
