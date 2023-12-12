"use client"
import Dropdown from "@/app/components/FAQDropdown"
import faqData from '@/app/data/faq'
import { useState } from "react"

export default function FAQ(){
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number|null>(null);

    const toggleQuestion = (index:number) => {
        setOpenQuestionIndex((prevIndex) => (prevIndex === index ? null : index));
    }

    return (
        <section className="bg-white">
    <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">Frequently asked questions</h1>

        <div className="mt-12 space-y-8">
       
        {faqData.map(function({question,answer},index){
            return <Dropdown key={index} index={index} toggleQuestion={toggleQuestion} openQuestionIndex={openQuestionIndex} question={question} answer={answer}/>
        })}
            
        </div>
    </div>
</section>

    )
}