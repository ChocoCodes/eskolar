import { Scholarship } from "@/hooks/useScholarships";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  scholarships: Scholarship[];
  onSearch: (results: Scholarship[]) => void;
}

export const SearchBar = ({ scholarships, onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const handleSearch = (nextQuery: string = query) => {
        const trimmedQuery = nextQuery.trim();

        if (!trimmedQuery) {
            onSearch(scholarships);
            return;
        }

        const results = scholarships.filter((sch) =>
            sch.program_name.toLowerCase().includes(trimmedQuery.toLowerCase())
        );
        onSearch(results);
    };

    return (
        <div className="flex gap-2 w-full px-3">
            <input
                type="text"
                placeholder="Search by scholarship name..."
                value={ query }
                onChange={ (e) => {
                    const nextQuery = e.target.value;
                    setQuery(nextQuery);
                    handleSearch(nextQuery);
                } }
                className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2"
            />
            <button
                onClick={ () => handleSearch }
                className="px-3 py-2 bg-gold hover:cursor-pointer hover:bg-gold-hover text-white rounded inline-flex gap-2 items-center"
            >
                <FaSearch />
                Search
            </button>
        </div>
    )
}
