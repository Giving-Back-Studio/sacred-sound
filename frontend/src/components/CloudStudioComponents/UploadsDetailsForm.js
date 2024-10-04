import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import FileProgressBar from './FileProgressBar';
import { v4 } from 'uuid';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import TagComponent from '../CloudStudioComponents/NewTagComponent';
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook
import WhiteEditIcon from '../../assets/WhiteEditIcon.png';

const UploadDetailsForm = ({ file, trackDetails, progress, videoId, onTrackDetailChange, handleDelete, index }) => {
    const { userEmail } = useAuth(); // Use the custom hook to get the user's email

    const inputId = `coverImage-${index}`; // Unique ID for each input

    const [coverImage, setCoverImage] = useState(null);
    const handleCoverChange = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl); // Set the state with the URL
            uploadAlbumPicture(file, videoId); // Continue with your existing upload logic
        }
    };

    const uploadAlbumPicture = (file, videoId) => {
        if (file == null) {
            console.log("profilePicture was null");
            return;
        }
        const fileUploadName = v4();
        const fileRef = ref(storage, `thumbnails/${userEmail}/${fileUploadName}`);
        const metadata = {
            contentType: 'image/jpeg',
        };
        uploadBytes(fileRef, file, metadata)
            .then(() => {
                getDownloadURL(fileRef)
                    .then((url) => {
                        postCoverImage(url, videoId);
                        setCoverImage(url); // Update the profilePicture state with the new URL
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const postCoverImage = (url, videoId) => {
        console.log("postCoverImage :", url, videoId);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postCoverImage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                videoId: videoId,
                selectedImageThumbnail: url,
            }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };

    // The form useState:
    const [formData, setFormData] = useState({
        title: trackDetails.title || '',
        description: trackDetails.description || '',
        tags: trackDetails.tags || '',
        category: trackDetails.category || '',
        visibility: trackDetails.visibility || 'true',
        selectedImageThumbnail: trackDetails.selectedImageThumbnail || '',
    });

    const handleInputChange = (event) => {
        const { name, value } = typeof event === 'string' ? { name: 'tags', value: event } : event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        if (name === 'tags') {
            onTrackDetailChange(videoId, name, value.split(', ')); // Split the string back into an array for tags
        } else {
            onTrackDetailChange(videoId, name, value);
        }
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            album: trackDetails.albumId || ''
        }));
    }, [trackDetails.albumId]);

    useEffect(() => {
        console.log("Updated formData: ", formData);
    }, [formData]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '3%', border: '1px solid #BDBDBD' }}>
            <FileProgressBar 
                file={file.data}
                progress={progress}
            />
            <form style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                    <CoverContainer>
                        <TrackCoverInput
                            onClick={() => document.getElementById(inputId).click()}
                            image={coverImage}
                        >
                            {!coverImage && <span>Upload Cover Image</span>}
                            {coverImage !== null && (
                                <EditCoverButton
                                    onClick={() => document.getElementById(inputId).click()}
                                />
                            )}
                        </TrackCoverInput>
                        <input 
                            style={{ display: 'none' }}
                            id={inputId}
                            type="file" 
                            accept="image/*" 
                            onChange={handleCoverChange}
                        />
                    </CoverContainer>
                    
                    <UploadsDetailsLabel>Title</UploadsDetailsLabel>
                    <UploadDetailsTextInput 
                        type="text"
                        placeholder="Write a catchy title for the content"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <UploadsDetailsLabel>Description</UploadsDetailsLabel>
                    <UploadDetailsTextInput 
                        style={{ height: '86px' }}
                        type="text"
                        placeholder="What describes this track"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <UploadsDetailsLabel>Visibility</UploadsDetailsLabel>
                    <UploadDetailsSelectInput 
                        name="visibility"
                        value={formData.visibility}
                        onChange={handleInputChange}
                        style={{ marginBottom: '3vh' }}
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </UploadDetailsSelectInput>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginRight: '3vw' }}>
                    <UploadsDetailsLabel style={{ marginTop: '3vh' }}>Category</UploadsDetailsLabel>
                    <UploadDetailsSelectInput 
                        style={{ marginBottom: '3vh' }}
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="Studio recording">Studio recording</option>
                        <option value="Music video">Music video</option>
                        <option value="Meditation">Meditation</option>
                        <option value="DJ set">DJ set</option>
                        <option value="Behind the scenes">Behind the scenes</option>
                        <option value="Concert">Concert</option>
                        <option value="Video lesson">Video lesson</option>
                    </UploadDetailsSelectInput>
                </div>
            </form>
        </div>
    );
};

export default UploadDetailsForm;

const TrackCoverInput = styled.div`
    width: 70%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.image ? 'transparent' : '#f0f0f0'};
    background-image: url(${props => props.image});
    background-size: contain; /* or 'cover' */
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    margin-bottom: 3vh;
    margin-top: 3vh;
    margin-left: 3vw;
    position: relative;

    span {
        text-align: center;  // Center text horizontally within the span
    }
`;

const EditCoverButton = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    background-image: url(${WhiteEditIcon});
    background-size: cover;
    cursor: pointer;
    background-color: transparent;
`;

const UploadsDetailsLabel = styled.label`
    margin-left: 3vw;
`;

const UploadDetailsTextInput = styled.input`
    margin-left: 3vw;
    margin-bottom: 3vh;
    padding: 22px;
    border: 2px solid #D9D9D9;
    :focus {
        outline: none;
        border: 2px solid #434289;
    }
`;

const UploadDetailsSelectInput = styled.select`
    margin-left: 3vw;
    padding: 22px;
    border: 2px solid #D9D9D9;
    :focus {
        outline: none;
        border: 2px solid #434289;
    }
`;

const CoverContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;