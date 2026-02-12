import { Link } from 'react-router-dom';
import { AllArtists, AllAlbums, AllMusics } from '@/data/mockData';
import { usePlayer } from '@/contexts/PlayerContext';
import { Play } from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {children}
    </div>
  </section>
);

const ArtistCard = ({ artist }: { artist: typeof AllArtists[0] }) => (
  <Link to={`/artist/${artist.id}`} className="group p-4 rounded-lg bg-card hover:bg-accent transition-colors">
    <div className="w-full aspect-square rounded-full bg-muted mb-3 flex items-center justify-center text-3xl text-muted-foreground">
      {artist.name[0]}
    </div>
    <p className="text-sm font-medium truncate text-foreground">{artist.name}</p>
    <p className="text-xs text-muted-foreground">Artista</p>
  </Link>
);

const AlbumCard = ({ album }: { album: typeof AllAlbums[0] }) => {
  const { play } = usePlayer();
  return (
    <div className="group relative p-4 rounded-lg bg-card hover:bg-accent transition-colors">
      <Link to={`/album/${album.id}`}>
        <div className="w-full aspect-square rounded bg-muted mb-3 flex items-center justify-center text-2xl text-muted-foreground">💿</div>
        <p className="text-sm font-medium truncate text-foreground">{album.name}</p>
        <p className="text-xs text-muted-foreground truncate">{album.author.name}</p>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); play(album.musics[0], album.musics); }}
        className="absolute bottom-16 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
      >
        <Play size={18} className="text-primary-foreground ml-0.5" />
      </button>
    </div>
  );
};

const Index = () => {
  return (
    <div className="p-6 overflow-auto h-full">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Boa noite</h1>

      {/* Quick picks */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {AllAlbums.slice(0, 6).map(album => (
          <Link key={album.id} to={`/album/${album.id}`} className="flex items-center gap-3 bg-accent/40 hover:bg-accent/70 rounded overflow-hidden transition-colors">
            <div className="w-16 h-16 bg-muted flex items-center justify-center text-lg shrink-0">💿</div>
            <p className="text-sm font-medium truncate text-foreground">{album.name}</p>
          </Link>
        ))}
      </div>

      <Section title="Artistas Populares">
        {AllArtists.map(a => <ArtistCard key={a.id} artist={a} />)}
      </Section>

      <Section title="Álbuns em Destaque">
        {AllAlbums.map(a => <AlbumCard key={a.id} album={a} />)}
      </Section>
    </div>
  );
};

export default Index;
