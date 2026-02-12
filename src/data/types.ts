export interface Music {
  id: number;
  audioURL: string;
  duration: number;
  name: string;
  author: Artist;
  isPlaying: boolean;
  playSong?(): void;
}

export interface Album {
  id: number;
  name: string;
  author: Artist;
  cover: string;
  musics: Music[];
}

export interface Artist {
  id: number;
  name: string;
  musics: Music[];
  albuns: Album[];
  image: string;
}

export interface Playlist {
  id: number;
  name: string;
  musics: Music[];
  addMusic?(musicID: number): void;
  removeMusic?(musicID: number): void;
}

export class Song implements Music {
  id: number;
  audioURL: string;
  duration: number;
  name: string;
  author: Artist;
  isPlaying: boolean;
  constructor(id: number, name: string, duration: number, audioURL: string, author: Artist) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.audioURL = audioURL;
    this.author = author;
    this.isPlaying = false;
  }

  public playSong(): void {
    this.isPlaying = true;
    console.log(`Musica: ${this.name} tocando.`);
  }
}

export class Playlists implements Playlist {
  id: number;
  name: string;
  musics: Music[];
  constructor(id: number, name: string, musics: Music[]) {
    this.id = id;
    this.name = name;
    this.musics = [...musics];
  }
  public addMusic(musicID: number): void {
    const musicToAdd = AllMusics.find(m => m.id === musicID);
    if (musicToAdd) {
      this.musics.push(musicToAdd);
    }
  }
  public removeMusic(musicID: number): void {
    this.musics = this.musics.filter(m => m.id !== musicID);
  }
}

// We need a reference for AllMusics - will be set from mock data
export let AllMusics: Music[] = [];
export function setAllMusics(musics: Music[]) {
  AllMusics = musics;
}
