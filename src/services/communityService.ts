import { apiService } from './api';

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: string;
  };
  liked?: boolean;
  shared?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface CreatePostData {
  content: string;
  images?: File[];
}

export interface CreateCommentData {
  postId: string;
  content: string;
}

class CommunityService {
  // Get all posts
  async getPosts(page = 1, limit = 20): Promise<{ posts: Post[]; total: number }> {
    try {
      const response = await apiService.get<{ data: { posts: Post[]; total: number } }>(
        `/community/posts?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
  }

  // Get user posts
  async getUserPosts(userId: string, page = 1, limit = 20): Promise<{ posts: Post[]; total: number }> {
    try {
      const response = await apiService.get<{ data: { posts: Post[]; total: number } }>(
        `/community/posts/user/${userId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user posts');
    }
  }

  // Create new post
  async createPost(data: CreatePostData): Promise<Post> {
    try {
      let imageUrls: string[] = [];
      
      // Upload images first if provided
      if (data.images && data.images.length > 0) {
        const uploadResponse = await apiService.uploadFiles<{ imageUrls: string[] }>('/community/upload-images', data.images);
        imageUrls = uploadResponse.imageUrls;
      }

      const postData = {
        content: data.content,
        images: imageUrls,
      };

      const response = await apiService.post<{ data: Post }>('/community/posts', postData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
  }

  // Update post
  async updatePost(postId: string, content: string): Promise<Post> {
    try {
      const response = await apiService.patch<{ data: Post }>(`/community/posts/${postId}`, { content });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update post');
    }
  }

  // Delete post
  async deletePost(postId: string): Promise<void> {
    try {
      await apiService.delete(`/community/posts/${postId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
  }

  // Like/Unlike post
  async toggleLike(postId: string): Promise<{ liked: boolean; likesCount: number }> {
    try {
      const response = await apiService.post<{ liked: boolean; likesCount: number }>(`/community/posts/${postId}/like`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to toggle like');
    }
  }

  // Share post
  async sharePost(postId: string): Promise<{ shared: boolean; sharesCount: number }> {
    try {
      const response = await apiService.post<{ shared: boolean; sharesCount: number }>(`/community/posts/${postId}/share`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to share post');
    }
  }

  // Get post comments
  async getPostComments(postId: string, page = 1, limit = 20): Promise<{ comments: Comment[]; total: number }> {
    try {
      const response = await apiService.get<{ data: { comments: Comment[]; total: number } }>(
        `/community/posts/${postId}/comments?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comments');
    }
  }

  // Create comment
  async createComment(data: CreateCommentData): Promise<Comment> {
    try {
      const response = await apiService.post<{ data: Comment }>(`/community/posts/${data.postId}/comments`, {
        content: data.content
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create comment');
    }
  }

  // Delete comment
  async deleteComment(commentId: string): Promise<void> {
    try {
      await apiService.delete(`/community/comments/${commentId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete comment');
    }
  }

  // Search posts
  async searchPosts(query: string, page = 1, limit = 20): Promise<{ posts: Post[]; total: number }> {
    try {
      const response = await apiService.get<{ data: { posts: Post[]; total: number } }>(
        `/community/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search posts');
    }
  }
}

export const communityService = new CommunityService();