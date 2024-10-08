
import Repository from './videos.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import dayjs from 'dayjs';
import MailService from '@modules/mail/mail.service';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const videoss = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(videoss, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: string) {
    const videos = await Repository.findOne(id);

    if (!videos) {
      throw new AppException(404, ErrorMessages.VIDEOS_NOT_FOUND);
    }
    return videos;
  }

  public async postComment(id: string, comment: any) {
    comment.time = dayjs().format('DD/MM/YYYY')
    const videos = await Repository.postComment(id, comment);
    if (!videos) {
      throw new AppException(404, ErrorMessages.VIDEOS_NOT_FOUND);
    }
    return videos;
  }

  public async postLike(id: string, action: string) {
    const like = await Repository.postLike(id, action)
    return like;
  }

  public async postView(id: string) {
    const view = await Repository.postView(id)
    return view;
  }

  public async postViewCampaign(id: string) {
    const view = await Repository.postViewCampaign(id)
    return view;
  }

  public async postContact(userData: any) {
    await MailService.sendContactEmail(userData);
    return { message: 'Mensagem enviada com sucesso'};
  }

  public async getAllCategories(){
    const categories = await Repository.findAllCategories();
    return categories;
  }

  public async getHomeCategories(){
    const categories = await Repository.getHomeCategories();
    return categories;
  }

  public async getCampaigns(){
    const categories = await Repository.getCampaigns();
    return categories;
  }

  public async getOneCampaign(id: any){
    const campaign = await Repository.getOneCampaign(id);
    return campaign;
  }

  public async getCategoryContent(filter: string){
    const content = await Repository.getCategoryContent(filter);
    return content;
  }

  public async getOneCategoryContent(id: any){
    const content = await Repository.getOneCategoryContent(id);
    return content;
  }

  public async getOneCategoryContentByUserId(userId: any){
    const content = await Repository.getOneCategoryContentByUserId(userId);
    return content;
  }

  public async postAnswer(id: any, answer: any){
    answer.time = dayjs().format('DD/MM/YYYY')
    const result = await Repository.postAnswer(id, answer);
    return result;
  }


  // public async createOne(data: CreateVideosDto) {
  //   return await Repository.createOne(data);
  // }

  // public async updateOne(id: string, data: UpdateVideosDto) {
  //   const videos = await this.findOne(id);

  //   return await Repository.updateOne(videos.id, data);
  // }

  // public async deleteOne(id: string) {
  //   const videos = await this.findOne(id);

  //   return await Repository.deleteOne(videos.id);
  // }
}

export default new Service();
