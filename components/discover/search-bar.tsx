import { Scholarship } from "@/lib/utils";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  scholarships: Scholarship[];
  onSearch: (results: Scholarship[]) => void;
}

export const SearchBar = ({ scholarships, onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const results = scholarships.filter((sch) =>
            sch.programName.toLowerCase().includes(query.toLowerCase())
        );
        onSearch(results);
    };

    return (
        <div className="flex gap-2 w-full px-3">
            <input
                type="text"
                placeholder="Search by scholarship name..."
                value={ query }
                onChange={ (e) => setQuery(e.target.value) }
                className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2"
            />
            <button
                onClick={ handleSearch }
                className="px-3 py-2 bg-gold text-white rounded inline-flex gap-2 items-center"
            >
                <FaSearch />
                Search
            </button>
        </div>
    )
}