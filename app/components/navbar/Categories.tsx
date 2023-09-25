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
        description: 'This property is close to the beach!'
    },
    {
        label: 'Mountain',
        icon: GiWindmill,
        description: 'This property has windmills!'
    },
    {
        label: 'Air',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Winter',
        icon: TbMountain,
        description: 'This property is in the countryside!'
      },
      {
        label: 'Desert',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
      },
      {
        label: 'Jungle & Wildlife',
        icon: GiIsland,
        description: 'This property is on an island!'
      },
      {
        label: 'Extreme Sports',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
      },
      {
        label: 'Underground',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
      },
      {
        label: 'Cultural',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
      },
      {
        label: 'Multi-day',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
      },
      {
        label: 'Motorized',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
      },
      {
        label: 'Family-Friendly',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
      },
      {
        label: 'Photography & Film',
        icon: GiCactus,
        description: 'This property is in the desert!'
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