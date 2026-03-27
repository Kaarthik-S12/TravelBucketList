import NavBar from '../Components/NavBar';
import './home.css';
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react"
function Home() {
  const navigate = useNavigate(); 
  useEffect(() => {
    const benefitItems = document.querySelectorAll('.benefit-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    benefitItems.forEach((item) => {
      observer.observe(item);
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <NavBar />
      <div className="home-container">
        
        <div className="hero-section">
        <div className="hero-content">
          <h1>Explore With Joy!</h1>
          <p>
            Travel is more than just moving from one place to another; it’s an adventure 
            that opens doors to new experiences, cultures, and perspectives. For beginners, 
            stepping out into the world can be both exciting and transformative. It teaches 
            you to embrace the unknown, adapt to new surroundings, and appreciate the beauty 
            of diversity. Whether it’s a weekend getaway or a journey across continents, 
            every trip adds a new chapter to your story. So, pack your curiosity, leave behind 
            your worries, and set out to explore the endless wonders the world has to offer.
          </p>
          <button onClick={() => navigate('/signUp')}>SIGN UP NOW!</button>
          </div>
          <img src="https://th.bing.com/th/id/OIP.UV4TDWywb8xso6xuKQ-J6AHaFj?w=2560&h=1920&rs=1&pid=ImgDetMain" alt="a"/>
        </div>

        
        <div className="benefits-section">
  <h2>Travel does a lot for humans—physically, mentally, and emotionally</h2>
  <div className="benefit-item">
    <h3>Expands Knowledge & Perspective</h3>
    <p>
      Travel exposes you to new cultures, traditions, and languages, helping you see 
      the world from different viewpoints. It breaks stereotypes and broadens your 
      understanding of diverse people and places.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Reduces Stress & Boosts Mental Health</h3>
    <p>
      Traveling disconnects you from routine stressors, allowing you to step away from 
      daily pressures. Nature, new places, and adventures refresh your mind, offering 
      a break from the usual. It also lowers cortisol (the stress hormone), helping to 
      boost happiness and well-being.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Improves Creativity & Problem-Solving Skills</h3>
    <p>
      Experiencing different ways of life sparks creativity, as you encounter new ideas, 
      traditions, and perspectives. Facing travel challenges, such as navigating unfamiliar 
      cities, builds adaptability, allowing you to adjust to new environments and situations. 
      Travel also helps develop quick decision-making skills, as you often need to make 
      on-the-spot choices while exploring new places.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Strengthens Relationships & Social Skills</h3>
    <p>
      Traveling with loved ones creates deep bonds, fostering shared memories and experiences 
      that strengthen relationships. Meeting new people improves communication and networking, 
      allowing you to connect with individuals from different backgrounds and expand your 
      social circle. It also enhances emotional intelligence through diverse interactions, 
      helping you understand and navigate various social dynamics while developing empathy 
      and awareness.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Promotes Personal Growth & Confidence</h3>
    <p>
      Travel teaches independence and resilience, pushing you out of your comfort zone and 
      helping you become more confident. It provides a sense of achievement and fulfillment, 
      as overcoming challenges and navigating unfamiliar environments boosts your self-reliance 
      and personal growth.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Boosts Physical Health</h3>
    <p>
      Walking, hiking, or exploring helps keep you physically active. Fresh air, new diets, 
      and different environments contribute to better overall health. Traveling also reduces 
      the risk of heart diseases by promoting relaxation.
    </p>
  </div>
  <div className="benefit-item">
    <h3>Creates Lifelong Memories & Joy</h3>
    <p>
      Travel moments become cherished memories, giving you stories and experiences to share 
      for a lifetime. It also increases gratitude for both home and the world, making life 
      more meaningful and fulfilling. 🌍✨
    </p>
  </div>
</div>
      </div>
    </>
  );
}

export default Home;
