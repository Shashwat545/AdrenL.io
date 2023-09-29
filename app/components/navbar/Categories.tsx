'use client';

import Container from "../Container";
import CategoryBox from "../CategoryBox";

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import {usePathname, useSearchParams} from "next/navigation";

export const categories = [
    {
        label: 'Water',
        icon: TbBeach,
        description: 'Experience water adventures!'
    },
    {
        label: 'Mountain',
        icon: GiWindmill,
        description: 'Experience mountain and hill adventures!'
    },
    {
        label: 'Air',
        icon: MdOutlineVilla,
        description: 'Experience airborne adventures!'
    },
    {
        label: 'Winter',
        icon: TbMountain,
        description: 'Experience winter and snow adventures!'
      },
      {
        label: 'Desert',
        icon: TbPool,
        description: 'Experience desert adventures!'
      },
      {
        label: 'Jungle',
        icon: GiIsland,
        description: 'Experience jungle and wildlife adventures!'
      },
      {
        label: 'Extreme',
        icon: GiBoatFishing,
        description: 'Experience extreme sports and activities!'
      },
      {
        label: 'Underground',
        icon: FaSkiing,
        description: 'Experience underground adventures!'
      },
      {
        label: 'Cultural',
        icon: GiCastle,
        description: 'Experience cultural activities!'
      },
      {
        label: 'Multi-day',
        icon: GiCaveEntrance,
        description: 'Experience multi-day adventures!'
      },
      {
        label: 'Motorized',
        icon: GiForestCamp,
        description: 'Experience Quad-bike and off-road adventures!'
      },
      {
        label: 'Family',
        icon: BsSnow,
        description: 'Experience family-friendly adventures!'
      },
      {
        label: 'Photography',
        icon: GiCactus,
        description: 'Experience scenic and photographic adventures!'
      },
]

const Categories = () => {
    const params=useSearchParams();
    const category=params?.get('category');
    const pathname=usePathname();
    const isMainPage=(pathname==='/');
    if(!isMainPage) {
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category===item.label} icon={item.icon}/>
                ))}
            </div>
        </Container>
    );
}

export default Categories;