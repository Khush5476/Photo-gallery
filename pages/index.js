import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { ThemeProvider, useTheme } from "@/components/ThemeContext"; // Import the ThemeContext
import Photos from "@/components/Photos";
import styled from "styled-components";

const Pad = styled.div`
    padding-top: 65px;
    display: flex;
    justify-content: center; /* Center the button horizontally */
        background-color: ${(props) => (props.theme === "dark" ? "#121212" : "#00000")};
        color: ${(props) => (props.theme === "dark" ? "#121212" : "#121212")};
`;

const Button = styled.button`
    background-color: ${(props) => (props.theme === "dark" ? "#aaaaaa" : "#121212")};
    color: ${(props) => (props.theme === "dark" ? "#555" : "#e0e0e0")};


    // background-color: "#e0e0e0";
    // color: "#121212"

    border: none;
    border-radius: 50px; /* Round the corners */
    padding: 10px 20px; /* Add some padding */
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    
    &:hover {
        background-color: ${(props) => (props.theme === "dark" ? "#555" : "#121212")};
        background-color: "#e0e0e0"
        
        transform: scale(1.05); /* Slightly enlarge on hover */
    }
`;

const inter = Inter({ subsets: ["latin"] });

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <Pad>
            <Button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
        </Pad>
    );
}

export default function Home() {
    return (
        <>
            <Header/>
            <ThemeProvider>
                <ThemeToggle />
                <Photos />
            </ThemeProvider>
        </>
    );
}
