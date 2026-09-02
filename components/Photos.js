
// components/Photos.js
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useTheme } from "./ThemeContext";

// ======================================================
// GLOBAL
// ======================================================

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        background: ${(props) =>
            props.theme === "dark" ? "#0b0d10" : "#f7f8fa"};
        color: ${(props) =>
            props.theme === "dark" ? "#ffffff" : "#111318"};
        transition: background 0.3s ease, color 0.3s ease;
    }
`;

// ======================================================
// ANIMATIONS
// ======================================================

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(25px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

// ======================================================
// PAGE
// ======================================================

const Page = styled.main`
    max-width: 1450px;
    margin: 0 auto;
    padding: 80px 40px 120px;

    @media (max-width: 700px) {
        padding: 50px 18px 80px;
    }
`;

// ======================================================
// INTRO
// ======================================================

const Intro = styled.section`
    max-width: 850px;
    margin: 0 auto 70px;
    text-align: center;
    animation: ${fadeUp} 0.7s ease;
`;

const Eyebrow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 18px;

    padding: 7px 13px;

    border-radius: 999px;

    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;

    color: ${(props) =>
        props.theme === "dark" ? "#cfd3da" : "#555b65"};

    background: ${(props) =>
        props.theme === "dark"
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.05)"};

    border: 1px solid
        ${(props) =>
            props.theme === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.07)"};
`;

const EyebrowDot = styled.span`
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: currentColor;
`;

const Title = styled.h1`
    margin: 0;

    font-size: clamp(42px, 6vw, 72px);
    line-height: 1;
    letter-spacing: -3px;
    font-weight: 750;

    color: ${(props) =>
        props.theme === "dark" ? "#ffffff" : "#101216"};

    @media (max-width: 600px) {
        letter-spacing: -2px;
    }
`;

const Description = styled.p`
    max-width: 700px;

    margin: 25px auto 0;

    font-size: 17px;
    line-height: 1.8;

    color: ${(props) =>
        props.theme === "dark" ? "#9da3ad" : "#666c75"};
`;

// ======================================================
// STATS
// ======================================================

const Stats = styled.div`
    display: flex;
    justify-content: center;
    gap: 45px;

    margin-top: 35px;

    @media (max-width: 500px) {
        gap: 25px;
    }
`;

const Stat = styled.div`
    text-align: center;
`;

const StatNumber = styled.div`
    font-size: 22px;
    font-weight: 700;

    color: ${(props) =>
        props.theme === "dark" ? "#ffffff" : "#111318"};
`;

const StatLabel = styled.div`
    margin-top: 4px;

    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;

    color: ${(props) =>
        props.theme === "dark" ? "#777e89" : "#8a9098"};
`;

// ======================================================
// FILTERS
// ======================================================

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 9px;

    margin-bottom: 35px;
`;

const FilterButton = styled.button`
    padding: 9px 16px;

    border-radius: 999px;

    border: 1px solid
        ${(props) =>
            props.active
                ? "transparent"
                : props.theme === "dark"
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.1)"};

    background: ${(props) =>
        props.active
            ? props.theme === "dark"
                ? "#ffffff"
                : "#111318"
            : props.theme === "dark"
            ? "rgba(255,255,255,0.04)"
            : "#ffffff"};

    color: ${(props) =>
        props.active
            ? props.theme === "dark"
                ? "#111318"
                : "#ffffff"
            : props.theme === "dark"
            ? "#b8bec7"
            : "#60656e"};

    font-size: 13px;
    font-weight: 600;

    cursor: pointer;

    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

// ======================================================
// FEATURED PROJECT
// ======================================================

const Featured = styled.div`
    position: relative;

    display: grid;
    grid-template-columns: 1.4fr 0.6fr;

    min-height: 430px;

    margin-bottom: 28px;

    overflow: hidden;

    border-radius: 22px;

    background: ${(props) =>
        props.theme === "dark" ? "#17191d" : "#ffffff"};

    border: 1px solid
        ${(props) =>
            props.theme === "dark"
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.06)"};

    box-shadow: ${(props) =>
        props.theme === "dark"
            ? "0 20px 60px rgba(0,0,0,0.25)"
            : "0 20px 60px rgba(0,0,0,0.08)"};

    @media (max-width: 850px) {
        grid-template-columns: 1fr;
    }
`;

const FeaturedImageWrapper = styled.div`
    position: relative;
    min-height: 430px;

    overflow: hidden;

    cursor: pointer;

    @media (max-width: 850px) {
        min-height: 330px;
    }
`;

const FeaturedImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

    transition: transform 0.7s ease;

    ${FeaturedImageWrapper}:hover & {
        transform: scale(1.035);
    }
`;

const FeaturedGradient = styled.div`
    position: absolute;
    inset: 0;

    background: linear-gradient(
        90deg,
        rgba(0,0,0,0.05),
        rgba(0,0,0,0.25)
    );

    pointer-events: none;
`;

const FeaturedContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 50px;

    @media (max-width: 850px) {
        padding: 35px;
    }
`;

const FeaturedLabel = styled.div`
    margin-bottom: 15px;

    font-size: 11px;
    font-weight: 700;

    letter-spacing: 1.4px;
    text-transform: uppercase;

    color: ${(props) =>
        props.theme === "dark" ? "#9da3ad" : "#747982"};
`;

const FeaturedTitle = styled.h2`
    margin: 0;

    font-size: clamp(28px, 3vw, 40px);
    letter-spacing: -1.3px;
`;

const FeaturedText = styled.p`
    margin: 17px 0 25px;

    font-size: 15px;
    line-height: 1.7;

    color: ${(props) =>
        props.theme === "dark" ? "#9da3ad" : "#666c75"};
`;

const FeaturedButton = styled.button`
    width: fit-content;

    padding: 11px 17px;

    border: none;
    border-radius: 9px;

    background: ${(props) =>
        props.theme === "dark" ? "#ffffff" : "#111318"};

    color: ${(props) =>
        props.theme === "dark" ? "#111318" : "#ffffff"};

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        opacity 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        opacity: 0.9;
    }
`;

// ======================================================
// GALLERY
// ======================================================

const Gallery = styled.div`
    columns: 3 300px;
    column-gap: 22px;

    @media (max-width: 950px) {
        columns: 2 280px;
    }

    @media (max-width: 600px) {
        columns: 1;
    }
`;

const Card = styled.article`
    position: relative;

    margin-bottom: 22px;

    overflow: hidden;

    break-inside: avoid;

    border-radius: 16px;

    background: ${(props) =>
        props.theme === "dark" ? "#17191d" : "#ffffff"};

    border: 1px solid
        ${(props) =>
            props.theme === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)"};

    box-shadow: ${(props) =>
        props.theme === "dark"
            ? "0 8px 25px rgba(0,0,0,0.2)"
            : "0 8px 25px rgba(0,0,0,0.06)"};

    cursor: pointer;

    animation: ${fadeUp} 0.6s ease both;

    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);

        box-shadow: ${(props) =>
            props.theme === "dark"
                ? "0 18px 40px rgba(0,0,0,0.35)"
                : "0 18px 40px rgba(0,0,0,0.13)"};
    }
`;

const CardImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
`;

const CardImage = styled.img`
    width: 100%;
    height: auto;

    display: block;

    transition:
        transform 0.55s ease,
        filter 0.55s ease;

    ${Card}:hover & {
        transform: scale(1.04);
        filter: brightness(0.72);
    }
`;

const CardOverlay = styled.div`
    position: absolute;

    inset: 0;

    display: flex;
    align-items: flex-end;

    padding: 20px;

    opacity: 0;

    background: linear-gradient(
        to top,
        rgba(0,0,0,0.7),
        transparent 60%
    );

    transition: opacity 0.3s ease;

    ${Card}:hover & {
        opacity: 1;
    }
`;

const ViewLabel = styled.span`
    padding: 8px 12px;

    border-radius: 999px;

    background: rgba(255,255,255,0.14);

    color: white;

    font-size: 11px;
    font-weight: 700;

    backdrop-filter: blur(10px);
`;

const CardInfo = styled.div`
    padding: 16px 18px 18px;
`;

const CardTitle = styled.h3`
    margin: 0 0 5px;

    font-size: 15px;
    font-weight: 700;

    color: ${(props) =>
        props.theme === "dark" ? "#ffffff" : "#16181c"};
`;

const CardCategory = styled.div`
    font-size: 11px;

    text-transform: uppercase;
    letter-spacing: 0.8px;

    color: ${(props) =>
        props.theme === "dark" ? "#777e89" : "#8a9098"};
`;

// ======================================================
// LIGHTBOX
// ======================================================

const Lightbox = styled.div`
    position: fixed;

    inset: 0;

    z-index: 9999;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px;

    background: rgba(5, 6, 8, 0.95);

    backdrop-filter: blur(15px);

    animation: ${fadeIn} 0.2s ease;

    cursor: zoom-out;
