'use client';

import ReviewCard from "./ReviewCard";
import Modal from "../chat/Modal";
import { Review, User } from "@prisma/client";

interface ReviewModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    reviews: (Review & {user: User})[];
    formatPostedTime: Function;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isModalOpen, setIsModalOpen, reviews, formatPostedTime }) => {
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const totalRatings = reviews.length;

    const ratingPercentages = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((review) => review.rating === rating).length;
        const percentage = (count / totalRatings) * 100;
        return { rating, percentage };
    });

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} customWidth="sm:max-w-5xl">
            <div className="p-8">
                {reviews.length > 0 ? (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">
                            Average Rating: {averageRating.toFixed(1)}
                        </h2>
                        <p>Total Ratings: {reviews.length}</p>
                    </div>
                ) : (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">No Rating Yet</h2>
                        <p>Be the first to leave a rating!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {ratingPercentages.map(({ rating, percentage }) => (
                        <div key={rating}>
                            <p className="text-xl font-semibold">{rating} stars</p>
                            <div className="bg-gray-200 h-4 rounded-md">
                                <div className="bg-blue-500 h-full rounded-md" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} formatPostedTime={formatPostedTime} />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default ReviewModal;