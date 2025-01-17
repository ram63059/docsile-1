export interface StoryProps {
  imageUrl: string;
  name: string;
}

export interface PostProps {
  avatar: string;
  name: string;
  bio: string;
  timeAgo: string;
  title: string;
  content: string;
  images: string[];
  stats: {
    likes: number;
    comments: number;
    shares: number;
    reposts: number;
  };
}

export interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}
