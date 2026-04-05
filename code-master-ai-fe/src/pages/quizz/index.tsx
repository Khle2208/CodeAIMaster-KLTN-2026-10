import { useState } from "react";
import Sidebar from "../lesson/sidebar";
import { lessons } from "../lesson/fakeData";
import { quizData } from "./fakeData";

const Quizz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [submitted, setSubmitted] = useState(false);

  const question = quizData[currentQ];

  const handleSelect = (index: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQ] = [index];
      return newAnswers;
    });
  };

  const calcScore = () => {
    let correct = 0;

    quizData.forEach((q, i) => {
      const userAns = answers[i] || [];

      if (
        userAns.length === q.correct.length &&
        userAns.every((a) => q.correct.includes(a))
      ) {
        correct++;
      }
    });

    return correct;
  };

  const score = calcScore();

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar data={lessons} />

      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Quiz: Kiến thức ReactJS
        </h1>

        {/* QUESTION */}
        {!submitted && (
          <>
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h2 className="font-semibold mb-4">
                Câu {currentQ + 1}: {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  const selected = answers[currentQ]?.includes(i);

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`p-3 border rounded-lg cursor-pointer transition
                        ${
                          selected
                            ? "bg-brand-100 border-brand-500"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NAV */}
            <div className="flex justify-between items-center mb-6">
              <button
                disabled={currentQ === 0}
                onClick={() => setCurrentQ((prev) => prev - 1)}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                ← Câu trước
              </button>

              {currentQ === quizData.length - 1 ? (
                <button
                  onClick={() => setSubmitted(true)}
                  className="bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700"
                >
                  Nộp bài Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQ((prev) => prev + 1)}
                  className="bg-brand-400 text-white px-5 py-2 rounded-full hover:bg-brand-600"
                >
                  Câu tiếp →
                </button>
              )}
            </div>
          </>
        )}

        {/* RESULT */}
        {submitted && (
          <div className="mt-6 bg-white rounded-2xl shadow border border-brand-100 overflow-hidden">
            
            {/* HEADER */}
            <div className="bg-brand-50 p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-full bg-brand-400 text-white text-xl">
                🏆
              </div>

              <h2 className="text-lg font-semibold text-brand-700">
                Kết quả: {score}/{quizData.length} câu đúng
              </h2>

              <p className="text-sm text-brand-500 mt-1">
                Bạn đã hoàn thành {Math.round((score / quizData.length) * 100)}% kiến thức chương này!
              </p>
            </div>

            {/* BODY */}
            <div className="p-6 text-center border-t">
              <p className="text-brand-600 mb-4">
                ✔ Chúc mừng! Bạn đã hoàn thành bài Quiz.
              </p>

              <button className="bg-brand-600 text-white px-6 py-2 rounded-full hover:bg-brand-700 transition">
                Bài học tiếp theo →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizz;