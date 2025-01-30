import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import save1 from "../assets/icon/save1.svg";
import save2 from "../assets/icon/save2.svg";
import agree1 from "../assets/icon/agree1.svg";
import agree2 from "../assets/icon/agree2.svg";
import disagree1 from "../assets/icon/disagree1.svg";
import disagree2 from "../assets/icon/disagree2.svg";
import share from "../assets/icon/share.svg";
import like from "../assets/icon/like1.svg";
import liked from "../assets/icon/liked.svg";

interface Author {
  name: string;
  avatar: string;
  bio: string;
  timeAgo: string;
}

interface Answer {
  author: Author;
  content: string;
  likes: number;
  id: string;
}

interface QuestionStats {
  agrees: number;
  disagrees: number;
  shares: number;
}

interface QuestionData {
  author: Author;
  title: string;
  content: string;
  images: string[];
  stats: QuestionStats;
  answers: Answer[];
  isUrgent?: boolean;
}

interface RelatedQuestion {
  id: string;
  title: string;
  answersCount: number;
  author: {
    avatar: string;
  };
}

const QuestionDetail: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<RelatedQuestion[]>([]);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Mock data
        setQuestionData({
          author: {
            name: "Nampally Sriram",
            avatar: "https://placekitten.com/40/40",
            bio: "Ophthalmologist (AIIMS) | JIPMER | Aspiring Medical Professional",
            timeAgo: "2 hrs ago"
          },
          title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
          content: "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools...",
          images: [
            "https://placekitten.com/800/400",
            "https://placekitten.com/800/401",
            "https://placekitten.com/800/402"
          ],
          stats: {
            agrees: 12,
            disagrees: 0,
            shares: 37
          },
          answers: [],
          isUrgent: true
        });

        // Mock related questions
        setRelatedQuestions([
          {
            id: '1',
            title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
            answersCount: 12,
            author: {
              avatar: "https://placekitten.com/40/40"
            }
          },
          // Add more related questions as needed
        ]);

      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching the question');
      } finally {
        setLoading(false);
      }
    };

    if (questionId) {
      fetchQuestionData();
    }
  }, [questionId]);

  const handleAnswer = () => {
    if (answerText.trim()) {
      console.log('Submitting answer:', answerText);
      setAnswerText('');
    }
  };

  const nextImage = () => {
    if (questionData) {
      setCurrentImageIndex((prev) => 
        prev === questionData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (questionData) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? questionData.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto p-4">Loading...</div>;
  if (error) return <div className="max-w-7xl mx-auto p-4 text-red-500">Error: {error}</div>;
  if (!questionData) return <div className="max-w-7xl mx-auto p-4">No question data available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-sm">
            {questionData.isUrgent && (
              <div className="bg-orange-50 px-4 py-2 text-orange-700 font-medium">
                Urgent
              </div>
            )}
            
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src={questionData.author.avatar}
                    alt={questionData.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-neutral-800">{questionData.author.name}</h3>
                    <p className="text-sm text-neutral-500">{questionData.author.bio}</p>
                    <span className="text-xs text-neutral-400">{questionData.author.timeAgo}</span>
                  </div>
                </div>
                <button onClick={() => setIsSaved(!isSaved)}>
                  <img src={isSaved ? save2 : save1} alt="Save" className="w-5 h-5" />
                </button>
              </div>

              {/* Question Content */}
              <h2 className="text-xl font-medium mt-4 text-neutral-800">
                {questionData.title}
              </h2>

              {/* Image Carousel */}
              {questionData.images.length > 0 && (
                <div className="relative mt-4">
                  <img
                    src={questionData.images[currentImageIndex]}
                    alt=""
                    className="w-full rounded-lg object-cover h-[400px]"
                  />
                  {questionData.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                      >
                        →
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {questionData.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-medium">{questionData.stats.agrees}</span>
                  <span className="text-neutral-500">Answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-medium">{questionData.stats.shares}</span>
                  <span className="text-neutral-500">Shares</span>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Add your answer..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500"
              rows={4}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAnswer}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Answer!
              </button>
            </div>
          </div>
        </div>

        {/* Related Questions Sidebar */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Explore Related Questions</h3>
              <button className="text-blue-600">→</button>
            </div>
            {relatedQuestions.map((question) => (
              <div key={question.id} className="flex gap-3 mb-4 last:mb-0">
                <img
                  src={question.author.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-neutral-800">{question.title}</p>
                  <span className="text-xs text-neutral-500">
                    {question.answersCount} people have answered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
