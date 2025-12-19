// src/components/Icons.js
import { Icon } from '@iconify/react';

export const SearchIcon = ({ className = "text-xl" }) => (
  <Icon icon="mdi:magnify" className={className} />
);

export const LikeIcon = ({ className = "text-xl text-red-500" }) => (
  <Icon icon="mdi:heart" className={className} />
);

export const WatchLaterIcon = ({ className = "text-xl text-blue-400" }) => (
  <Icon icon="mdi:clock-outline" className={className} />
);

export const BackIcon = ({ className = "text-2xl" }) => (
  <Icon icon="mdi:chevron-left" className={className} />
);

export const PlayIcon = ({ className = "text-3xl text-white" }) => (
  <Icon icon="mdi:play-circle" className={className} />
);
