import { usePlayer } from '@/contexts/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const PlayerBar = () => {
  const { currentTrack, isPlaying, progress, volume, togglePlay, next, previous, seek, setVolume } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border flex items-center px-4 z-50">
      {/* Track Info */}
      <div className="w-1/4 min-w-0 flex items-center gap-3">
        {currentTrack ? (
          <>
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs shrink-0">♪</div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{currentTrack.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.author.name}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma música tocando</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1 max-w-xl">
        <div className="flex items-center gap-4">
          <button onClick={previous} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform">
            {isPlaying ? <Pause size={16} className="text-background" /> : <Play size={16} className="text-background ml-0.5" />}
          </button>
          <button onClick={next} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            max={currentTrack?.duration || 100}
            step={1}
            onValueChange={([v]) => seek(v)}
            className="flex-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
          />
          <span className="text-xs text-muted-foreground w-10">{formatTime(currentTrack?.duration || 0)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-1/4 flex items-center justify-end gap-2">
        <Volume2 size={18} className="text-muted-foreground" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={([v]) => setVolume(v)}
          className="w-24 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
