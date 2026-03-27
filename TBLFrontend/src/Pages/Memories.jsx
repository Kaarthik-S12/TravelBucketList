import {useState,useEffect} from 'react';
import Navbard from '../Components/Navbard';
import MemoriesCard from '../Components/MemoriesCard';
import "./Memories.css";

function Memories() {
  // Sample data for memories
  const [memories, setMemories] = useState([]);
  useEffect(() => {
    const email = localStorage.getItem('email');

    const fetchMemories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/memories/${email}`);
        const data = await response.json();
        
        // Add image URL conversion for each memory
        const updatedMemories = await Promise.all(data.map(async (memory) => {
          const imageResponse = await fetch(`http://localhost:8080/memories/image/${memory.id}`);
          const imageBlob = await imageResponse.blob();
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          return { ...memory, photo: imageObjectUrl };
        }));

        setMemories(updatedMemories);
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };

    fetchMemories();
  }, []);

  return (
    <>
      <Navbard />
      <div className="memories-page">
        <div className="header">
          <h1>instansho&</h1>
        </div>
        <div className="memories-grid">
          {memories.length > 0 ? (
            memories.map((memory) => (
              <MemoriesCard key={memory.id} memory={memory} />
            ))
          ) : (
            <p className="no-memories-message">No memories found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Memories;