// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';
// import styled from 'styled-components';
// import { GlobalStyle } from '../components/GlobalStyle';
// import { v4 } from 'uuid';
// import { storage } from '../firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import TagComponent from '../components/TagComponent';

// //Component being remplace in Jan 2024 by the ModifySingleTrackComponent

// const PrepareForQA = () => {
//     const { videoId } = useParams();
//     const { user, isAuthenticated } = useAuth0();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         category: 'Music video',
//         tags: ''
//     });
//     const [formError, setFormError] = useState('');
//     const [videoURL, setVideoURL] = useState('');
//     const [videoUrlRetrived, setVideoUrlRetrived] = useState(false);
//     const [imageThumbnail0, setImageThumbnail0] = useState('');
//     const [imageThumbnail1, setImageThumbnail1] = useState('');
//     const [imageThumbnail2, setImageThumbnail2] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//     const [uploadedImageThumbnail, setUploadedImageThumbnail] = useState('');
//     const [previewImageThumbnail, setPreviewImageThumbnail] = useState(null);
//     const [isOnlyAudio, setIsOnlyAudio] = useState(true);
//     const [selectedImageSource, setSelectedImageSource] = useState("previewImage");
//     const [tags, setTags] = useState('');

// useEffect(() => {
//     const fetchVideosURL = async () => {
//         try {
//         const response = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/api/getContentById`,
//             {
//             params: {
//                 videoId: videoId,
//             },
//             }
//         );
//         setVideoURL(response.data.contentDocument.fileUrl);
//         setVideoUrlRetrived(true);
//         setIsOnlyAudio(response.data.contentDocument.isOnlyAudio)
//         setImageThumbnail0(response.data.contentDocument.ImageThumbnailURL0);
//         setImageThumbnail1(response.data.contentDocument.ImageThumbnailURL1);
//         setImageThumbnail2(response.data.contentDocument.ImageThumbnailURL2);

//         } catch (error) {
//         console.error(error);
//         setVideoUrlRetrived(false);
//         }
//     };
//     fetchVideosURL();
// }, []);

// useEffect(() => {
//         const fetchContentData = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getContentById`,
//                     {
//                         params: {
//                         videoId: videoId,
//                         },
//                     }
//                 );
//                 const contentData = response.data.contentDocument;
//                 // Set the form data with the fetched content data
//                 setFormData({
//                     title: contentData.title || '', // Populate with existing title or an empty string if not found
//                     description: contentData.description || '', // Populate with existing description or an empty string if not found
//                     category: contentData.category || 'Music video', // Set default category or use existing if found
//                     tags: contentData.tags || '',
//                 });
//                 setIsOnlyAudio(contentData.isOnlyAudio || true); // Set isOnlyAudio to existing value or true by default
//                 // Set other state variables as needed...
//             } catch (error) {
//                 console.error(error);
//                 setVideoUrlRetrived(false);
//             }
//         };
//         fetchContentData(); // Call the fetchContentData function when the component mounts
//     }, [videoId]); // Make sure to include videoId in the dependency array


// const uploadImageThumbnail = () => {
//     if (uploadedImageThumbnail == null) {
//         console.log("uploadedImageThumbnail was null");
//         return Promise.resolve(null);
//     }
//     const fileUploadName = v4();
//     const fileRef = ref(storage, `thumbnails/${user.name}/${fileUploadName}`);
//     return uploadBytes(fileRef, uploadedImageThumbnail)
//         .then(() => getDownloadURL(fileRef))
//         .then((url) => {
//         alert("uploadedImageThumbnail Upload Successful!");
//         setUploadedImageThumbnail(null);
//         return url;
//         })
//         .catch((error) => {
//         console.error(error);
//         return null;
//         });
// };


