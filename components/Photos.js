// components/Photos.js
import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Header from "./Header";
import { useTheme } from "./ThemeContext"; // Import the ThemeContext

// Global styles
const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) => (props.theme === "dark" ? "#121212" : "#ffffff")};
        color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
        transition: background-color 0.3s ease, color 0.3s ease;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const PreviewContainer = styled.div`
    padding: 50px;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.theme === "dark" ? "#1c1c1c" : "#f8f9fa")}; /* Change background based on theme */
`;

const StyledIframe = styled.iframe`
    width: 250px;
    height: 250px;
    border: none;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
    animation: ${fadeIn} 0.5s forwards; /* Fade-in animation */
    pointer-events: none; /* Disable pointer events */

    &::-webkit-scrollbar {
        display: none; /* Hide scrollbar */
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Darker shadow */
        filter: brightness(1.05); /* Slightly brighten the image */
    }
`;

const ImageWrapper = styled.div`
    cursor: pointer; /* Indicate that the div is clickable */
    overflow: hidden; /* Ensures that the iframe doesn't overflow */
`;

const LightboxOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent gray */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const LightboxImage = styled.iframe`
    width: 80%; /* Responsive width */
    height: 80%; /* Responsive height */
    border: none;
    border-radius: 10px; /* Optional: rounded corners */
`;

const LoadingSpinner = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function Photos() {
    const { theme } = useTheme(); // Use the theme context
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [loading, setLoading] = useState(false);

    const images = [
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        "https://drive.google.com/file/d/16BOiwguRODQJTIZ9e_USYidzivDgkiRn/preview",
        
    ];

    const openLightbox = (src) => {
        setLoading(true);
        setCurrentImage(src);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setCurrentImage("");
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <GlobalStyle theme={theme} />
            <PreviewContainer theme={theme}>
                {images.map((src, index) => (
                    <ImageWrapper key={index} onClick={() => openLightbox(src)}>
                        <StyledIframe src={src} />
                    </ImageWrapper>
                ))}
            </PreviewContainer>
            {lightboxOpen && (
                <LightboxOverlay onClick={closeLightbox}>
                    <LightboxImage src={currentImage} onLoad={handleImageLoad} />
                </LightboxOverlay>
            )}
        </>
    );
}
