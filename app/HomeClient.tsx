'use client';

import { Listing, User } from "@prisma/client";
import ClientOnly from "./components/ClientOnly";
import CarouselHome from "./components/home/CarouselHome";
import CategorySelector from "./components/home/CategorySelector";
import ContainerHome from "./components/home/ContainerHome";
import ListingCardHome from "./components/home/ListingCardHome";
import TrendingSlider from "./components/home/TrendingSlider";
import BottomCards from "./components/home/BottomCards";
import { Button } from "@/app/components/shadcn/Button";

const CAROUSEL_CONTENTS = {
    imageSrc: ["/images/HomeCarousel/slide1.jpg", "/images/HomeCarousel/slide2.jpg", "/images/HomeCarousel/slide3.jpg", "/images/HomeCarousel/slide4.jpg"],
    linkSrc1: ["/listing/65464281ce265630f00e3ea8", null, null, "/coming-soon"],
    linkTitle1: ["Explore", null, null, "Explore"],
    linkSrc2: [null, null, null, null],
    linkTitle2: [null, null, null, null],
    headings: ["Unleash your adventures", null, null, "Become a pro!"],
    textContent: ["Whether you're an experienced adventurer or just starting out, our platform will help you to discover and book your next adventure.", null, null, "Explore our wide range of adventure courses curated specially for AdrenL by our partners"]
};

interface HomeClientProps {
    allListings: Listing[];
    listings: Listing[];
    currentUser: User | null;
}

const HomeClient:React.FC<HomeClientProps> = ({ allListings, listings, currentUser }) => {

    const handleViewAllClick = () => {
        const categorySelectorDiv = document.getElementById("categorySelector");
        if (categorySelectorDiv) {
            categorySelectorDiv.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <ClientOnly>
            <div className="bg-[#f2f2f2] bg-clip-padding shadow-[0px_0px_0px_600px_rgba(242,242,242,1)]">
            <ContainerHome>
                <div className="w-full h-[80vh] overflow-hidden rounded-xl relative">
                    <CarouselHome imageSrc={CAROUSEL_CONTENTS.imageSrc} linkSrc1={CAROUSEL_CONTENTS.linkSrc1}
                    linkTitle1={CAROUSEL_CONTENTS.linkTitle1} linkSrc2={CAROUSEL_CONTENTS.linkSrc2} 
                    linkTitle2={CAROUSEL_CONTENTS.linkTitle2} headings={CAROUSEL_CONTENTS.headings}
                    textContent={CAROUSEL_CONTENTS.textContent} />
                </div>
                <div className="flex align-center justify-center">
                    <section className="w-full pt-12 md:pt-24 lg:pt-32">
                        <div className="px-4 md:px-6 flex-col align-center justify-center">
                            <div className="flex flex-col items-center justify-center space-y-4 pb-10 md:pb-20 text-center">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trending Adventures</h1>
                                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Discover the latest and most exciting adventures on AdrenL.
                                </p>
                            </div>
                            <TrendingSlider listings={allListings} currentUser={currentUser}/>
                            <div className="flex justify-center mt-4 mb-16">
                                <Button onClick={handleViewAllClick} variant="outline" className="border-black bg-white">View All</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </ContainerHome>
            
                <div id="categorySelector" className="px-0 sticky top-[84px] md:top-[104px] z-10 w-full mt-4 border-2 border-gray-500">
                    <CategorySelector />
                </div>
            <ContainerHome>
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 justify-items-center gap-2">
                        {
                            listings.map((listing: any) => {
                                return (
                                    <ListingCardHome key={listing.id} currentUser={currentUser} data={listing}/>
                                );
                            })
                        }
                    </div>
                
            </ContainerHome>
            <ContainerHome>
                <BottomCards />
            </ContainerHome>
            </div>
        </ClientOnly>
    );
}

export default HomeClient;