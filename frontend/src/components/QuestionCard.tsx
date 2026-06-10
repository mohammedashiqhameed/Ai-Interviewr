interface Props {
    question: string;
}

function QuestionCard({
    question,
}: Props) {

    return (

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold text-gray-800">

                {question}

            </h2>

        </div>

    );
}

export default QuestionCard;