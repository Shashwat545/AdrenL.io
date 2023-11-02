interface DropDownProps{
    question: string;
    answer: string;
    toggleQuestion: Function;
    index: number;
    openQuestionIndex: number
}
export default function Dropdown ({question,answer,index,toggleQuestion,openQuestionIndex}:DropDownProps){
    return (
        <div className="border-2 border-gray-100 rounded-lg transition-all duration-1000">
                <button className="flex items-center justify-between w-full p-8" onClick={()=>{
                    console.log("this is not working")
                    toggleQuestion(index)}}>
                    <h1 className="font-semibold text-gray-700">{question}</h1>

                    {openQuestionIndex===index?<span className="text-gray-400 bg-gray-200 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                        </svg>
                    </span>:
                    <span className="text-white bg-blue-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </span>}
                </button>
                
                {openQuestionIndex===index?<div >
                    <hr className="border-gray-200"/>

                    <p className="p-8 text-sm text-gray-500">
                    {answer}
                    </p>
                </div>:null}
            </div>
    )
}

