import { useParams, Link } from 'react-router-dom';
import { AllAlbums } from '@/data/mockData';
import TrackList from '@/components/TrackList';
import { usePlayer } from '@/contexts/PlayerContext';
import { Play } from 'lucide-react';

const AlbumPage = () => {
  const { id } = useParams();
  const album = AllAlbums.find(a => a.id === Number(id));
  const { play } = usePlayer();

  if (!album) return <div className="p-6 text-foreground">Álbum não encontrado</div>;

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-accent to-background">
        <div className="w-48 h-48 rounded bg-muted flex items-center justify-center text-5xl text-muted-foreground shrink-0 shadow-lg">💿</div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Álbum</p>
          <h1 className="text-4xl font-bold text-foreground mt-1">{album.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            <Link to={`/artist/${album.author.id}`} className="text-foreground hover:underline">{album.author.name}</Link>
            {' · '}{album.musics.length} músicas
          </p>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={() => play(album.musics[0], album.musics)}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6 hover:scale-105 transition-transform"
        >
          <Play size={22} className="text-primary-foreground ml-0.5" />
        </button>
        <TrackList tracks={album.musics} />
      </div>
    </div>
  );
};

export default AlbumPage;
