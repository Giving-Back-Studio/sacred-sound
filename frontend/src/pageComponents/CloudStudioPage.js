// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { storage } from '../firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { v4 } from 'uuid';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import LogoutButton from '../components/LogoutButton';
// import { GlobalStyle } from '../components/GlobalStyle';
// import MandalaBG from '../assets/MandalaAlpha.png';
// import FaceImg from '../assets/Face.png';
// import MusicIcon from '../assets/MusicIcon.png';
// import CircleMandala from '../assets/DefautlImageThumbnail.png';
// import ProfileEditSection from '../components/ProfileEditSection';
// import ArtistVideos from '../components/ArtistVideos';
// import ContentGallery from '../components/ContentGallery';
// import LoginButton from '../components/LoginButton';

// //Component being replace by NewCloudStudio on Jan15
// export default function CloudStudioPage() {

//     const [fileUpload, setFileUpload] = useState(null);
//     const [fileList, setFileList] = useState([]);
//     const { user, isAuthenticated, loginWithRedirect } = useAuth0();
//     const [activeComponent, setActiveComponent] = useState('component1');
//     const [isOnlyAudio, setIsOnlyAudio] = useState('');
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [showProgress, setShowProgress] = useState(false);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);  
//     const navigate = useNavigate();

//     //functionning very well but disable for now.
//     //getRecommendations useEffect & useState:
//     // const [recombeeDataResponse, setRecombeeDataResponse] = useState("");
//     // useEffect(() => {
//     //   const fetchRecommendations = async () => {
//     //     try {
//     //       const response = await axios.get(
//     //         `${process.env.REACT_APP_API_BASE_URL}/api/getRecommendations/${user.name}`
//     //       );
//     //       setRecombeeDataResponse(response.data || "");
//     //       console.log("recombeeDataResponse: " + recombeeDataResponse);
//     //     } catch (error) {
//     //       console.error(error);
//     //     }
//     //   }
//     //   fetchRecommendations();
//     //   }, [user?.name])
    

//     //Verify via the Auth0 Hook if the user has an account inside MongoDb, if not it redirect the user toward the AccountNameSelectionPage
//     useEffect(() => {
//         const fetchUser = async () => {
//         try {
//             if (user && user.name) {
//                 const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/b_getUserExist/${user.name}`);
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//             navigate('/AccountNameSelection');
//             } else {
//             console.log('Error:', error.message);
//             }
//         }
//     };
//     fetchUser();
//     }, [user?.name]);

//     useEffect(() => {
//     const fetchVideos = async () => {
//         if (user && user.name) {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getPreReviewedVideoList`, {
//             params: {
//             owner: user.name,
//             b_isPreparedForReview: false,
//             },
//         });
//         setFileList(response.data);
//         }
//     };

//     // Call fetchVideos once when the component mounts
//     fetchVideos();
//     // Use setInterval to call fetchVideos every 10 seconds
//     const intervalId = setInterval(fetchVideos, 5000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//     }, [user?.name, fileUpload]);

//     useEffect(() => {
//         if (fileUpload !== null) {
//         resetUploadStatus(); // Reset the upload status when a new upload is initiated
//         setShowProgress(true); // Show progress bar when an upload is initiated
//         uploadFile();
//         }
//     }, [fileUpload]);

//     useEffect(() => {
//         if (uploadProgress === 100) {
//         // When uploadProgress reaches 100, show the success message
//         setShowSuccessMessage(true);
//         setShowProgress(false); // Hide the progress bar when the upload is successful
//         }
//     }, [uploadProgress]);

//     const resetUploadStatus = () => {
//         setShowSuccessMessage(false);
//     };

//     const postGenerateThumbnailImage = (video_url, video_id) => {
//     fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postCreateImageThumbnail`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           video_url: video_url,
//           video_id: video_id,
//           email: user.name,
//         }),
//       }
//     ).then((res) => res.json());
//     };

//     const handleSectionChange = (componentName) => {
//     setActiveComponent(componentName);
//     };


// const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (fileUpload) {
//         // File is already selected, handle the error or display a message
//         console.error('A file is already selected. Clear the selection first.');
//         return;
//     }

//     const latestFile = files[files.length - 1];
//     setIsOnlyAudio(event.target.accept.includes('audio'));
//     setFileUpload(latestFile);
//     event.target.value = ''; // clear the input field
// };


// //Updated September 12th
// const uploadFile = () => {
//     if (fileUpload == null) {
//         return;
//     }
//     const fileUploadName = v4();
//     const fileRef = ref(storage, `Uploads/${user.name}/${fileUploadName}`);
//     const uploadTask = uploadBytesResumable(fileRef, fileUpload);

//     setIsUploading(true);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Calculate the upload percentage
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setUploadProgress(progress);
//         },
//         (error) => {
//             console.error('Upload error:', error);
//             // Handle the error here if needed
//         },
//         () => {
//             // Upload completed successfully
//             getDownloadURL(fileRef).then((fileUrl) => {
//                 const videoId = fileUploadName;
//                 postGenerateThumbnailImage(fileUrl, videoId);
//                 postContentMetaData(videoId, fileUrl);
//                 setUploadProgress(100); // Set progress to 100% when completed
//                 setFileUpload(null); // Clear the selected file after successful upload
//             });
//         }
//     );
// };



