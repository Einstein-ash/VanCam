// import React, { useRef, useState } from "react";

// import Webcam from "react-webcam"; 
 
// const CameraComponent = () => { 

  
  
  
  
//   // -------- below - capture image ------------
//   const webcamRef = useRef(null); 
//   const [capturedImage, setCapturedImage] = useState(null); 
  
//   const videoConstraints = { 
//     facingMode: "user", 
//   }; 
 


//   const captureImage = async () => {

//     const imageSrc = webcamRef.current.getScreenshot(); 
//     setCapturedImage(imageSrc);
//     localStorage.setItem("capturedImage", imageSrc);
  
//     console.log("Image captured -------");
  
//     const formData = new FormData();
//     formData.append("file", imageSrc); 
//     formData.append("upload_preset", "yoyo_cam");

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/dlkd2qsml/image/upload`,
//         {
//           method: "POST",
//           body: formData
//         }
//       );
  

//       const data = await response.json();
//       console.log("Uploaded to Cloudinary: ", data);
  
//       const imageUrl = data.secure_url;
//       console.log("Image URL: ", imageUrl);

//       setCapturedImage(null);
//       localStorage.setItem("capturedImage", null);



//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//     }



//   };
  



  
//   const downloadImage = () => { 

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



// -------------- abocve is working, to caputre and send/ sotre to the server-------

// ------- below is working fine , great----- fetch image get folder, ------

// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";

// const CameraComponent = () => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [images, setImages] = useState([]);

//   const videoConstraints = {
//     facingMode: "user",
//   };

//   // Function to fetch all images from the backend (which interacts with Cloudinary)

//   const fetchImages = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/images");
//       const data = await response.json();
//       const imageUrls = data.map(img => img.secure_url);
//       setImages(imageUrls);
//     } catch (error) {
//       console.error("Error fetching images from backend:", error);
//     }
//   };


//   const fetchGroups = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/folders");
//       const data = await response.json();
//       console.log('Folders:', data.folders);

//     } catch (error) {
//       console.error('--99999999---Error fetching folders:', error);
//     }
//   };
  

//   // Fetch images on component mount
//   useEffect(() => {
//     fetchImages();
//     // fetchGroups();
//   }, []);

//   const captureImage = async () => {
//     setCapturedImage(null);
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     localStorage.setItem("capturedImage", imageSrc);

//     console.log("Image captured -------");

//     const formData = new FormData();
//     formData.append("file", imageSrc);
//     formData.append("upload_preset", "yoyo_cam");

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/dlkd2qsml/image/upload`,
//         {
//           method: "POST",
//           body: formData
//         }
//       );

//       const data = await response.json();
//       console.log("Uploaded to Cloudinary: ", data);

//       const imageUrl = data.secure_url;
//       console.log("Image URL: ", imageUrl);

//       // Reset captured image state
//       setCapturedImage(null);
//       // localStorage.setItem("capturedImage", null);

//       // Refresh the list of images
//       fetchImages();

//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//     }
//   };

//   const downloadImage = () => {
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
//       <h3>Images from Cloudinary Root Directory</h3>
//       <div>
//         {images.length > 0 ? (
//           <div>
//             {images.map((url, index) => (
//               <img key={index} src={url} alt={`Image ${index}`} style={{ width: '200px', margin: '10px' }} />
//             ))}
//           </div>
//         ) : (
//           <p>No images found in the root directory.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraComponent;



// ---------- below is test to fetch specififc folder data, and capture within folder only 000000000000

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";
import "./CameraComponent.css";

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [images, setImages] = useState([]);
  const { folderName } = useParams();

  const videoConstraints = {
    facingMode: "user",
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/images?folder=${folderName}`);
      const data = await response.json();
      const imageUrls = data.map(img => img.secure_url);
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images from backend:", error);
    }
  };

  const captureImage = async () => {
    setCapturedImage(null);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    localStorage.setItem("capturedImage", imageSrc);

    const formData = new FormData();
    formData.append("file", imageSrc);
    formData.append("upload_preset", "yoyo_cam");
    formData.append("folder", folderName);
    setCapturedImage(null);
    try {
      await fetch(`https://api.cloudinary.com/v1_1/dlkd2qsml/image/upload`, {
        method: "POST",
        body: formData,
      });

      fetchImages();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "captured_image.png";
    link.click();
  };

  useEffect(() => {
    fetchImages();
  }, [folderName]);

  return (
    <div className="camera-component">
      <h2 className="title">Capture and View Images</h2>
      <div className="camera-section">
        {capturedImage ? (
          <div className="captured-image-section">
            <img src={capturedImage} alt="Captured" className="captured-image" />
            <button onClick={downloadImage} className="btn btn-download">
              Download Image
            </button>
          </div>
        ) : (
          <div className="webcam-section">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="webcam"
            />
            <button onClick={captureImage} className="btn btn-capture">
              Capture Photo
            </button>
          </div>
        )}
      </div>
      <h3 className="images-title">Images from {folderName}</h3>
      <div className="images-gallery">
        {images.length > 0 ? (
          images.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index}`} className="gallery-image" />
          ))
        ) : (
          <p className="no-images-text">No images found in this folder.</p>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
