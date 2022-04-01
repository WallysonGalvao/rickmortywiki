import { theme } from '~/styles';
import { Status } from '~/types/common';

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getEpisodeId = ({ episode }: { episode: string }) =>
  Number(episode.split('episode/')[1]);

export const parseStatus = (status: Status) => {
  const colors = {
    Alive: theme.colors.greenTransparent,
    Dead: theme.colors.redTransparent,
    unknown: theme.colors.darkTransparent,
  };

  return colors[status];
};
