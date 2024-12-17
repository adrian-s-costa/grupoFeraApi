
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

  public postCourseComment(id: string, comment: any) {
    return DataSource.courseComment.create({
      data: {
        moduleId: id,
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


  public async postViewCampaign(id: string, time: Date) {
    const post = await DataSource.categoryHomeContent.findUnique({
      where: { id },
      select: { views: true },
    });
  
    if (!post) {
      throw new Error('Campaign not found');
    }

    await DataSource.viewCompaign.create({
      data: {
        campaignId: id,
        view: 1,
        time: time,
      },
    });
  
    const updatedViews = post.views! + 1;
  
    return DataSource.categoryHomeContent.update({
      where: { id },
      data: {
        views: updatedViews,
      },
    });
  }

  public async postClickCampaign(id: string, time: Date) {
    const post = await DataSource.categoryHomeContent.findUnique({
      where: { id },
      select: { clicks: true },
    });
  
    if (!post) {
      throw new Error('Campaign not found');
    }

    await DataSource.clickCompaign.create({
      data: {
        campaignId: id,
        click: 1,
        time: time,
      },
    });
  
    const updatedClicks = post.clicks! + 1;
  
    return DataSource.categoryHomeContent.update({
      where: { id },
      data: {
        clicks: updatedClicks,
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
      where: { id },
      include: { 
        viewInfos: true
      }
    })
  }

  public async getViewOrClickCountByDateRange(id: any, objName: string, startDate: Date, endDate: Date) {
    const categoryContent = await DataSource.categoryHomeContent.findUnique({
      where: { id },
      include: { 
        [objName]: {
          where: {
            time: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    });
    
    const count = categoryContent?.[objName].length || 0;  
    return count;
  }

  public async getOneCategoryContentByUserId(userId: string) {
    return DataSource.categoryHomeContent.findMany({
      where: { userId }
    })
  }

  public getCourses() {
    return DataSource.courses.findMany();
  }

  public getCourseById(courseId: string) {
    return DataSource.courses.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            comments: true
          }
        },
        reviews: true,
      }
    })
  }

}

export default new Repository();
