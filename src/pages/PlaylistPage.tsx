import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { defaultPlaylists, AllMusics } from '@/data/mockData';
import { Playlists } from '@/data/types';
import TrackList from '@/components/TrackList';
import { usePlayer } from '@/contexts/PlayerContext';
import { Play, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlists | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const { play } = usePlayer();

  useEffect(() => {
    const found = defaultPlaylists.find(p => p.id === Number(id));
    if (found) setPlaylist(new Playlists(found.id, found.name, [...found.musics]));
  }, [id]);

  if (!playlist) return <div className="p-6 text-foreground">Playlist não encontrada</div>;

  const availableMusics = AllMusics.filter(m => !playlist.musics.find(pm => pm.id === m.id));

  const handleAdd = (musicId: number) => {
    const music = AllMusics.find(m => m.id === musicId);
    if (music) {
      setPlaylist(prev => {
        if (!prev) return prev;
        const updated = new Playlists(prev.id, prev.name, [...prev.musics, music]);
        return updated;
      });
    }
  };

  const handleRemove = (musicId: number) => {
    setPlaylist(prev => {
      if (!prev) return prev;
      return new Playlists(prev.id, prev.name, prev.musics.filter(m => m.id !== musicId));
    });
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-primary/20 to-background">
        <div className="w-48 h-48 rounded bg-muted flex items-center justify-center text-5xl text-muted-foreground shrink-0 shadow-lg">📋</div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Playlist</p>
          <h1 className="text-4xl font-bold text-foreground mt-1">{playlist.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">{playlist.musics.length} músicas</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          {playlist.musics.length > 0 && (
            <button
              onClick={() => play(playlist.musics[0], playlist.musics)}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Play size={22} className="text-primary-foreground ml-0.5" />
            </button>
          )}
          <Button variant="outline" size="sm" onClick={() => setShowAdd(!showAdd)}>
            <Plus size={16} /> Adicionar
          </Button>
        </div>

        {showAdd && (
          <div className="mb-6 p-4 rounded-lg bg-card border border-border">
            <p className="text-sm font-medium mb-3 text-foreground">Adicionar músicas</p>
            {availableMusics.map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 px-2 hover:bg-accent/50 rounded">
                <div>
                  <p className="text-sm text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.author.name}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleAdd(m.id)}>
                  <Plus size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {playlist.musics.length > 0 ? (
          <div className="space-y-1">
            {playlist.musics.map((track, i) => (
              <div key={track.id} className="flex items-center group">
                <div className="flex-1">
                  <TrackList tracks={[track]} showIndex={false} />
                </div>
                <button onClick={() => handleRemove(track.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all mr-2">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Playlist vazia. Adicione algumas músicas!</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