//     // Reviewed Mai 1st
//     const postContentMetaData = (videoId, fileUrl) => {
//         const timestamp = new Date().toISOString();
//         fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postContentMetaData`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//         },
//         body: JSON.stringify({
//             owner: user.name,
//             videoId: videoId,
//             timestamp: timestamp,
//             fileUrl: fileUrl,
//             isOnlyAudio: isOnlyAudio,
//             b_isPreparedForReview: false,
//             b_hasBeenReviewed: false,
//             b_isApproved: false,
//         }),
//         })
//         .then((res) => res.json())
//     };



//     //Conditionnal rendering to make sure the user is authenticated.
//     if (!isAuthenticated) {
//         return (
//         <div style={{display:"flex", flexDirection:'column', width:'100%', alignItems:'center'}}>
//             <p>Please log in to access the Cloud Studio.</p>
//             <LoginButton/>
//         </div>
//         );
//     }

//     return (
//       <>
//         <GlobalStyle />
//         <HeaderDiv>
//           <h1>Cloud Studio</h1>
//         </HeaderDiv>

//         {showProgress && isUploading && (
//           <SuccessMessage>
//             <div>
//               <p>Uploading: {uploadProgress.toFixed(3)}%</p>
//               <progress max="100" value={uploadProgress}></progress>
//             </div>
//           </SuccessMessage>
//         )}

//         {showSuccessMessage && (
//           <SuccessMessage>
//             <div>
//               <p>Upload Successful!</p>
//             </div>
//           </SuccessMessage>
//         )}

//         <UploadAndPreviewDivContainer>
//           <UploadDiv backgroundImage={MandalaBG}>
//             <h1 style={{ marginBottom: "33px" }}>
//               Upload your best quality content here.
//             </h1>
//             <ButtonMainContainer>
//               <UploadButtonColumnDiv>
//                 <UploadStyledLabel>
//                   <h1
//                     style={{
//                       color: "#F5F5F5",
//                       lineHeight: "0",
//                       padding: "11px",
//                     }}
//                   >
//                     {window.innerWidth < 1050 ? "Video" : "Upload Video"}
//                   </h1>
//                   <input
//                     type="file"
//                     accept={`video/*`}
//                     onChange={handleFileChange}
//                   />
//                 </UploadStyledLabel>
//                 <p style={{ lineHeight: "0" }}>MP4 or MOV files.</p>
//               </UploadButtonColumnDiv>
//               <UploadButtonColumnDiv>
//                 <UploadStyledLabel>
//                   <h1
//                     style={{
//                       color: "#F5F5F5",
//                       lineHeight: "0",
//                       padding: "11px",
//                     }}
//                   >
//                     {window.innerWidth < 1050 ? "Audio" : "Upload Audio"}
//                   </h1>
//                   <input
//                     type="file"
//                     accept={`audio/*`}
//                     onChange={handleFileChange}
//                   />
//                 </UploadStyledLabel>
//                 <p style={{ lineHeight: "0" }}>WAV or MP3 files.</p>
//               </UploadButtonColumnDiv>
//             </ButtonMainContainer>
//           </UploadDiv>
//           {fileList.length > 0 ? (
//             <UploadedContentDivContainer>
//               {Array.isArray(fileList) && fileList.map((video) => {
//                   return (
//                     <UploadedContentDiv
//                       key={video.videoId}
//                       backgroundImage={CircleMandala}
//                     >
//                       <UploadedContentImgDiv
//                         backgroundImage={video.ImageThumbnailURL0}
//                       >
//                         <Link to={`/PrepareForQA/${video.videoId}`}>
//                           <CenteredButton>
//                             <h1
//                               style={{
//                                 color: "#F5F5F5",
//                                 lineHeight: "0",
//                                 padding: "11px 33px",
//                               }}
//                             >
//                               Prepare for Review
//                             </h1>
//                           </CenteredButton>
//                         </Link>
//                         <p style={{ position: "relative", marginTop: "210px" }}>
//                           Add metadata to get found easily!
//                         </p>
//                       </UploadedContentImgDiv>
//                     </UploadedContentDiv>
//                   );
//                 })}
//             </UploadedContentDivContainer>
//           ) : (
//             <EmptyUploadedContentDiv style={{ width: "333px" }}>
//               <h1>
//                 As a token of thanks, you’ll unlock 1 hour of studio time at
//                 Sacred Sound Studio once you upload your first content!
//               </h1>
//             </EmptyUploadedContentDiv>
//           )}
//         </UploadAndPreviewDivContainer>
//         <div style={{ display: "flex" }}>
//           <ProfileSidebarDiv>
//             <DefaultButton
//               onClick={() => handleSectionChange("component1")}
//               style={{
//                 backgroundColor:
//                   activeComponent === "component1"
//                     ? "#A3C4A338"
//                     : "transparent",
//               }}
//             >
//               <ButtonInnerImg src={FaceImg} />
//               <h1>Your Profile</h1>
//             </DefaultButton>
//             <DefaultButton
//               onClick={() => handleSectionChange("component2")}
//               style={{
//                 backgroundColor:
//                   activeComponent === "component2"
//                     ? "#A3C4A338"
//                     : "transparent",
//               }}
//             >
//               <ButtonInnerImg src={MusicIcon} />
//               <h1>Your Content</h1>
//             </DefaultButton>
//             <DefaultButton
//               onClick={() => handleSectionChange("component3")}
//               style={{
//                 backgroundColor:
//                   activeComponent === "component3"
//                     ? "#A3C4A338"
//                     : "transparent",
//                 marginBottom: "100px",
//               }}
//             >
//               <ButtonInnerImg src={MusicIcon} />
//               <h1>Content Gallery</h1>
//             </DefaultButton>
//             <LogoutButton></LogoutButton>
//           </ProfileSidebarDiv>
//           {activeComponent === "component1" && <ProfileEditSection />}
//           {activeComponent === "component2" && (
//             <ArtistVideos artistId={user?.name} />
//           )}
//           {activeComponent === "component3" && <ContentGallery />}
//         </div>
//       </>
//     );
// }

