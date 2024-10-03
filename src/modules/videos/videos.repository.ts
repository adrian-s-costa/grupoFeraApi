
import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.videos) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.VideosWhereInput = {};

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        include: {
          comments: {
            include: {
              answers: true
            }
          }
        }
        
      }),
      
      this.repository.count({ where }),
    ]);
  }

  public async findAllNoPagination(search?: string) {
    const where: Prisma.VideosWhereInput = {};

    return this.repository.findMany({
      where,
      include: {
        comments: {
          include: {
            answers: true,
          }
        }
      }
    });
  }

  public findOne(id: string) {
    return this.repository.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            answers: true
          }
        } 
      }
      
    });
  }

  public postComment(id: string, comment: any) {
    return DataSource.comment.create({
      data: {
        videoId: id,
        comment: comment.comment,
        time: comment.time,
        name: comment.name,
        pfpUrl: comment.pfpUrl
      },
    });
  }

  public postAnswer(id: string, answer: any) {
    return DataSource.answer.create({
      data: {
        commentId: id,
        answer: answer.answer,
        time: answer.time,
        name: answer.name,
        pfpUrl: answer.pfpUrl
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


  public async postViewCampaign(id: string) {
    const post = await DataSource.categoryHomeContent.findUnique({
      where: { id },
      select: { views: true },
    });
  
    if (!post) {
      throw new Error('Campaign not found');
    }
  
    const updatedViews = post.views! + 1;
  
    return DataSource.categoryHomeContent.update({
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

  public findAllCategories() {
    return DataSource.categoryVideos.findMany()
  }

  public getHomeCategories() {
    return DataSource.categoryHome.findMany()
  }

  public getCampaigns() {
    return DataSource.campaigns.findMany()
  }

  public getOneCampaign(id: any){
    return DataSource.campaigns.findUnique({
      where: { id }
    })
  }

  public getCategoryContent(filter: string) {
    return DataSource.categoryHomeContent.findMany({
      where: { filter }
    })
  }

  public getOneCategoryContent(id: any){
    return DataSource.categoryHomeContent.findUnique({
      where: { id }
    })
  }

  public getOneCategoryContentByUserId(userId: string) {
    return DataSource.categoryHomeContent.findMany({
      where: { userId }
    })
  }

}

export default new Repository();
