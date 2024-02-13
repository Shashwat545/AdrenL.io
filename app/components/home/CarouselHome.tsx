'use client';

import { Carousel, Typography, Button } from "@material-tailwind/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface CarouselProps {
    imageSrc: string[];
    linkSrc1: (string | null)[];
    linkTitle1: (string | null)[];
    linkSrc2: (string | null)[];
    linkTitle2: (string | null)[];
    headings: (string | null)[];
    textContent: (string | null)[];
}

const CarouselDefault: React.FC<CarouselProps> = ({ imageSrc, linkSrc1, linkTitle1, linkSrc2, linkTitle2, headings, textContent }) => {
    const router = useRouter();

    return (
        <Carousel className="rounded-xl" autoplay loop navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-5 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                    <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                    />
                ))}
            </div>
        )}>
            {
                imageSrc.map((image, index) => {
                    const shouldRender = linkSrc1[index] || linkSrc2[index] || headings[index] || textContent[index];
                    return (
                    <div key={index} className="relative h-full w-full">
                        <Image src={image} alt={`Cover Image ${index+1}`} layout="fill" objectFit="cover"/>
                        { shouldRender && (
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                                    {headings[index]}
                                </Typography>
                                <Typography variant="lead" color="white" className="mb-12 opacity-80">
                                    {textContent[index]}
                                </Typography>
                                <div className="flex justify-center gap-2">
                                    { linkSrc1[index] && (
                                        <Button size="lg" color="white" onClick={() => router.replace(`${linkSrc1[index]}`)}>
                                            {linkTitle1[index]}
                                        </Button>
                                    )}
                                    { linkSrc2[index] && (
                                        <Button size="lg" color="white" variant="text" onClick={() => router.replace(`${linkSrc2[index]}`)}>
                                            {linkTitle2[index]}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    );
                })
            }
        </Carousel>
    );
}

export default CarouselDefault;