// const HeaderDiv = styled.div`
//     display: flex;
//     justify-content: center;
//     background-color: #A3C4A338;
//     margin-bottom: 2%;
//     border-radius: 0px 0px 33px 33px;
// `;

// const UploadAndPreviewDivContainer = styled.div`
//     display: flex;
//     width: 90%;
// `;

// const UploadDiv = styled.div`
//     background-image: url(${props => props.backgroundImage});
//     background-repeat: no-repeat;
//     background-position: center center;
//     background-size: cover;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 44%;
//     border-radius: 33px;
//     background-color: #A3C4A338;
//     padding: 33px;
//     margin-left: 5%;
//     margin-right: 4%;
//     height: 222px;
//     overflow: hidden;
// `;

// const ButtonMainContainer = styled.div`
//     width: 100%;
//     margin: 10px;
//     display: flex;
//     justify-content: space-between;
// `;

// const UploadStyledLabel = styled.label`
//     display: inline-block;
//     position: relative;
//     overflow: hidden;
//     cursor: pointer;
//     background-color: #434289;
//     border-radius: 33px;
//     margin-top: 15px;
//     padding: 11px;
//     color:white;
//     margin-bottom: 11px;
// & input[type="file"] {
//     position: absolute;
//     font-size: 100px;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     opacity: 0;
//     cursor: pointer;
//     display: none;
// }
// `;

// const UploadButtonColumnDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `;

// const CenteredButton = styled.button`
//     border: none;
//     color: #F5F5F5;
//     background-color: #434289;
//     border-radius: 33px;
//     padding: 11px;
//     align-self: center;
//     cursor: pointer;
//     position: absolute; /* added */
//     top: 50%; /* added */
//     left: 50%; /* added */
//     transform: translate(-50%, -50%); /* added */
//     z-index: 3;
// `;

// const DefaultButton = styled.button`
// background-color: transparent;
// color: #434289;
// border: none;
// padding: 11px;
// cursor: pointer;
// display: flex;
// align-items: center;
// border-radius: 33px;
// `;

// const ButtonInnerImg = styled.img`
//     margin-right: 10px;
// `;

// const UploadedContentDivContainer = styled.div`
//     display: flex;
//     width: 44%;
//     overflow-x: auto;
//     white-space: nowrap; /* to prevent line breaks */
//     ::-webkit-scrollbar{display: none}
//     padding-bottom: 10px;
// `;

// const UploadedContentDiv = styled.div`
//     position: relative;
//     background-image: url(${props => props.backgroundImage});
//     background-repeat: no-repeat;
//     background-position: 50%;
//     background-size: 100% auto;
//     background-size: 285px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     border-radius: 33px;
//     background-color: #A3C4A338;
//     padding: 33px;
//     margin-right: 22px;
//     height: 222px;
//     min-width: 333px;
//     text-align: center;
// `;

// const UploadedContentImgDiv = styled.div`
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background-image: url(${props => props.backgroundImage});
//     box-sizing: border-box;
//     width: 100%;
//     height: 100%;
//     border-radius: 33px;
//     z-index: 2;
// `;

// const EmptyUploadedContentDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     border-radius: 33px;
//     background-color: #A3C4A338;
//     padding: 33px;
//     margin-right: 22px;
//     height: 222px;
//     min-width: 333px;
//     text-align: center;
//     position: relative; //needed to have button perfectly centered
// `;

// const ProfileSidebarDiv = styled.div`
//     width:22%;
//     height:870px;
//     margin:5%;
//     display:flex;
//     flex-direction:column;
//     border-radius: 33px;
//     padding: 10px;
// `;
// const SuccessMessage = styled.p`
//     font-size: 24px;
//     background-color: #A3C4A338;
//     text-align: center;
//     width: 33%;
//     margin-left: 33%;
//     padding-top: 10px;
//     padding-bottom: 10px;
//     border-radius: 33px;
// `;