//     const handleImageThumbnailChange = (event) => {
//         const files = event.target.files;
//         const latestFile = files[files.length - 1];
//         setUploadedImageThumbnail(latestFile);
//         setPreviewImageThumbnail(URL.createObjectURL(latestFile));
//         setSelectedImageSource("fileInput"); // Set the source to file input
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevState) => ({
//         ...prevState,
//         [name]: value
//         }));
//     };

//     const handleTagsChange = (newTags) => {
//         setTags(newTags);
//     };

// const handleSubmit = async (event) => {
//     event.preventDefault();

//     let imageThumbnailURL;
    
//     if (selectedImageSource === "fileInput") {
//         // User selected an image through the file input
//         imageThumbnailURL = await uploadImageThumbnail();
//     } else if (selectedImageSource === "previewImage") {
//         // User selected a preview image
//         //Change to selectedImage when switching back the Thumbnails on:
//         imageThumbnailURL = null; //selectedImage;
//     } else {
//         // Handle the case where no image is selected
//         alert("Please select an imageThumbnail");
//         return;
//     }

//     try {
//         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateContentMetaData`, {
//             videoId: videoId,
//             b_isPreparedForReview: true,
//             title: formData.title,
//             description: formData.description,
//             category: formData.category,
//             selectedImageThumbnail: imageThumbnailURL,
//             tags: tags,
//         });
//         console.log('ContentMetaData updated successfully');
//         navigate('/studio');
//     } catch (error) {
//         setFormError('An error occurred while updating the ContentMetaData');
//         console.error(error);
//     }
// };



//     const handleImageClick = (image, index) => {
//         setSelectedImage(image);
//         setSelectedImageIndex(index);
//         setSelectedImageSource("previewImage"); // Set the source to preview image
//     };

//     //Disabling for testing:
//     //Conditionnal rendering to make sure the user is authenticated.
//     // if (!isAuthenticated) {
//     //     return (
//     //     <div style={{display:"flex", flexDirection:'column', width:'30%', alignItems:'center'}}>
//     //         <p>Please log in to access the Cloud Studio.</p>
//     //     </div>
//     //     );
//     // }

//     return (
//         <>
//         <GlobalStyle/>
//         <MainDiv>
//             <LeftDiv>
//                 <div style={{display:"flex", flexDirection:"row"}}>
//                     <HeaderDiv>
//                         <h1>Add metadata to get discovered easily.</h1>
//                         <h3 style={{whiteSpace:"nowrap"}}>Allow the sacred sound recommendation engine to expand your reach.</h3>
//                     </HeaderDiv>
//                 </div>
//                 <CustomForm onSubmit={handleSubmit}>
//                 <CustomLabel><h3>Write a catchy title for the content.</h3></CustomLabel>
//                 <CustomInput id="title" name="title" value={formData.title} onChange={handleInputChange} required ></CustomInput>
//                 <CustomLabel><h3>Add a video description.</h3></CustomLabel>
//                 <DescriptionTextArea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
//                 <TagComponent onTagsChange={(tags) => handleTagsChange(tags)} value={formData.tags} />
//                 <CustomLabel><h3>Select the content's category.</h3></CustomLabel>
//                     <CustomSelect id="category" name="category" value={formData.category} onChange={handleInputChange}>
//                         <option value="Music video">Music video</option>
//                         <option value="Integration support">Integration support</option>
//                         <option value="Live in the studio">Live in the studio</option>
//                         <option value="Spoken words">Spoken word</option>
//                         <option value="Meditation music">Meditation music</option>
//                         <option value="Behind the scenes">Behind the scenes</option>
//                         <option value="Concert">Concert</option>
//                     </CustomSelect>
//                 {!isOnlyAudio ? (
//                     <>
//                     {/* Temporary disabling ImageThumbnails: */}
//                     {/*<ThumbnailContainerDiv>
//                         {previewImageThumbnail && (
//                         <ThumbnailImageDiv style={{border: selectedImageIndex === 0 ? "4px solid #434289" : "none",}}>
//                             <ThumbnailImg
//                             src={previewImageThumbnail}
//                             onClick={() => handleImageClick(`${imageThumbnail2}`, 0)}
//                             />
//                         </ThumbnailImageDiv>
//                         )}
//                         <ThumbnailImageDiv style={{border: selectedImageIndex === 1 ? "4px solid #434289" : "none",}}>
//                             <ThumbnailImg
//                             src={imageThumbnail0}
//                             onClick={() => handleImageClick(`${imageThumbnail0}`, 1)}
                            
//                             />
//                         </ThumbnailImageDiv>
//                         <ThumbnailImageDiv style={{border: selectedImageIndex === 2 ? "4px solid #434289" : "none",}}>
//                             <ThumbnailImg
//                             src={imageThumbnail1}
//                             onClick={() => handleImageClick(`${imageThumbnail1}`, 2)}
//                             />
//                         </ThumbnailImageDiv>
//                         <ThumbnailImageDiv style={{border: selectedImageIndex === 3 ? "4px solid #434289" : "none",}}>
//                             <ThumbnailImg
//                             src={imageThumbnail2}
//                             onClick={() => handleImageClick(`${imageThumbnail2}`, 3)}
//                             />
//                         </ThumbnailImageDiv>
//                     </ThumbnailContainerDiv> */}
//                     </>
//                 ) : null }
//                 <div>
//                     <input type="file" onChange={handleImageThumbnailChange} style={{marginBottom:"3%"}}/>
//                 </div>

//                 {formError && <p style={{ color: 'red' }}>{formError}</p>}
//                 <div>
//                     <DefaultButton type="submit">
//                         <h2 style={{color:"#F5F5F5"}}>Save</h2>
//                     </DefaultButton>
//                 </div>
//                 </CustomForm>
//             </LeftDiv>
//             <RightDiv>
//                 {videoUrlRetrived ? (
//                     <div style={{marginTop:"8%"}}>
//                 <video controls style={{maxWidth:"90%", maxHeight:"500px"}}>
//                     <source src={videoURL} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//                 </div>
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </RightDiv>
//         </MainDiv>
//         </>
//     );
// };

// export default PrepareForQA;


// const MainDiv = styled.div`
//     display: flex;
// `;

// const LeftDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: start;
//     justify-content: start;
//     width: 55%;
//     margin-left: 3%;
//     z-index: 2;
// `;

// const HeaderDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: start;
//     width: 80%;
//     margin-top: 7%;
// `;

// const CustomForm = styled.form`
//     width: 80%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
// `;

// const CustomInput = styled.input`
//     border-radius: 33px;
//     padding: 22px;
//     width: 100%;
//     margin-top: 2%;
//     border: 1px solid gray;
//     :focus {
//             outline: none;
//             border: 2px solid #434289;
//         }
// `;

// const CustomLabel = styled.label`
//     margin-top: 3%;
// `;

// const DescriptionTextArea = styled.textarea`
//     border-radius: 33px;
//     width: 100%;
//     height: 70px;
//     padding: 22px;
//     resize: none;
// `;

// const CustomSelect = styled.select`
//     border-radius: 33px;
//     padding: 22px;
//     width: 105%;
//     margin-top: 2%;
//     margin-bottom: 5%; //Adjustement for disabling ImageThumbnails
//     :focus {
//             outline: none;
//             border: 2px solid #434289;
//         }
// `;

// const ThumbnailContainerDiv = styled.div`
// height: 222px;
// margin-top: 7%;
// margin-bottom: 7%;
// display: flex;
// `;

// const ThumbnailImageDiv = styled.div`
// height: 100%;
// width: 333px;
// margin-right: 33px;
// `;

// const ThumbnailImg = styled.img`
//     height: 100%;
//     width: 100%;
//     display: inline-block;
//     object-fit: cover;
//     object-position: center center;
// `;

// const DefaultButton = styled.button`
//     color: white;
//     border: none;
//     background-color: #434289;
//     border-radius: 333px;
//     padding: 7px 60px;
//     margin-top: 3%;
// `;

// const RightDiv = styled.div`
//     width: 42%;
// `;