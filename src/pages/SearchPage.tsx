import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AllMusics, AllArtists, AllAlbums } from '@/data/mockData';
import TrackList from '@/components/TrackList';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return {
      tracks: AllMusics.filter(m => m.name.toLowerCase().includes(q) || m.author.name.toLowerCase().includes(q)),
      artists: AllArtists.filter(a => a.name.toLowerCase().includes(q)),
      albums: AllAlbums.filter(a => a.name.toLowerCase().includes(q) || a.author.name.toLowerCase().includes(q)),
    };
  }, [query]);

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="relative max-w-md mb-8">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="O que você quer ouvir?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-accent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {!results && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Rock', 'Metal', 'Clássico', 'Blues', 'Jazz', 'Pop'].map(genre => (
            <div key={genre} className="aspect-square rounded-lg bg-gradient-to-br from-primary/40 to-accent flex items-end p-4">
              <p className="text-lg font-bold text-foreground">{genre}</p>
            </div>
          ))}
        </div>
      )}

      {results && (
        <>
          {results.artists.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-foreground">Artistas</h2>
              <div className="flex gap-4 overflow-x-auto">
                {results.artists.map(a => (
                  <Link key={a.id} to={`/artist/${a.id}`} className="shrink-0 p-3 rounded-lg bg-card hover:bg-accent transition-colors w-36 text-center">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center text-2xl text-muted-foreground">{a.name[0]}</div>
                    <p className="text-sm font-medium truncate text-foreground">{a.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.albums.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-foreground">Álbuns</h2>
              <div className="flex gap-4 overflow-x-auto">
                {results.albums.map(a => (
                  <Link key={a.id} to={`/album/${a.id}`} className="shrink-0 p-3 rounded-lg bg-card hover:bg-accent transition-colors w-36">
                    <div className="w-full aspect-square rounded bg-muted mb-2 flex items-center justify-center text-2xl text-muted-foreground">💿</div>
                    <p className="text-sm font-medium truncate text-foreground">{a.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.tracks.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-foreground">Músicas</h2>
              <TrackList tracks={results.tracks} />
            </div>
          )}
          {results.tracks.length === 0 && results.artists.length === 0 && results.albums.length === 0 && (
            <p className="text-muted-foreground">Nenhum resultado para "{query}"</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
