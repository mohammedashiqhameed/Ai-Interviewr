interface TheoryQuestion {
    type: "theory";
    question: string;
}

interface McqQuestion {
    type: "mcq";
    question: string;
    options: string[];
}

type QuestionType = TheoryQuestion | McqQuestion | any;

interface Props {
    question: QuestionType;
    selectedOption?: string;
    onSelectOption?: (option: string) => void;
}

function QuestionCard({
    question,
    selectedOption,
    onSelectOption,
}: Props) {

    const questionText = typeof question === "string" ? question : (question?.question || "");
    const isMcq = typeof question === "object" && question?.type === "mcq";
    const options: string[] = isMcq && Array.isArray(question?.options) ? question.options : [];

    return (

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold text-gray-800">

                {questionText}

            </h2>

            {isMcq && options.length > 0 && (

                <div className="mt-4 space-y-3">

                    {options.map(
                        (option, index) => (

                            <label
                                key={index}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                    selectedOption === option
                                        ? "border-blue-500 bg-blue-100"
                                        : "border-gray-200 bg-white hover:border-blue-300"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="mcq-option"
                                    value={option}
                                    checked={
                                        selectedOption === option
                                    }
                                    onChange={() =>
                                        onSelectOption?.(option)
                                    }
                                    className="accent-blue-600"
                                />

                                <span className="text-gray-700">
                                    {option}
                                </span>

                            </label>

                        )
                    )}

                </div>

            )}

        </div>

    );
}

export default QuestionCard;