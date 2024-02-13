'use client';

import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { useEffect, useMemo, useState } from 'react';
import { Tag } from 'primereact/tag';
import ListingCardHome from './ListingCardHome';
import getListings from '@/app/actions/getListings';
import { Listing, User } from '@prisma/client';

interface TrendingSliderProps {
    listings: Listing[];
    currentUser: User | null;
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({ listings, currentUser }) => {

    const trending = listings.slice(0, 9);
    const responsiveOptions = useMemo(() => {
        return (
            [
                {
                    breakpoint: '1400px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '767px',
                    numVisible: 1,
                    numScroll: 1
                }
            ]
        );
    }, []);

    const Template = (listing: Listing) => {
        return (
            <div className="p-5">
                <ListingCardHome data={listing} currentUser={currentUser}/>
            </div>
        );
    };


    return (
        <Carousel value={trending} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={Template} />
    );
};

export default TrendingSlider;