`;

const LightboxImage = styled.img`
    max-width: 90vw;
    max-height: 86vh;

    object-fit: contain;

    border-radius: 10px;

    box-shadow: 0 30px 100px rgba(0,0,0,0.6);

    animation: ${fadeUp} 0.25s ease;

    cursor: default;
`;

const CloseButton = styled.button`
    position: fixed;

    top: 25px;
    right: 25px;

    width: 44px;
    height: 44px;

    border: none;
    border-radius: 50%;

    background: rgba(255,255,255,0.1);

    color: white;

    font-size: 25px;

    cursor: pointer;

    backdrop-filter: blur(10px);

    transition: background 0.2s ease;

    &:hover {
        background: rgba(255,255,255,0.2);
    }
`;

const NavigationButton = styled.button`
    position: fixed;

    top: 50%;

    ${(props) => (props.left ? "left: 25px;" : "right: 25px;")}

    transform: translateY(-50%);

    width: 48px;
    height: 48px;

    border: none;
    border-radius: 50%;

    background: rgba(255,255,255,0.1);

    color: white;

    font-size: 28px;

    cursor: pointer;

    backdrop-filter: blur(10px);

    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-50%) scale(1.05);
    }

    @media (max-width: 600px) {
        ${(props) => (props.left ? "left: 12px;" : "right: 12px;")}
    }
`;

const Counter = styled.div`
    position: fixed;

    bottom: 24px;
    left: 50%;

    transform: translateX(-50%);

    padding: 8px 14px;

    border-radius: 999px;

    background: rgba(255,255,255,0.1);

    color: rgba(255,255,255,0.85);

    font-size: 12px;

    backdrop-filter: blur(10px);
`;

const Spinner = styled.div`
    position: fixed;

    width: 40px;
    height: 40px;

    border-radius: 50%;

    border: 3px solid rgba(255,255,255,0.2);
    border-top-color: white;

    animation: ${spin} 0.8s linear infinite;
