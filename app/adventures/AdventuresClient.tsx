'use client';

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

import { User, Listing } from "@prisma/client";

interface AdventuresClientProps {
    listings?: Listing[];
    currentUser?: User | null;
}

const AdventuresClient: React.FC<AdventuresClientProps> = ({ listings, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Adventure listing deleted");
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId("");
        });
    }, [router]);

    return (
        <Container>
            <Heading title="Adventures" subtitle="List of your adventures"/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings?.map((listing) => (
                    <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} 
                    disabled={deletingId === listing.id} actionLabel="Delete adventure" currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
}

export default AdventuresClient;