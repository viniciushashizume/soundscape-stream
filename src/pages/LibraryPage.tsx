import { useState } from 'react';
import { Link } from 'react-router-dom';
import { defaultPlaylists } from '@/data/mockData';
import { Playlists } from '@/data/types';
import { Plus, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LibraryPage = () => {
  const [playlists, setPlaylists] = useState<Playlists[]>(defaultPlaylists);

  const createPlaylist = () => {
    const newId = playlists.length + 1;
    const newPl = new Playlists(Date.now(), `Minha Playlist #${newId}`, []);
    setPlaylists([...playlists, newPl]);
    defaultPlaylists.push(newPl);
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Sua Biblioteca</h1>
        <Button variant="outline" size="sm" onClick={createPlaylist}>
          <Plus size={16} /> Nova Playlist
        </Button>
      </div>

      <div className="space-y-2">
        {playlists.map(pl => (
          <Link
            key={pl.id}
            to={`/playlist/${pl.id}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
              <Music size={20} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{pl.name}</p>
              <p className="text-xs text-muted-foreground">{pl.musics.length} músicas</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
