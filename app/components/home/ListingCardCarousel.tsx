'use client';

import { Carousel, IconButton } from "@material-tailwind/react";
import Image from 'next/image';

interface CarouselProps {
    imageSrc: string[];
}

const CarouselDefault: React.FC<CarouselProps> = ({ imageSrc }) => {
    return (
      <div className="carousel-container">
        <Carousel prevArrow={({ handlePrev }) => (
            <IconButton variant="text" color="white" size="lg" onClick={(event) => {handlePrev(); event.stopPropagation()}} className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-6 w-6" transform="translate(6 6)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" className="scale-150"/>
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton variant="text" color="white" size="lg" onClick={(event) => {handleNext(); event.stopPropagation()}} className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-6 w-6" transform="translate(6 6)">
                <path strokeLinecap="round" strokeLinejoin="round" d="m1 9 4-4-4-4" className="scale-150"/>
              </svg>
            </IconButton>
          )} 
          className="w-full h-64 rounded-xl" >
            {
                imageSrc.map((image, index) => (
                    <div key={index} className="h-full w-full relative">
                        <Image src={image} alt={`Cover Image ${index+1}`} layout="fill" objectFit="cover" />
                    </div>
                ))
            }
        </Carousel>
      </div>
    );
}

export default CarouselDefault;  