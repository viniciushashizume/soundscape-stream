import { Music } from '@/data/types';
import { usePlayer } from '@/contexts/PlayerContext';
import { Play, Pause } from 'lucide-react';

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface TrackListProps {
  tracks: Music[];
  showIndex?: boolean;
}

const TrackList = ({ tracks, showIndex = true }: TrackListProps) => {
  const { play, currentTrack, isPlaying, togglePlay } = usePlayer();

  return (
    <div className="space-y-1">
      {tracks.map((track, i) => {
        const isCurrent = currentTrack?.id === track.id;
        return (
          <div
            key={track.id}
            className="group flex items-center gap-4 px-4 py-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => isCurrent ? togglePlay() : play(track, tracks)}
          >
            <div className="w-8 text-center">
              {isCurrent && isPlaying ? (
                <Pause size={14} className="text-primary mx-auto" />
              ) : (
                <span className="text-sm text-muted-foreground group-hover:hidden">{showIndex ? i + 1 : '♪'}</span>
              )}
              {!(isCurrent && isPlaying) && (
                <Play size={14} className="text-foreground mx-auto hidden group-hover:block" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${isCurrent ? 'text-primary font-medium' : 'text-foreground'}`}>{track.name}</p>
              <p className="text-xs text-muted-foreground truncate">{track.author.name}</p>
            </div>
            <span className="text-xs text-muted-foreground">{formatDuration(track.duration)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
