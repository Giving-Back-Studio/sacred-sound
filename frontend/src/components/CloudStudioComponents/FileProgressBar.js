import React from 'react';
import styled from "styled-components";
import uploadEditIcon from '../../assets/uploadEditIcon.png';
import uploadHamburgerIcon from '../../assets/uploadHamburgerIcon.png';
import uploadTrashIcon from '../../assets/uploadTrashIcon.png';

const FileProgressBar = ({ file, progress, onDelete }) => {
    return (
        <FileUploadStatus>
            <ProgressIndicator progress={progress} />
            {/* Making a conditionnal rendering based on the same onDelete props that is sometimes not being passed to hide the delete and hamburger icon */}
            {onDelete && (<img src={uploadHamburgerIcon} alt="" />)}
            <FileName dir="ltr">{file.name}</FileName>
            {onDelete && (
                <img 
                    src={uploadTrashIcon} 
                    alt="Delete" 
                    style={{marginRight: '25px', zIndex: '21', cursor: 'pointer'}} 
                    onClick={onDelete}
                />
            )}
        </FileUploadStatus>
    );
};

const FileUploadStatus = styled.div`
    position: relative; // Needed for absolute positioning of children
    padding-top: 5px; // Space for the progress bar at the top
    background-color: #F5F5F5;
    padding: 22px;
    border: 1px solid #D9D9D9;
    display: flex;
    justify-content: space-between;
`;

const ProgressIndicator = styled.div`
    background-color: #434289; // Blue color for the progress bar color:
    width: ${props => props.progress}%;
    height: 6px; // Thin line for the progress bar
    transition: width 0.4s ease;
    position: absolute; // Align with the top of FileUploadStatus
    top: 0;
    left: 0;
`;

const FileName = styled.span`
    color: #333; // Text color, change as needed
    font-size: 20px; // Adjust as per your design
    flex-grow: 1; // Allow the filename to fill the space
    margin: 0 10px; // Add some margin to avoid overlap with the icons
    overflow: hidden; // Hide overflow
    white-space: nowrap; // Prevent wrapping to a new line
    text-overflow: ellipsis; // Add ellipsis for overflowed text
    margin-left: 3vw;
    margin-right: 3vw;
`;


export default FileProgressBar;
