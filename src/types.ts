type Song = {
    audioDuration: number;
    compositionSplitBreakdown: string;
    copyrightOwner: string;
    createdOn: string;
    explicity: boolean;
    isrcCode: string;
    iswcCode: string;
    publishingOwner: string;
    recordingCountry: string;
    recordingSplitBreakdown: string;
    songComposer: string;
    songDescription: string;
    songGenre: string;
    songDistributor: string;
    songEngineer: string;
    songFinancier: string;
    songLabel: string;
    songName: string;
    songPublisher: string;
    songWriter: string;
    studioName: string;
    songPerformer: string;
    upc: string;
    url: string;
    userId: string;
    songId: string;
}

type Playlist = {
    createdOn: number;
    descritpion: string;
    name: string;
    updatedOn: number;
    url: string;
    songs: string[];
    id: string;
}
type PlayerQueue = {
    playedSongs: {[key: string]: string};
    currentSong: string;
    nextSongs: {[key: string]: string};
    currentSongIndex: number;
}

export type { Song, Playlist, PlayerQueue }