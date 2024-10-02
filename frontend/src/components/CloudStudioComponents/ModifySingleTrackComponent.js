import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import { v4 } from 'uuid';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import TagComponent from '../CloudStudioComponents/NewTagComponent';
import WhiteEditIcon from '../../assets/WhiteEditIcon.png';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

const ModifySingleTrackComponent = () => { 
    const { userEmail } = useAuth(); // Use the Auth context to get userEmail
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Music video',
        tags: [],
        visibility: '',
    });
    const [formError, setFormError] = useState('');
    const [videoURL, setVideoURL] = useState('');//Disabled to match design
    const [videoUrlRetrived, setVideoUrlRetrived] = useState(false);//Disabled to match design
    const [selectedImageSource, setSelectedImageSource] = useState("previewImage");
    const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState('');// Necessary for passing the url of the Track's image to MongoDB

    useEffect(() => {
        const fetchVideosURL = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/getContentById`,
                    {
                        params: {
                            videoId: videoId,
                        },
                    }
                );
                console.log("getContentById - response.data: ", response.data);
                setVideoURL(response.data.contentDocument.fileUrl);
                setVideoUrlRetrived(true);
            } catch (error) {
                console.error(error);
                setVideoUrlRetrived(false);
            }
        };
        fetchVideosURL();
    }, []); //When it's not broken don't fix it.

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/getContentById`,
                    { params: { videoId: videoId } }
                );
                const contentData = response.data.contentDocument;
                console.log("contentData: ", contentData);
                setFormData({
                    title: contentData.title || '',
                    description: contentData.description || '',
                    category: contentData.category || 'Music video',
                    tags: contentData.tags,
                    visibility: contentData.visibility || 'Public',
                });
                setUploadedThumbnailUrl(contentData.selectedImageThumbnail); // Set selected image thumbnail URL
            } catch (error) {
                console.error(error);
            }
        };
        fetchContentData(); // Call the function when the component mounts
    }, [videoId]);

    const handleCloseClick = () => {
        navigate('/studio');
    };

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/deleteContent`, {
            params: { videoId },
            headers: {
                'user-id': userEmail // Setting the custom header for user ID
            }
        })
        .then(response => {
            navigate('/studio');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const uploadImageThumbnail = async (file) => {
        if (!file) {
            console.log("No file provided for upload.");
            return;
        }
        const fileUploadName = v4();
        const fileRef = ref(storage, `thumbnails/${userEmail}/${fileUploadName}`);

        try {
            await uploadBytes(fileRef, file, { contentType: file.type });
            const url = await getDownloadURL(fileRef);

            // Update MongoDB with the new image URL
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateTrackThumbnail`, {
                videoId: videoId,
                thumbnailUrl: url,
            });
            console.log('setUploadedThumbnailUrl(url) :', url);
            setUploadedThumbnailUrl(url); // Update state if needed
        } catch (error) {
            console.error("Error in image upload: ", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const dragOverHandler = (event) => {
        // Prevent the browser's default behavior when dragging over
        event.preventDefault();
    };

    const fileChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file type:", file.type); // Log the file type
            setUploadedThumbnailUrl(file);
            uploadImageThumbnail(file); // Pass the file directly
        }
    };

    const dropHandler = (event) => {
        // Prevent the browser from opening the file
        event.preventDefault();

        let file;
        if (event.dataTransfer.items) {
            // Use DataTransferItemList to get the file
            if (event.dataTransfer.items[0].kind === 'file') {
                file = event.dataTransfer.items[0].getAsFile();
            }
        } else {
            // Use DataTransfer to get the file
            file = event.dataTransfer.files[0];
        }

        // Check if a file is actually selected
        if (file && file.type.match('image.*')) {
            setUploadedThumbnailUrl(file); // Update your state with the new file
            uploadImageThumbnail(file); // Pass the file directly
            console.log('Profile image dropped:', file.name);
        } else {
            console.log('File is not an image:', file.name);
        }

        // Clear the drag data cache
        if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
        } else {
            event.dataTransfer.clearData();
        }
    };

    const handleTagsChange = (event) => {
        const { name, value } = typeof event === 'string' ? { name: 'tags', value: event } : event.target;
        if (name === 'tags') {
            const tagsArray = value.split(',').map(tag => tag.trim()); // Trim whitespace
            setFormData(prevFormData => ({ ...prevFormData, [name]: tagsArray }));
        } else {
            setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateContentMetaData`, {
                videoId: videoId,
                b_isPreparedForReview: true,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                tags: formData.tags,
                // The image URL is already updated separately
            });
            console.log('ContentMetaData updated successfully');
            navigate('/studio');
        } catch (error) {
            setFormError('An error occurred while updating the ContentMetaData');
            console.error(error);
        }
    };

    return (
        <>
            <GlobalStyle />
            <MainDiv>
                <CustomForm onSubmit={handleSubmit}>
                    <Header>
                        <CloseButton onClick={handleCloseClick}>
                            Close
                        </CloseButton>  
                        <button style={{display:'flex', flexDirection:'row-reverse', marginRight:'5vw'}} type="submit">
                            Publish
                        </button>
                    </Header>
                    <h1 style={{marginLeft:'3vw'}}>Track details</h1>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100vw'}}>
                        <LeftDiv>
                            <UploadProfileImageContainer 
                                onClick={() => document.getElementById('file-input').click()}
                                onDrop={dropHandler}
                                onDragOver={dragOverHandler}
                            >
                                {!uploadedThumbnailUrl && (
                                    <span>Change Cover Image</span>
                                )}
                                {uploadedThumbnailUrl && (
                                    <>
                                        <img src={uploadedThumbnailUrl} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <EditCoverButton/>
                                    </>
                                )}
                                <input type="file" accept="image/*" id="file-input" hidden onChange={fileChangeHandler} />
                            </UploadProfileImageContainer>
                            
                            <CustomLabel>Title</CustomLabel>
                            <CustomInput placeholder="Write a catchy title for the content" id="title" name="title" value={formData.title} onChange={handleInputChange} required ></CustomInput>
                            <CustomLabel>Description</CustomLabel>
                            <DescriptionTextArea placeholder='What describes this track' id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                        </LeftDiv>
                        <RightDiv>
                            <CustomLabel htmlFor='category'>Category</CustomLabel>
                            <CustomSelect id="category" name="category" value={formData.category} onChange={handleInputChange}>
                                <option value="Studio recording">Studio recording</option>
                                <option value="Music video">Music video</option>
                                <option value="Meditation">Meditation</option>
                                <option value="DJ set">DJ set</option>
                                <option value="Behind the scenes">Behind the scenes</option>
                                <option value="Concert">Concert</option>
                                <option value="Video lesson">Video lesson</option>
                            </CustomSelect>
                        </RightDiv>
                    </div>
                    
                    <div>
                        {formError && <p style={{ color: 'red' }}>{formError}</p>}
                    </div>
                </CustomForm>
            </MainDiv>
        </>
    );
};

export default ModifySingleTrackComponent;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const LeftDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 45%;
    margin-left: 3%;
    z-index: 2;
`;

const RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
    margin-right: 3%;
`;

const CustomForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CustomInput = styled.input`
    padding: 22px;
    width: 90%;
    margin-top: 2%;
    border: 2px solid #D9D9D9;
    :focus {
        outline: none;
        border: 2px solid #434289;
    }
`;

const CustomLabel = styled.label`
    margin-top: 3%;
`;

const DescriptionTextArea = styled.textarea`
    width: 90%;
    height: 86px; /* Adjusted height to fit two lines of text including padding */
    padding: 22px;
    font-size: 14px; /* reaffirmed for clarity, though it's set globally */
    line-height: 1.5; /* assuming the default, but now explicitly set for consistency */
    resize: none;
    border: 2px solid #D9D9D9;
    color: #434289;
    :focus {
        outline: none;
        border: 2px solid #434289;
    }
`;

const CustomSelect = styled.select`
    padding: 22px;
    width: 90%;
    margin-top: 2%;
    margin-bottom: 5%; //Adjustement for disabling ImageThumbnails
    border: 2px solid #D9D9D9;
    :focus {
        outline: none;
        border: 2px solid #434289;
    }
`;

const UploadProfileImageContainer = styled.div`
    height: 200px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    position: relative;
    background-color: ${props => props.image ? 'transparent' : '#F5F5F5'};
    background-image: url(${props => props.image});
`;

const Header = styled.div`
    width: 100%;
    height: 12vh;
    box-shadow: rgb(0 0 0 / 30%) 0px 4px 4px -2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CloseButton = styled.button`
    background-color: rgb(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 18px;
    color: rgb(67, 66, 137);
    text-decoration: underline;
    margin-left: 3vw;
    padding: 0px;
`;

const EditCoverButton = styled.div`
    position: absolute;
    top: 12px; // Adjust as needed
    right: 12px; // Adjust as needed
    width: 24px; // Adjust as needed
    height: 24px; // Adjust as needed
    background-image: url(${WhiteEditIcon});
    background-size: cover;
    cursor: pointer;
    background-color: transparent;
`;