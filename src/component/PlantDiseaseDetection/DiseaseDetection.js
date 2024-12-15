import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Form from "./Form";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [result, setResult] = useState(""); // Store the detection result

  // Function to handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the uploaded file
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Create a form data object to send the image to the backend
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Make the API call to Flask backend
      const response = await fetch("http://localhost:3000/detect", {
        // Adjust the URL based on your Flask server setup
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result); // Assuming the result is returned in this format
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <StyledContainer>
      <div>
        <Title data-testid="title" >Check Your Plant Health</Title> {/* Add a title here */}
        <Form handleImageChange={handleImageChange} />{" "}
        {/* Pass the handler to Form */}
        <Button testId={"submit-button-disease-detection"} children=""  onClick={handleSubmit} /> {/* Trigger the form submission */}
        {result && <Result>{result}</Result>}{" "}
        {/* Display the result if available */}
      </div>
    </StyledContainer>
  );
};

// Styled components for title and result display
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  block-size: 100vh;
  background-image: url("/path/to/your/background.jpg");
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  color: #2e8b57; /* Green color */
  font-size: 48px;
  margin-block-end: 20px;
  text-align: center;
`;

const Result = styled.p`
  margin-block-start: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export default DiseaseDetection;