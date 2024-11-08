
type User = {
    uid?: string;
    customerId?: string;
    email?: string;
    username?: string;
    location?: string;
    rating?: number;
    faceLink?: string;
    instaLink?: string;
    spotLink?: string;
    twitLink?: string;
    subscriptionId?: string;
    subscriptionProgram?: string;
    imageUrl?: string;
}
type Song = {
    audioDuration: number;
    artwork?: string;
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
type Album = {
    albumName: string;
    albumType: string;
    albumArt: string;
    albumId: string;
    explicity: boolean;
    artist: string;
    songs: string[];
    year: string | number;
    genre: string;
    duration: number;
}
type PlayerQueue = {
    playedSongs: {[key: string]: string};
    currentSong: string;
    nextSongs: {[key: string]: string};
    currentSongIndex: number;
}


type PaginationData = {
    offset?: number;
    limit: number;
    cursor?: string;
}

export type { Song, Playlist, PlayerQueue, User, PaginationData, Album}