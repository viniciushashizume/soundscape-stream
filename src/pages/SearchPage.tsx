import { useState } from 'react';
import { AllMusics, AllArtists, AllAlbums } from '@/data/mockData';
import { Song, Music } from '@/data/types';
import TrackList from '@/components/TrackList';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  // Estado para armazenar o retorno da sua classe Song
  const [searchResult, setSearchResult] = useState<Music | undefined>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() && AllMusics.length > 0) {
      // Usamos a primeira instância disponível para acessar o método da classe
      const songInstance = AllMusics[0] as Song;
      
      // Chamada da sua função de back-end
      const result = songInstance.searchMusic(value);
      
      // Atualiza o front-end com o que a classe retornou
      setSearchResult(result);
    } else {
      setSearchResult(undefined);
    }
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="relative max-w-md mb-8">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Digite o nome exato da música..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-accent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Se não houver busca, mostra os gêneros (layout original) */}
      {!query && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Rock', 'Metal', 'Clássico', 'Blues', 'Jazz', 'Pop'].map(genre => (
            <div key={genre} className="aspect-square rounded-lg bg-gradient-to-br from-primary/40 to-accent flex items-end p-4">
              <p className="text-lg font-bold text-foreground">{genre}</p>
            </div>
          ))}
        </div>
      )}

      {/* Se houver busca, mostra apenas o que a classe Song encontrar */}
      {query && (
        <>
          {searchResult ? (
            <div>
              <h2 className="text-lg font-bold mb-3 text-foreground">Resultado da Classe Song</h2>
              {/* Passamos o resultado dentro de um array para o TrackList */}
              <TrackList tracks={[searchResult]} />
            </div>
          ) : (
            <p className="text-muted-foreground">
              A função searchMusic() não encontrou correspondência exata para "{query}".
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;