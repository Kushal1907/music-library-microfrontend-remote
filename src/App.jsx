// C:\Users\Asus\OneDrive\Desktop\New folder\music-library-app\src\App.jsx
import { LogOut, Music2, Plus, Shield, User } from "lucide-react"; // Import Pause & Play icons
import { useEffect, useMemo, useRef, useState } from "react"; // Import useRef
import AddSongForm from "./components/AddsongForm";
import FilterControls from "./components/FilterControls";
import SongCard from "./components/SongCard";
import { mockSongs } from "./data/mockData";

function App({ logout, initialUser }) {
  const [songs, setSongs] = useState(mockSongs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(initialUser || null);

  // NEW STATE FOR PLAYBACK
  const [playingSongId, setPlayingSongId] = useState(null); // ID of the currently playing song
  const [isPlaying, setIsPlaying] = useState(false); // Whether audio is currently playing
  const audioRef = useRef(null); // Ref to the <audio> element

  const [filters, setFilters] = useState({
    search: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });

  const [sort, setSort] = useState({
    field: "title",
    direction: "asc",
  });

  const [group, setGroup] = useState({
    groupBy: "none",
  });

  // Get user data from localStorage ONLY if initialUser is not provided (for standalone mode)
  useEffect(() => {
    if (!initialUser) {
      const storedUser = localStorage.getItem("musicApp_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser(initialUser);
    }
  }, [initialUser]);

  // NEW: Playback effect for audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Event listeners for seamless playback control
      const handleEnded = () => {
        setIsPlaying(false);
        setPlayingSongId(null);
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, []); // Run once on mount to set up listeners

  // NEW: Toggle playback for a song
  const handleSongToggle = (song) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSongId === song.id) {
      // If currently playing song is clicked again
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    } else {
      // If a new song is clicked or no song is playing
      audio.src = song.songUrl; // Set new song source
      audio.play(); // Play the new song
      setPlayingSongId(song.id);
    }
  };

  const canModify = user?.role === "admin";

  const filterOptions = useMemo(() => {
    return songs.reduce(
      (acc, song) => {
        if (!acc.artists.includes(song.artist)) acc.artists.push(song.artist);
        if (!acc.albums.includes(song.album)) acc.albums.push(song.album);
        if (!acc.genres.includes(song.genre)) acc.genres.push(song.genre);
        if (!acc.years.includes(song.year)) acc.years.push(song.year);
        return acc;
      },
      {
        artists: [],
        albums: [],
        genres: [],
        years: [],
      }
    );
  }, [songs]);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        filters.search === "" ||
        song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.album.toLowerCase().includes(filters.search.toLowerCase());

      const matchesArtist =
        filters.artist === "" || song.artist === filters.artist;
      const matchesAlbum = filters.album === "" || song.album === filters.album;
      const matchesGenre = filters.genre === "" || song.genre === filters.genre;
      const matchesYear =
        filters.year === "" || song.year.toString() === filters.year;

      return (
        matchesSearch &&
        matchesArtist &&
        matchesAlbum &&
        matchesGenre &&
        matchesYear
      );
    });
  }, [songs, filters]);

  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredSongs, sort]);

  const groupedSongs = useMemo(() => {
    if (group.groupBy === "none") {
      return { "All Songs": sortedSongs };
    }

    return sortedSongs.reduce((acc, song) => {
      const key = song[group.groupBy].toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [sortedSongs, group]);

  const handleAddSong = (newSong) => {
    const song = {
      ...newSong,
      id: Date.now().toString(),
      songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-X.mp3", // Default URL for new songs
    };
    setSongs((prev) => [...prev, song]);
  };

  const handleDeleteSong = (id) => {
    // If deleted song is currently playing, stop playback
    if (playingSongId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingSongId(null);
    }
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const totalSongs = songs.length;
  const filteredCount = sortedSongs.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header (now UNCOMMENTED AND INCLUDES LOGOUT) */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Music Library</h1>
                <p className="text-xs text-white/60">Micro Frontend</p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <Shield className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <User className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-white/90 font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                  <span className="text-white/60">•</span>
                  <span className="text-white/90">{user.username}</span>
                </div>
                {/* LOGOUT BUTTON HERE */}
                {logout && (
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 rounded-lg transition-all duration-200 hover:shadow-lg">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats & Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
                <Music2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Music Library</h2>
                <p className="text-white/70">
                  {filteredCount} of {totalSongs} songs
                  {group.groupBy !== "none" && ` • Grouped by ${group.groupBy}`}
                </p>
              </div>
            </div>

            {canModify && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <Plus className="w-5 h-5" />
                Add Song
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            sort={sort}
            group={group}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onGroupChange={setGroup}
            availableArtists={filterOptions.artists.sort()}
            availableAlbums={filterOptions.albums.sort()}
            availableGenres={filterOptions.genres.sort()}
            availableYears={filterOptions.years.sort((a, b) => b - a)}
          />

          {/* Songs Display */}
          <div className="space-y-8">
            {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
              <div key={groupName}>
                {group.groupBy !== "none" && (
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {groupName}
                    </h3>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm">
                      {groupSongs.length} songs
                    </span>
                  </div>
                )}

                {groupSongs.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    <Music2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white/70 mb-2">
                      No songs found
                    </h3>
                    <p className="text-white/50">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupSongs.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        canDelete={canModify}
                        // Pass playback props to SongCard
                        onDelete={handleDeleteSong}
                        onTogglePlay={handleSongToggle} // NEW PROP
                        isPlaying={playingSongId === song.id && isPlaying} // NEW PROP
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Song Modal */}
          {showAddForm && (
            <AddSongForm
              onAddSong={handleAddSong}
              onClose={() => setShowAddForm(false)}
            />
          )}
        </div>
      </main>

      {/* NEW: Hidden Audio Element */}
      <audio ref={audioRef} className="hidden"></audio>
    </div>
  );
}

export default App;