`;

// ======================================================
// COMPONENT
// ======================================================

export default function Photos() {
    const { theme } = useTheme();

    const [filter, setFilter] = useState("All");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    // ==================================================
    // PROJECT PHOTOS
    // ==================================================

    const images = [
        {
            src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=90",
            title: "Robotics Project",
            category: "Robotics",
            description:
                "Designing and building intelligent robotic systems.",
        },
        {
            src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=90",
            title: "Engineering",
            category: "Engineering",
        },
        {
            src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=90",
            title: "Hardware & Technology",
            category: "Engineering",
        },
        {
            src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=90",
            title: "Development",
            category: "Programming",
        },
        {
            src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=90",
            title: "Computer Science",
            category: "Programming",
        },
        {
            src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=90",
            title: "Software Development",
            category: "Programming",
        },
        {
            src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=90",
            title: "Technology",
            category: "Technology",
        },
        {
            src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=90",
            title: "Project Design",
            category: "Engineering",
        },
        {
            src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=90",
            title: "Programming",
            category: "Programming",
        },
    ];

    // ==================================================
    // FILTER
    // ==================================================

    const categories = [
        "All",
        ...new Set(images.map((image) => image.category)),
    ];

    const filteredImages =
        filter === "All"
            ? images
            : images.filter((image) => image.category === filter);

    // ==================================================
    // LIGHTBOX
    // ==================================================

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLoading(true);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setLoading(false);
    };

    const nextImage = (event) => {
        event.stopPropagation();

        setLoading(true);

        setCurrentIndex((prev) =>
            prev === filteredImages.length - 1 ? 0 : prev + 1
        );
    };

    const previousImage = (event) => {
        event.stopPropagation();

        setLoading(true);

        setCurrentIndex((prev) =>
            prev === 0 ? filteredImages.length - 1 : prev - 1
        );
    };

    // ==================================================
    // KEYBOARD CONTROLS
    // ==================================================

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!lightboxOpen) return;

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                setLoading(true);

                setCurrentIndex((prev) =>
                    prev === filteredImages.length - 1 ? 0 : prev + 1
                );
            }

            if (event.key === "ArrowLeft") {
                setLoading(true);

                setCurrentIndex((prev) =>
                    prev === 0 ? filteredImages.length - 1 : prev - 1
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxOpen, filteredImages.length]);

    // ==================================================
    // RENDER
    // ==================================================

    return (
        <>
            <GlobalStyle theme={theme} />

            <Page>

                {/* ================= INTRO ================= */}

                <Intro>
                    <Eyebrow theme={theme}>
                        <EyebrowDot />
                        Selected Work
                    </Eyebrow>

                    <Title theme={theme}>
                        Project Gallery
                    </Title>

                    <Description theme={theme}>
                        A visual collection of projects, experiments,
                        robotics builds, and software development.
                        Each project represents an opportunity to
                        learn, build, and solve real problems.
                    </Description>

                    <Stats>
                        <Stat>
                            <StatNumber theme={theme}>
                                {images.length}
                            </StatNumber>

                            <StatLabel theme={theme}>
                                Projects
                            </StatLabel>
                        </Stat>

                        <Stat>
                            <StatNumber theme={theme}>
                                4
                            </StatNumber>

                            <StatLabel theme={theme}>
                                Categories
                            </StatLabel>
                        </Stat>

                        <Stat>
                            <StatNumber theme={theme}>
                                ∞
                            </StatNumber>

                            <StatLabel theme={theme}>
                                Ideas
                            </StatLabel>
                        </Stat>
                    </Stats>
                </Intro>

                {/* ================= FILTERS ================= */}

                <FilterContainer>
                    {categories.map((category) => (
                        <FilterButton
                            key={category}
                            theme={theme}
                            active={filter === category}
                            onClick={() => {
                                setFilter(category);
                                setCurrentIndex(0);
                            }}
                        >
                            {category}
                        </FilterButton>
                    ))}
                </FilterContainer>

                {/* ================= FEATURED ================= */}

                {filter === "All" && (
                    <Featured theme={theme}>

                        <FeaturedImageWrapper
                            onClick={() => openLightbox(0)}
                        >
                            <FeaturedImage
                                src={images[0].src}
                                alt={images[0].title}
                            />

                            <FeaturedGradient />
                        </FeaturedImageWrapper>

                        <FeaturedContent>
                            <FeaturedLabel theme={theme}>
                                Featured Project
                            </FeaturedLabel>

                            <FeaturedTitle>
                                {images[0].title}
                            </FeaturedTitle>

                            <FeaturedText theme={theme}>
                                {images[0].description}
                            </FeaturedText>

                            <FeaturedButton
                                theme={theme}
                                onClick={() => openLightbox(0)}
                            >
                                View Project →
                            </FeaturedButton>
                        </FeaturedContent>

                    </Featured>
                )}

                {/* ================= GALLERY ================= */}

                <Gallery>
                    {filteredImages
                        .map((image, index) => ({ image, index }))
                        .filter(({ index }) => filter !== "All" || index !== 0)
                        .map(({ image, index }, displayIndex) => (
                            <Card
                                key={image.src}
                                theme={theme}
                                style={{
                                    animationDelay:
                                        `${displayIndex * 0.06}s`,
                                }}
                                onClick={() => {
                                    setCurrentIndex(
                                        filter === "All"
                                            ? index
                                            : displayIndex
                                    );

                                    setLoading(true);
                                    setLightboxOpen(true);
                                }}
                            >
                                <CardImageWrapper>
                                    <CardImage
                                        src={image.src}
                                        alt={image.title}
                                        loading="lazy"
                                    />

                                    <CardOverlay>
                                        <ViewLabel>
                                            View Photo →
                                        </ViewLabel>
                                    </CardOverlay>
                                </CardImageWrapper>

                                <CardInfo>
                                    <CardTitle theme={theme}>
                                        {image.title}
                                    </CardTitle>

                                    <CardCategory theme={theme}>
                                        {image.category}
                                    </CardCategory>
                                </CardInfo>
                            </Card>
                        ))}
                </Gallery>

            </Page>

            {/* ================= LIGHTBOX ================= */}

            {lightboxOpen && filteredImages.length > 0 && (
                <Lightbox onClick={closeLightbox}>

                    <CloseButton
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        ×
                    </CloseButton>

                    {loading && <Spinner />}

                    <LightboxImage
                        src={filteredImages[currentIndex].src}
                        alt={filteredImages[currentIndex].title}
                        onLoad={() => setLoading(false)}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    />

                    <NavigationButton
                        left
                        onClick={previousImage}
                        aria-label="Previous image"
                    >
                        ‹
                    </NavigationButton>

                    <NavigationButton
                        onClick={nextImage}
                        aria-label="Next image"
                    >
                        ›
                    </NavigationButton>

                    <Counter>
                        {currentIndex + 1} / {filteredImages.length}
                    </Counter>

                </Lightbox>
            )}
        </>
    );
}

