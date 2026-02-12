import { Artist, Album, Music, Playlists, Song, setAllMusics } from './types';

// Artists
export const metallica: Artist = { id: 1, name: "Metallica", musics: [], albuns: [], image: "" };
export const acdc: Artist = { id: 2, name: "AC/DC", musics: [], albuns: [], image: "" };
export const ironMaiden: Artist = { id: 3, name: "Iron Maiden", musics: [], albuns: [], image: "" };
export const blackSabbath: Artist = { id: 4, name: "Black Sabbath", musics: [], albuns: [], image: "" };
export const ledZeppelin: Artist = { id: 5, name: "Led Zeppelin", musics: [], albuns: [], image: "" };
export const pinkFloyd: Artist = { id: 6, name: "Pink Floyd", musics: [], albuns: [], image: "" };

// Albums
export const masterOfPuppetsAlbum: Album = { id: 1, name: "Master of Puppets", author: metallica, cover: "", musics: [] };
export const rideTheLightning: Album = { id: 2, name: "Ride the Lightning", author: metallica, cover: "", musics: [] };
export const backInBlackAlbum: Album = { id: 3, name: "Back in Black", author: acdc, cover: "", musics: [] };
export const numberOfTheBeast: Album = { id: 4, name: "The Number of the Beast", author: ironMaiden, cover: "", musics: [] };
export const paranoidAlbum: Album = { id: 5, name: "Paranoid", author: blackSabbath, cover: "", musics: [] };
export const ledZeppelinIV: Album = { id: 6, name: "Led Zeppelin IV", author: ledZeppelin, cover: "", musics: [] };
export const darkSide: Album = { id: 7, name: "The Dark Side of the Moon", author: pinkFloyd, cover: "", musics: [] };

// Musics
const musics: Music[] = [
  new Song(1, "Master of Puppets", 515, "#", metallica),
  new Song(2, "Battery", 312, "#", metallica),
  new Song(3, "Welcome Home (Sanitarium)", 387, "#", metallica),
  new Song(4, "Fade to Black", 418, "#", metallica),
  new Song(5, "For Whom the Bell Tolls", 311, "#", metallica),
  new Song(6, "Creeping Death", 396, "#", metallica),
  new Song(7, "Back in Black", 255, "#", acdc),
  new Song(8, "Thunderstruck", 292, "#", acdc),
  new Song(9, "Highway to Hell", 208, "#", acdc),
  new Song(10, "The Number of the Beast", 289, "#", ironMaiden),
  new Song(11, "Run to the Hills", 230, "#", ironMaiden),
  new Song(12, "Hallowed Be Thy Name", 432, "#", ironMaiden),
  new Song(13, "Paranoid", 172, "#", blackSabbath),
  new Song(14, "Iron Man", 356, "#", blackSabbath),
  new Song(15, "War Pigs", 473, "#", blackSabbath),
  new Song(16, "Stairway to Heaven", 482, "#", ledZeppelin),
  new Song(17, "Black Dog", 296, "#", ledZeppelin),
  new Song(18, "Rock and Roll", 220, "#", ledZeppelin),
  new Song(19, "Comfortably Numb", 382, "#", pinkFloyd),
  new Song(20, "Time", 413, "#", pinkFloyd),
  new Song(21, "Money", 382, "#", pinkFloyd),
];

setAllMusics(musics);

// Assign musics to albums
masterOfPuppetsAlbum.musics = [musics[0], musics[1], musics[2]];
rideTheLightning.musics = [musics[3], musics[4], musics[5]];
backInBlackAlbum.musics = [musics[6], musics[7], musics[8]];
numberOfTheBeast.musics = [musics[9], musics[10], musics[11]];
paranoidAlbum.musics = [musics[12], musics[13], musics[14]];
ledZeppelinIV.musics = [musics[15], musics[16], musics[17]];
darkSide.musics = [musics[18], musics[19], musics[20]];

// Assign to artists
metallica.musics = [musics[0], musics[1], musics[2], musics[3], musics[4], musics[5]];
metallica.albuns = [masterOfPuppetsAlbum, rideTheLightning];
acdc.musics = [musics[6], musics[7], musics[8]];
acdc.albuns = [backInBlackAlbum];
ironMaiden.musics = [musics[9], musics[10], musics[11]];
ironMaiden.albuns = [numberOfTheBeast];
blackSabbath.musics = [musics[12], musics[13], musics[14]];
blackSabbath.albuns = [paranoidAlbum];
ledZeppelin.musics = [musics[15], musics[16], musics[17]];
ledZeppelin.albuns = [ledZeppelinIV];
pinkFloyd.musics = [musics[18], musics[19], musics[20]];
pinkFloyd.albuns = [darkSide];

export const AllArtists: Artist[] = [metallica, acdc, ironMaiden, blackSabbath, ledZeppelin, pinkFloyd];
export const AllAlbums: Album[] = [masterOfPuppetsAlbum, rideTheLightning, backInBlackAlbum, numberOfTheBeast, paranoidAlbum, ledZeppelinIV, darkSide];
export const AllMusics: Music[] = musics;

// Default playlists
export const defaultPlaylists: Playlists[] = [
  new Playlists(1, "Rock Clássico", [musics[0], musics[6], musics[13], musics[16]]),
  new Playlists(2, "Metal Pesado", [musics[0], musics[9], musics[12], musics[14]]),
];
