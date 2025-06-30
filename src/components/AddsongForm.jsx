import { Music, Plus, X } from "lucide-react";
import { useState } from "react";

const AddSongForm = ({ onAddSong, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    year: new Date().getFullYear(),
    genre: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSong(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const coverOptions = [
    "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/1022158/pexels-photo-1022158.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Song</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Song Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter song title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Artist *
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Album *
            </label>
            <input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter album name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="3:45"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Genre *
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
              <option value="" className="bg-gray-800">
                Select Genre
              </option>
              <option value="Rock" className="bg-gray-800">
                Rock
              </option>
              <option value="Pop" className="bg-gray-800">
                Pop
              </option>
              <option value="Jazz" className="bg-gray-800">
                Jazz
              </option>
              <option value="Classical" className="bg-gray-800">
                Classical
              </option>
              <option value="Hip Hop" className="bg-gray-800">
                Hip Hop
              </option>
              <option value="Electronic" className="bg-gray-800">
                Electronic
              </option>
              <option value="Folk" className="bg-gray-800">
                Folk
              </option>
              <option value="Country" className="bg-gray-800">
                Country
              </option>
              <option value="R&B" className="bg-gray-800">
                R&B
              </option>
              <option value="Soul" className="bg-gray-800">
                Soul
              </option>
              <option value="Grunge" className="bg-gray-800">
                Grunge
              </option>
              <option value="Folk Rock" className="bg-gray-800">
                Folk Rock
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Album Cover
            </label>
            <select
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
              {coverOptions.map((url, index) => (
                <option key={url} value={url} className="bg-gray-800">
                  Cover Option {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 rounded-lg transition-all">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4" />
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongForm;
