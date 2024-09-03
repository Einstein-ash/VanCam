// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const CameraComponent = () => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Configure video constraints for the webcam
//   const videoConstraints = {
//     facingMode: "user", // Front-facing camera
//   };

//   // Capture image from the webcam
//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     setCapturedImage(imageSrc);
//     localStorage.setItem("capturedImage", imageSrc); // Store image in local storage

//       setCapturedImage(null); // Clear captured image state
  
//   };

//   // Download the captured image
//   const downloadImage = () => {
//     if (!capturedImage) return; // Ensure capturedImage is not null

//     const link = document.createElement("a");
//     link.href = capturedImage;
//     link.download = "captured_image.png";
//     link.click();
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       {capturedImage ? (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <br />
//           <button onClick={downloadImage}>Download Image</button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             videoConstraints={videoConstraints}
//           />
//           <br />
//           <button onClick={captureImage}>Capture Photo</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraComponent;





// -------- above is simple camera - caputre- store in local -------
// ----- below is test to show image of alubm under cmaera----------

// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import { useParams } from 'react-router-dom';


// const CameraComponent = () => {

//   const { albumId } = useParams(); // Get album ID from URL params
//   console.log("alubin id : ",albumId);
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [albumImages, setAlbumImages] = useState([]);
  
//   const videoConstraints = {
//     facingMode: 'user', // Front-facing camera
//   };

//   let authToken = "";

//   const data = localStorage.getItem('userData');
//     if (data) {
//     //   setUserData(JSON.parse(data));

//     authToken = JSON.parse(data).accessToken;
//     //   setAuthToken(token);
//     }


//   console.log("auth toekn ------ ",authToken);

//   // Fetch images for the album
//   useEffect(() => {
//     const handleFetchMediaItems = async()  => {
//         console.log(albumId);
//         if (!authToken) return;
      
//         try {
//           const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${authToken}`
//             }
//           });
//           const data = await response.json();
//           console.log("data media out-------",data.mediaItems);
//         //   setSelectedAlbumId(albumId);
//         setAlbumImages(data.mediaItems || []);
//         } catch (error) {
//           console.error('Error fetching media items:', error);
//         }
//       };

//       handleFetchMediaItems();
//   }, [albumId]);

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     setCapturedImage(imageSrc);
//     localStorage.setItem('capturedImage', imageSrc); // Store image in local storage

//     setCapturedImage(null); // Clear captured image state
//     uploadImageToAlbum(imageSrc, albumId);
//   };



//   // Send the captured image to the backend
//   const uploadImageToAlbum = async (imageSrc, albumId) => {
//     try {
//       const response = await fetch('http://localhost:5000/upload-image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//         body: JSON.stringify({
//           image: imageSrc,
//           albumId: albumId,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to upload image: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log('Uploaded image to album:', data);
//     } catch (error) {
//       console.error('Error uploading image to album:', error);
//     }
//   };
  


//   const downloadImage = () => {
//     if (!capturedImage) return; 

//     const link = document.createElement('a');
//     link.href = capturedImage;
//     link.download = 'captured_image.png';
//     link.click();
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       {capturedImage ? (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <br />
//           <button onClick={downloadImage}>Download Image</button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             videoConstraints={videoConstraints}
//           />
//           <br />
//           <button onClick={captureImage}>Capture Photo</button>
//         </div>
//       )}
//       <h3>Images in Album</h3>
//       <div className="album-images">
//         {albumImages.length > 0 ? (
//           albumImages.map((image) => (
//             <img key={image.id} src={image.baseUrl} alt={image.filename} />
//           ))
//         ) : (
//           <p>No images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraComponent;




// ----------- below ist est - send caputred image to ablum -------

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';

const CameraComponent = () => {
  const { albumId } = useParams(); // Get album ID from URL params
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);

  const videoConstraints = {
    facingMode: 'user', // Front-facing camera
  };

  let authToken = "";

  const data = localStorage.getItem('userData');
  if (data) {
    authToken = JSON.parse(data).accessToken;
  }

  // Fetch images for the album
  useEffect(() => {
    const handleFetchMediaItems = async () => {
      if (!authToken) return;

      try {
        const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setAlbumImages(data.mediaItems || []);
      } catch (error) {
        console.error('Error fetching media items:', error);
      }
    };

    handleFetchMediaItems();
  }, [albumId, authToken]);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return; // Ensure imageSrc is not null or undefined

    setCapturedImage(imageSrc);
    localStorage.setItem('capturedImage', imageSrc); // Store image in local storage

    
    const response = await fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Include token if needed
        },
        body: JSON.stringify({
          image: imageSrc,
          albumId: albumId // Pass the album ID to the backend
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
      } else {
        console.error('Error uploading image:', await response.text());
      }
      
  };

  const getMimeType = (imageSrc) => {
    // In this example, we assume the image is PNG
    // Adjust as needed if you're using different formats
    return 'image/png';
  };

  


  const downloadImage = () => {
    if (!capturedImage) return;

    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = 'captured_image.png';
    link.click();
  };

  return (
    <div>
      <h2>Take a Photo</h2>
      {capturedImage ? (
        <div>
          <img src={capturedImage} alt="Captured" />
          <br />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
          />
          <br />
          <button onClick={captureImage}>Capture Photo</button>
        </div>
      )}
      <h3>Images in Album</h3>
      <div className="album-images">
        {albumImages.length > 0 ? (
          albumImages.map((image) => (
            <img key={image.id} src={image.baseUrl} alt={image.filename} />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
