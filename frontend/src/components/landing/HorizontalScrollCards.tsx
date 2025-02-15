import  { useEffect, useRef, useState } from 'react';
import lps1 from "../../assets/icon/lps1.svg"
import lps2 from "../../assets/icon/lps2.svg"
import lps3 from "../../assets/icon/lps3.svg"
import lps4 from "../../assets/icon/lps4.svg"

const HorizontalScrollCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  
  const cards = [
    { id: 1, title: "Professional Networking", content: "Connect with peers, mentors, and experts in the medical field" ,image:lps1},
    { id: 2, title: "Knowledge Sharing", content: "Stay updated with the latest medical trends, research, and case studies" ,image:lps2},
    { id: 3, title: "Career Growth", content: "Explore job opportunities, internships, and mentorship programs",image:lps3 },
    { id: 4, title: "Collaboration Opportunities", content: "Engage in medical discussions, join interest groups, and co-author research",image:lps4 },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const cardHeight = sectionHeight / cards.length;
      
      // Only process when section is in view
      if (rect.top <= 0 && rect.bottom >= 0) {
        // Calculate which card should be active based on scroll position
        const scrollPosition = Math.abs(rect.top);
        const newActiveCard = Math.min(
          Math.floor(scrollPosition / cardHeight),
          cards.length - 1
        );
        setActiveCard(newActiveCard);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <div 
      ref={sectionRef} 
      className="pt-20 relative"
      style={{ height: `${100 * cards.length}vh` }} // Height for all cards
    >
      <div className="sticky top-40 lg:h-[400px]  w-full   flex items-center justify-center overflow-hidden">
        <div className="relative w-[90%] lg:max-w-[70%]  lg:h-[400px] md:h[400px] h-[250px] max-w-xl] mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`absolute top-0 left-0 w-full transition-all duration-700 md:h[400px] h-[250px] lg:h-[400px] transform
                ${index === activeCard ? 'translate-x-0 opacity-100' : 
                  index < activeCard ? '-translate-x-full opacity-0' : 
                  'translate-x-full opacity-0'}`}
            >
              <div className="rounded-xl w-full lg:h-[400px] md:h[400px] h-[250px]  flex justify-around    shadow-lg  border border-gray-200 p-12">
                <div className="mb-4">
                  <h3 className="lg:text-3xl text-lg font-semibold text-gray-800 ">
                    {card.title}
                  </h3>
                  <div className='lg:pr-24'>

                  <h3 className='lg:text-2xl text-sm   text-wrap lg:pt-8 pt-2'>{card.content}</h3>
                  </div>
                </div>
                <div className="text-gray-600">
                        <img src={card.image} alt=""  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCards;