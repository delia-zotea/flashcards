import React, { createContext, useState, useEffect } from "react";

export const FlashcardsContext = createContext();

export default function FlashcardsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Încarcă datele din JSON local (simulare API)
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = require("../assets/data/cards.json");
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCards(response);

        const allSubjects = [...new Set(response.map((c) => c.subject))];
        setSubjects(allSubjects);

        setLoading(false);
      } catch (error) {
        console.log("Eroare la încărcarea cardurilor:", error);
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  // 🔹 Adaugă un card nou
  const addCard = (question, answer, subject) => {
    const newCard = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      favorite: false,
      subject: subject.trim(),
    };
    setCards((prev) => [...prev, newCard]);

    if (!subjects.includes(subject.trim())) {
      setSubjects((prev) => [...prev, subject.trim()]);
    }

    return newCard;
  };

  // 🔹 Comută favorite
  const toggleFavorite = (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  // 🔹 Returnează cardurile filtrate după subiecte
  const getCardsBySubjects = (selectedSubjects = []) => {
    if (!selectedSubjects || selectedSubjects.length === 0) return cards;
    return cards.filter((c) => selectedSubjects.includes(c.subject));
  };

  // 🔹 Returnează doar cardurile favorite
  const getFavoriteCards = () => {
    return cards.filter((c) => c.favorite);
  };

  return (
    <FlashcardsContext.Provider
      value={{
        cards,
        subjects,
        addCard,
        toggleFavorite,
        getCardsBySubjects,
        getFavoriteCards,
        loading,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}
