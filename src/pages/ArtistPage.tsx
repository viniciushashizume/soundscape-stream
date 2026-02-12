import { useParams, Link } from 'react-router-dom';
import { AllArtists } from '@/data/mockData';
import TrackList from '@/components/TrackList';
import { usePlayer } from '@/contexts/PlayerContext';
import { Play } from 'lucide-react';

const ArtistPage = () => {
  const { id } = useParams();
  const artist = AllArtists.find(a => a.id === Number(id));
  const { play } = usePlayer();

  if (!artist) return <div className="p-6 text-foreground">Artista não encontrado</div>;

  return (
    <div className="h-full overflow-auto">
      {/* Banner */}
      <div className="h-56 bg-gradient-to-b from-primary/30 to-background flex items-end p-6">
        <div className="flex items-center gap-6">
          <div className="w-36 h-36 rounded-full bg-muted flex items-center justify-center text-5xl text-muted-foreground shrink-0">
            {artist.name[0]}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Artista</p>
            <h1 className="text-5xl font-bold text-foreground">{artist.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{artist.musics.length} músicas</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={() => play(artist.musics[0], artist.musics)}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6 hover:scale-105 transition-transform"
        >
          <Play size={22} className="text-primary-foreground ml-0.5" />
        </button>

        <h2 className="text-lg font-bold mb-3 text-foreground">Populares</h2>
        <TrackList tracks={artist.musics.slice(0, 5)} />

        {artist.albuns.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-8 mb-4 text-foreground">Álbuns</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {artist.albuns.map(album => (
                <Link key={album.id} to={`/album/${album.id}`} className="p-4 rounded-lg bg-card hover:bg-accent transition-colors">
                  <div className="w-full aspect-square rounded bg-muted mb-3 flex items-center justify-center text-2xl text-muted-foreground">💿</div>
                  <p className="text-sm font-medium truncate text-foreground">{album.name}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
