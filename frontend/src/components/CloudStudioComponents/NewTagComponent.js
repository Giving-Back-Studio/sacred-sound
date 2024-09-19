import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

function NewTagComponent({ onTagsChange, value, style }) {
    // Directly use the value as the array of tags
    const [listOfTags, setListOfTags] = useState(() => {
        // Initialize state from value prop
        if (Array.isArray(value)) {
            return value;
        } else if (typeof value === 'string') {
            return value.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        return [];
    });

    const tagArray = [
        "Acapella",
        "Acoustic",
        "Electronic",
        "Ambient",
        "Meditation",
        "Classical", 
        "Spoken Word",
        "Dance",
        "Vocal",
        "Piano",
        "Hang Drum",
        "Guitar",
        "Percussion",
        "Harp",
        "Full Band",
        "DJ",
        "Santo Daime",
        "Rainbow",
        "Alianca",
        "English", 
        "Mantra",
        "Portuguese",
        "Brazilian",
        "Hebrew",
        "Water",
        "Earth",
        "Fire",
        "Air",
        "Oxum",
        "Yemanja",
        "Ayahuasca",
    ];

    useEffect(() => {
        if (Array.isArray(value)) {
            setListOfTags(value);
        } else if (typeof value === 'string') {
            setListOfTags(value.split(',').map(tag => tag.trim()).filter(tag => tag));
        }
    }, [value]);

    const handleTagClick = (tag) => {
    if (!listOfTags.includes(tag)) {
        const updatedTags = [...listOfTags, tag];
        setListOfTags(updatedTags);
        // Create a simulated event object
        const event = {
            target: {
                name: 'tags', // Assuming 'tags' is the name of your form field
                value: updatedTags.join(', ') // Join the array into a string
            }
        };
        onTagsChange(event); // Pass the simulated event to the parent component
    }
};

    const handleTextareaChange = (e) => {
        const tags = e.target.value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag); // Split and clean tags, removing empty ones
        setListOfTags(tags);
        onTagsChange(tags); // Pass array to parent
    };


    return (
        <>
            <Container>
                <label>Tags</label>
                <TextArea
                    rows={4}
                    value={listOfTags.join(', ')} // Join array for display
                    onChange={handleTextareaChange}
                    placeholder="Enter tags separated by commas."
                />
                <TagContainer>
                    {tagArray.map((tag, index) => (
                        <Tag
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            role="button" // For accessibility
                            aria-label={`Add tag ${tag}`}
                        >
                            {tag}
                        </Tag>
                    ))}
                </TagContainer>
            </Container>
        </>
    );
}

export default NewTagComponent;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const TagContainer = styled.div`
margin-top: 3vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Tag = styled.div`
    padding: 12px;
    cursor: pointer;
    margin: 5px;
    border-radius: 33px;
    margin-right: 0;
    background-color: #F5F5F5;
`;

const TextArea = styled.textarea`
    border: 1px solid gray;
    width: 100%;
    resize: vertical; 
    color: #434289;
    padding: 22px;
`;
