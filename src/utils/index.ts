export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getEpisodeId = ({ episode }: { episode: string }) =>
  Number(episode.split('episode/')[1]);
