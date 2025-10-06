import React, { useState, useEffect } from "react";

interface Props {
  onSearch: (keyword: string, category: string) => void;
}
export default function SearchBar({ onSearch }: Props) {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const industries = [
    "All Categories",
    "Contact Center",
    "Cyber Security",
    "Designers",
    "Finance & Accounting",
    "HR Operations",
    "IT Operations",
    "Legal Admin",
    "Marketing",
    "Software Development",
    "Virtual Assistants",
  ];

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
    // console.log("Search Term:", searchTerm);
    // console.log("Selected Category:", selectedCategory);
    // Implement search functionality here
  }

  return (
    <form className="searchbar mt-8 mx-auto" onSubmit={onSubmitForm}>
      <div className="searchbar__input">
        <svg
          className="searchbar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <path d="M21 21l-4.3-4.3" strokeLinecap="round"></path>
        </svg>
        <input
          name="q"
          type="text"
          placeholder="I'm looking for: Job title, keywords or company"
          aria-label="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="searchbar__sep" aria-hidden="true"></div>

      <label className="searchbar__select">
        <span className="sr-only">Industry</span>
        <select
            name="industry"
            aria-label="Select industry"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            >
            {industries.map((i) => (
                <option value={i} key={i}>{i}</option>
            ))}
        </select>
        <svg
          className="searchbar__caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </label>

      <button type="submit" className="searchbar__btn">
        Search
      </button>
    </form>
  );
}
