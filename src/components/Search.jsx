import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import searchSuggestions from './SearchSuggestions';

const FormStyle = styled.form`
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;

    @media (min-width: 768px) {
        max-width: 80%;
    }

    @media (min-width: 1024px) {
        max-width: 60%;
    }

    div {
        width: 100%;
        position: relative;
    }

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
        border-radius: 1rem;
        padding: 0.8rem 3rem;
        outline: none;
        width: 100%;
        font-size: 0.9rem;

        @media (min-width: 768px) {
            padding: 1rem 3rem;
            font-size: 1rem;
        }

        &::placeholder {
            color: #a9a9a9;
        }
    }

    svg {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        color: white;
        font-size: 1.2rem;
    }
`;

const SuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
`;

const SuggestionItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;

    @media (min-width: 768px) {
        font-size: 1rem;
    }

    &:hover, &.selected {
        background-color: #f0f0f0;
    }
`;

function Search() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    useEffect(() => {
        setInput("");
        setHasSearched(false);
        setSuggestions([]);
    }, [location]);

    const getSuggestions = (value) => {
        return searchSuggestions.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
    };

    useEffect(() => {
        if (input.length > 0 && !hasSearched) {
            setSuggestions(getSuggestions(input));
        } else {
            setSuggestions([]);
        }
        setSelectedSuggestionIndex(-1);
    }, [input, hasSearched]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (input) {
            performSearch(input);
        }
    };

    const performSearch = (searchTerm) => {
        navigate('/searched/' + searchTerm);
        setHasSearched(true);
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        performSearch(suggestion);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestionIndex >= 0) {
                performSearch(suggestions[selectedSuggestionIndex]);
            } else {
                submitHandler(e);
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setHasSearched(false);
    };

    const handleInputFocus = () => {
        setHasSearched(false);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input
                    ref={inputRef}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    type="text"
                    value={input}
                    placeholder="Search cuisines or ingredients..."
                />
            </div>
            {suggestions.length > 0 && !hasSearched && (
                <SuggestionList>
                    {suggestions.map((suggestion, index) => (
                        <SuggestionItem
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={index === selectedSuggestionIndex ? 'selected' : ''}
                        >
                            {suggestion}
                        </SuggestionItem>
                    ))}
                </SuggestionList>
            )}
        </FormStyle>
    );
}

export default Search;