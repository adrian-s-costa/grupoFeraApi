
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { VideosDto } from './dtos/videos.dto';

class Repository {
  constructor(private readonly repository = DataSource.videos) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.VideosWhereInput = {};

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
      
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.VideosWhereInput = {};

    return this.repository.findMany({
      where,
    
    });
  }

  public findOne(id: string) {
    return this.repository.findUnique({
      where: { id }
    });
  }

  public postComment(id: string, comment: any) {
    return this.repository.update({
      where: { id },
      data: {
        comments: {
          push: comment,
        },
      },
    });
  }

  public async postLike(id: string, action: string) {
    const post = await this.repository.findUnique({
      where: { id },
      select: { likes: true },
    });
  
    if (!post) {
      throw new Error('Post not found');
    }

    const number = action == "add" ? 1 : -1
  
    const updatedLikes = post.likes + number;
  
    return this.repository.update({
      where: { id },
      data: {
        likes: updatedLikes,
      },
    });
  }

  public async postView(id: string) {
    const post = await this.repository.findUnique({
      where: { id },
      select: { views: true },
    });
  
    if (!post) {
      throw new Error('Post not found');
    }
  
    const updatedViews = post.views + 1;
  
    return this.repository.update({
      where: { id },
      data: {
        views: updatedViews,
      },
    });
  }
  

  public createOne(data: Prisma.VideosCreateInput) {
    return this.repository.create({
      data,
    
    });
  }

  public updateOne(id: string, data: Prisma.VideosUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
    
    });
  }

  public deleteOne(id: string) {
    return this.repository.delete({
      where: { id },
    
    });
  }
}

export default new Repository();
