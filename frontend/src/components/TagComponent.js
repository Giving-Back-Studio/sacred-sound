// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { GlobalStyle } from './GlobalStyle';

// //Remplaced by NewTagComponent in JAN2024

// function TagComponent({ onTagsChange, value }) {
//     const [listOfTags, setListOfTags] = useState(value); 
//     const [textAreaClicked, setTextAreaClicked] = useState(false);
//     const [showListOfTags, setShowListOfTags] = useState(false);

//     const tagArray = [
//         "Rock",
//         "Pop",
//         "HipHop",
//         "Jazz",
//         "Blues",
//         "Country",
//         "Classical",
//         "R&B",
//         "Reggae",
//         "Electronic",
//         "Folk",
//         "Metal",
//         "Punk",
//         "Soul",
//         "Funk",
//         "Disco",
//         "Alternative",
//         "Indie",
//         "Rap",
//         "Techno",
//         "Dance",
//         "Gospel",
//         "Ska",
//         "House",
//         "Trance",
//         "EDM",
//         "Latin",
//         "Dubstep",
//         "Chill",
//         "Ambient",
//         "Reggaeton",
//         "Hiphop",
//         "Trap",
//         "K-Pop",
//         "RapRock",
//         "Grunge",
//         "HardRock",
//         "Acoustic",
//     ];

//   const handleTagChoiceClick = (tag) => {
//         setListOfTags((prevTag) => {
//             if (!prevTag.includes(tag)) {
//                 const newTags = prevTag ? prevTag + ', ' + tag : tag;
//                 onTagsChange(newTags); // Notify the parent component of the updated tags
//                 return newTags;
//             }
//             return prevTag;
//         });
//     };


//     const handleInterestInputClick = () => {
//         setShowListOfTags(true);
//         if (!textAreaClicked) {
//         setTextAreaClicked(true);
//         }
//     };

//     return (
//         <>
//         <GlobalStyle/>
//         <h3>Add Tags to help others find your content.</h3>
//         <Container>
//             <TextArea
//                 rows={textAreaClicked ? 5 : 1}
//                 value={listOfTags}
//                 onChange={(e) => setListOfTags(e.target.value)}
//                 onClick={handleInterestInputClick}
//                 onFocus={handleInterestInputClick}
//                 />
//             {showListOfTags && <TagContainer>
//             {tagArray.map((tag, index) => (
//                 <Tag
//                     key={index}
//                     onClick={(e) => {
//                         e.stopPropagation(); // Prevent the click event from propagating
//                         handleTagChoiceClick(tag);
//                     }}
//                 >
//                     {tag}
//                 </Tag>
//             ))}
//             </TagContainer>
//             }
//         </Container>

//         </>
//     );
// }

// export default TagComponent;

// const Container = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     width: 105%;
// `;

// const TagContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     width: 105%;
// `;

// const Tag = styled.div`
// padding: 5px;
//   cursor: pointer;
//   border: 1px solid #434289;
//   margin: 5px;
//   border-radius: 33px;

//   &:hover {
//     background-color: #434289;
//     color: white;
//     border: 1px solid #434289;
//   }
// `;

// const TextArea = styled.textarea`
//     flex: 1;
//     padding: 5px;
//     border: 1px solid gray;
//     width: 105%;
//     resize: vertical; 
//     color: #434289;
//     border-radius: 33px;
//     padding: 22px;
//     :focus {
//             outline: none;
//             border: 2px solid #434289;
//         }
// `;
