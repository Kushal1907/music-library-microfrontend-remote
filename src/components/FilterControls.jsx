// C:\Users\Asus\OneDrive\Desktop\New folder\music-library-app\src\components\FilterControls.jsx

import { Filter, Group, Search, SortAsc, SortDesc } from "lucide-react";

const FilterControls = ({
  filters,
  sort,
  group,
  onFiltersChange,
  onSortChange,
  onGroupChange,
  availableArtists,
  availableAlbums,
  availableGenres,
  availableYears,
}) => {
  const handleSortFieldChange = (field) => {
    if (sort.field === field) {
      onSortChange({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      onSortChange({ field, direction: "asc" });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Search Songs
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            placeholder="Search by title, artist, or album..."
            className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Filters: REVERT TO ORIGINAL TAILWIND GRID CLASSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {" "}
        {/* REVERTED CLASSNAME */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Artist
          </label>
          <select
            value={filters.artist}
            onChange={(e) =>
              onFiltersChange({ ...filters, artist: e.target.value })
            }
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
            <option value="">All Artists</option>
            {availableArtists.map((artist) => (
              <option key={artist} value={artist} className="bg-gray-800">
                {artist}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Album
          </label>
          <select
            value={filters.album}
            onChange={(e) =>
              onFiltersChange({ ...filters, album: e.target.value })
            }
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
            <option value="">All Albums</option>
            {availableAlbums.map((album) => (
              <option key={album} value={album} className="bg-gray-800">
                {album}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) =>
              onFiltersChange({ ...filters, genre: e.target.value })
            }
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
            <option value="">All Genres</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre} className="bg-gray-800">
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) =>
              onFiltersChange({ ...filters, year: e.target.value })
            }
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
            <option value="">All Years</option>
            {availableYears.map((year) => (
              <option
                key={year}
                value={year.toString()}
                className="bg-gray-800">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort and Group Controls (remain unchanged) */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-white/60" />
          <span className="text-sm text-white/90 font-medium">Sort by:</span>
          {["title", "artist", "album", "year"].map((field) => (
            <button
              key={field}
              onClick={() => handleSortFieldChange(field)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                sort.field === field
                  ? "bg-purple-500/30 text-purple-200 border border-purple-500/50"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
              }`}>
              <span className="capitalize">{field}</span>
              {sort.field === field &&
                (sort.direction === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                ))}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Group className="w-5 h-5 text-white/60" />
          <span className="text-sm text-white/90 font-medium">Group by:</span>
          <select
            value={group.groupBy}
            onChange={(e) => onGroupChange({ groupBy: e.target.value })}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
            <option value="none" className="bg-gray-800">
              No Grouping
            </option>
            <option value="artist" className="bg-gray-800">
              Artist
            </option>
            <option value="album" className="bg-gray-800">
              Album
            </option>
            <option value="genre" className="bg-gray-800">
              Genre
            </option>
            <option value="year" className="bg-gray-800">
              Year
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
