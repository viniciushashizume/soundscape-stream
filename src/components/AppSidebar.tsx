import { Home, Search, Library, Music } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { defaultPlaylists } from '@/data/mockData';

const navItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Buscar', url: '/search', icon: Search },
  { title: 'Biblioteca', url: '/library', icon: Library },
];

const AppSidebar = () => {
  return (
    <aside className="w-60 bg-sidebar shrink-0 flex flex-col h-full overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">♪ Spotify</h1>
      </div>
      <nav className="px-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === '/'}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="text-foreground bg-sidebar-accent font-medium"
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 px-3 border-t border-sidebar-border pt-4 flex-1 overflow-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground px-3 mb-3">Playlists</p>
        {defaultPlaylists.map(pl => (
          <NavLink
            key={pl.id}
            to={`/playlist/${pl.id}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-sidebar-foreground hover:text-foreground transition-colors truncate"
            activeClassName="text-foreground font-medium"
          >
            <Music size={14} />
            <span className="truncate">{pl.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default AppSidebar;
