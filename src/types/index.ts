export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export interface PostDetails {
  post: Post;
  comments: Comment[];
  user: User;
  albums: Album[];
  photos: Photo[];
} 