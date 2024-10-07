import React, { useState } from 'react';
import SuggestionsPreview from 'ucugram/src/components/suggestionsPreview/suggestionsPreview.jsx';
import AllSuggestions from 'ucugram/src/components/allSuggestions/allSuggestions.jsx';
import useFetchSuggestions from 'ucugram/src/hooks/useFetchSuggestions.jsx';
import 'bulma/css/bulma.css';
import './App.css';

const App = () => {
  const { suggestions, loading, error } = useFetchSuggestions(); 
  const [showAll, setShowAll] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions!</div>;

  return (
    <div className="App container">
      {showAll ? (
        <AllSuggestions suggestions={suggestions} onBack={() => setShowAll(false)} />
      ) : (
        <SuggestionsPreview suggestions={suggestions} />
      )}
      {!showAll && (
        <footer className='has-text-right'>
        {/* "show-all-btn" en className */}
          <button className="button is-primary mt-4" onClick={() => setShowAll(true)}>
            Ver todas las sugerencias
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;

