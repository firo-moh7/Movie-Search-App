interface SearchBarProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        </div>
    );
}

export default SearchBar;