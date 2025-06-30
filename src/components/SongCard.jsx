// C:\Users\Asus\OneDrive\Desktop\New folder\music-library-app\src\components\SongCard.jsx
import { Calendar, Clock, Pause, Play, Trash } from "lucide-react"; // Import Pause icon

// Accept onTogglePlay and isPlaying props
const SongCard = ({ song, canDelete, onDelete, onTogglePlay, isPlaying }) => {
  // Add new props
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        {/* Album Cover */}
        <div className="relative">
          <img
            src={song.coverUrl}
            alt={`${song.album} cover`}
            className="w-16 h-16 rounded-lg object-cover shadow-lg"
          />
          {/* Play/Pause Button on hover */}
          <button
            onClick={() => onTogglePlay(song)} // Trigger playback on click
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white"
            title={isPlaying ? "Pause song" : "Play song"}>
            {isPlaying ? (
              <Pause className="w-6 h-6" /> // Show Pause icon if playing
            ) : (
              <Play className="w-6 h-6" /> // Show Play icon otherwise
            )}
          </button>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-lg truncate group-hover:text-purple-200 transition-colors">
                {song.title}
              </h3>
              <p className="text-white/70 truncate">{song.artist}</p>
              <p className="text-white/50 text-sm truncate">{song.album}</p>
            </div>

            {canDelete && (
              <button
                onClick={() => onDelete(song.id)}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 rounded-lg transition-all duration-200 hover:shadow-lg"
                title="Delete song">
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Song Details */}
          <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{song.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{song.year}</span>
            </div>
            <span className="px-2 py-1 bg-white/10 rounded-md text-xs">
              {song.genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
