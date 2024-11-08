//convert seconds to minutes
export const getDuration = (seconds: number) => {
    if(seconds == 0) return "--";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds}`;
}

export const getDurationMinSec = (seconds: number) => {
    if(seconds == 0) return "--";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} secs`;
}

export const pluralize = (count: number, noun: string, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const DEFAULT_ARTWORX = "https://streamdata.radiohitwave.com/api/placeholder-cover.jpg";