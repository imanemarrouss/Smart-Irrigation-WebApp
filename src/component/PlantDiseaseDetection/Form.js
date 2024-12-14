import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./Button";
import backgroundImage from "./bgg.webp";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // State to hold the image preview
  const [result, setResult] = useState(null); // State to hold the prediction result
  const [advice, setAdvice] = useState(""); // State to hold advice based on prediction

  // Cleanup function for preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview); // Cleanup the object URL
      }
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/detect",
        formData,
        {
          // Update the URL to match your Flask backend
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const {
        predictedClass,
        confidenceScore,
        advice: generatedAdvice,
      } = response.data; // Destructure advice from the response

      setResult({
        predictedClass,
        confidenceScore: (confidenceScore * 100).toFixed(2),
      });

      // Set advice based on the received advice from the backend
      setAdvice(generatedAdvice);
    } catch (error) {
      console.error("Error during detection:", error);
      alert(
        "There was an issue processing your image. Please try again later."
      );
    }
  };

  return (
    <StyledWrapper>
      <div className="background" />
      <div className="content">
        <h1 className="title">Check Your Plant's Health</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file" className="custum-file-upload">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    fill=""
                  />
                </g>
              </svg>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input id="file" type="file" onChange={handleFileChange} />
          </label>
          <Button type="submit">Get Detection Result</Button>
        </form>
        {result && (
          <ResultBox>
            <div className="image-container">
              <img src={preview} alt="Uploaded Preview" />
            </div>
            <div className="result-details">
              <h2>Detection Result</h2>
              <p>
                <strong>Predicted Class:</strong> {result.predictedClass}
              </p>
              <p>
                <strong>Confidence:</strong> {result.confidenceScore}%
              </p>
              <p>
                <strong>Advice:</strong> {advice}
              </p>
            </div>
          </ResultBox>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex; // Flexbox for centering
  flex-direction: column; // Stack elements vertically
  align-items: center; // Center align elements

  .background {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px);
    z-index: 1;
    inline-size: 100vw;
    block-size: 100vh;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    block-size: 100vh;
    padding: 20px;
  }

  .title {
    font-size: 3rem;
    color: #00a36c;
    margin-block-end: 20px;
    text-align: center;
    font-family: "Arial", sans-serif;
    font-weight: bold;
    text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4);
  }

  .custum-file-upload {
    block-size: 200px;
    inline-size: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px dashed #e8e8e8;
    background-color: rgba(33, 33, 33, 0.8);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
    margin-block-end: 20px;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    block-size: 80px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #e8e8e8;
  }

  .custum-file-upload input {
    display: none;
  }

  .advice {
    font-size: 1.2rem;
    color: #28a745;
  }
  h2 {
    color: #00a36c;
    margin-block-start: 20px;
  }
  p {
    font-size: 1.1rem;
    margin: 5px 0;
  }
`;
const ResultBox = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  color: #333;

  .image-container {
    flex: 1;
    margin-right: 20px;
  }

  .image-container img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .result-details {
    flex: 2;
    text-align: left;
  }

  h2 {
    font-size: 2rem;
    color: #2a9d8f;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  .advice {
    font-size: 1.1rem;
    color: #020302;
    margin-top: 20px;
  }

  strong {
    font-weight: 600;
    color: #333;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .image-container {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`;

export default Form;
