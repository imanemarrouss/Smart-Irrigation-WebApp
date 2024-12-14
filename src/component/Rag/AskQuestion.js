import React, { useState } from 'react';
import './AskQuestion.css'; // Import the external CSS file

const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Reset error state

        try {
            // Make the POST request to the backend
            const res = await fetch('http://localhost:5000/api/query-memory-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await res.json();
            if (res.ok) {
                // Update the response state with the answer
                setResponse(data.response);
            } else {
                // Handle errors
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Unable to connect to the backend');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="ask-question-container">
            <h2 className="ask-question-title">Ask a Question about Agriculture</h2>
            <form onSubmit={handleSubmit} className="ask-question-form">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    required
                    className="ask-question-input"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="ask-question-button"
                >
                    {loading ? 'Loading...' : 'Ask'}
                </button>
            </form>

            {/* Show error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Show loading indicator */}
            {loading && <p className="loading-message" data-testid="loading-indicator" >Loading...</p>}

            {/* Display the response */}
            {!loading && response && (
                <div className="response-container">
                    <h3 className="response-title">Response:</h3>
                    <p className="response-message">{response}</p>
                </div>
            )}
        </div>
    );
};

export default AskQuestion;
