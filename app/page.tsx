export const dynamic = "force-dynamic";

import ClientOnly from "./components/ClientOnly";
import ContainerHome from "./components/home/ContainerHome";
import EmptyState from "./components/EmptyState";
import ListingCardHome from "./components/home/ListingCardHome";

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import VerificationAlert from "./components/VerificationAlert";
import CarouselHome from "./components/home/CarouselHome";
import TrendingSlider from "./components/home/TrendingSlider";
import CategorySelector from "./components/home/CategorySelector";
import { Button } from "@/app/components/shadcn/Button";
import HomeClient from "./HomeClient";

interface HomeProps {
    searchParams: IListingsParams;
}

const CAROUSEL_CONTENTS = {
    imageSrc: ["/images/HomeCarousel/slide1.jpg", "/images/HomeCarousel/slide2.jpg", "/images/HomeCarousel/slide3.jpg", "/images/HomeCarousel/slide4.jpg"],
    linkSrc1: ["/listing/65464281ce265630f00e3ea8", null, null, "/listing/65464281ce265630f00e3ea8"],
    linkTitle1: ["Explore", null, null, "Explore"],
    linkSrc2: [null, null, null, null],
    linkTitle2: [null, null, null, null],
    headings: ["Unleash your adventures", null, null, "Become a pro!"],
    textContent: ["Whether you're an experienced adventurer or just starting out, our platform will help you to discover and book your next adventure.", null, null, "Explore our wide range of adventure courses curated specially for AdrenL by our partners"]
};

const Home = async ({ searchParams }: HomeProps) => {
    const currentUser = await getCurrentUser();
    const listings = await getListings(searchParams);
    const allListings = await getListings({});

    const filteredAllListings = allListings.filter( listing => listing.user.host?.isVerified ?? false );
    const filteredListings = listings.filter ( listing => listing.user.host?.isVerified ?? false  );

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        );
    }

    return (
        <HomeClient allListings={filteredAllListings} listings={filteredListings} currentUser={currentUser}/>
    );
}

export default Home;