
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

  public async postCourseComment(id: string, comment: any) {
    comment.time = dayjs().format('DD/MM/YYYY')
    const videos = await Repository.postCourseComment(id, comment);
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
    const currentDate = dayjs().toDate()
    const view = await Repository.postViewCampaign(id, currentDate)
    return view;
  }

  public async postClickCampaign(id: string) {
    const currentDate = dayjs().toDate()
    const click = await Repository.postClickCampaign(id, currentDate)
    return click;
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

  public async getOneCategoryContent(id: any) {
    const content = await Repository.getOneCategoryContent(id);
  
    const currentDate = dayjs();

    const startOfCurrentDay = currentDate.startOf('day').toDate();
    const endOfCurrentDay = currentDate.endOf('day').toDate();
    const startOflastDay = currentDate.subtract(1, 'day').toDate();
    const endOfLastDay = currentDate.subtract(1, 'day').endOf('day').toDate()

    console.log(startOfCurrentDay)

    // Intervalos de semanas
    const startOfCurrentWeek = currentDate.startOf('week').toDate(); // Início da semana atual
    const endOfCurrentWeek = currentDate.endOf('week').toDate(); // Fim da semana atual
    const startOfLastWeek = currentDate.subtract(1, 'week').startOf('week').toDate(); // Início da semana passada
    const endOfLastWeek = currentDate.subtract(1, 'week').endOf('week').toDate(); // Fim da semana passada
  
    // Intervalos de meses
    const startOfCurrentMonth = currentDate.startOf('month').toDate(); // Início do mês atual
    const endOfCurrentMonth = currentDate.endOf('month').toDate(); // Fim do mês atual
    const startOfLastMonth = currentDate.subtract(1, 'month').startOf('month').toDate(); // Início do mês passado
    const endOfLastMonth = currentDate.subtract(1, 'month').endOf('month').toDate(); // Fim do mês passado
  
    // Intervalos de anos
    const startOfCurrentYear = currentDate.startOf('year').toDate(); // Início do ano atual
    const endOfCurrentYear = currentDate.endOf('year').toDate(); // Fim do ano atual
    const startOfLastYear = currentDate.subtract(1, 'year').startOf('year').toDate(); // Início do ano passado
    const endOfLastYear = currentDate.subtract(1, 'year').endOf('year').toDate(); // Fim do ano passado
  
    // Contagem de views
    const lastDayCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOflastDay, endOfLastDay);
    const currentDayCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfCurrentDay, endOfCurrentDay);

    const lastWeekCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfLastWeek, endOfLastWeek);
    const currentWeekCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfCurrentWeek, endOfCurrentWeek);
    
    const lastMonthCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfLastMonth, endOfLastMonth);
    const currentMonthCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfCurrentMonth, endOfCurrentMonth);
  
    const lastYearCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfLastYear, endOfLastYear);
    const currentYearCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', startOfCurrentYear, endOfCurrentYear);

    const dayChangePercentage = this.calculatePercentageChange(lastDayCount, currentDayCount).toFixed(1);
    const weekChangePercentage = this.calculatePercentageChange(lastWeekCount, currentWeekCount).toFixed(1);
    const monthChangePercentage = this.calculatePercentageChange(lastMonthCount, currentMonthCount).toFixed(1);
    const yearChangePercentage = this.calculatePercentageChange(lastYearCount, currentYearCount).toFixed(1);

    // Contagem de clicks
    const clickLastDayCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOflastDay, endOfLastDay);
    const clickCurrentDayCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfCurrentDay, endOfCurrentDay);

    const clickLastWeekCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfLastWeek, endOfLastWeek);
    const clickCurrentWeekCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfCurrentWeek, endOfCurrentWeek);
    
    const clickLastMonthCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfLastMonth, endOfLastMonth);
    const clickCurrentMonthCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfCurrentMonth, endOfCurrentMonth);
  
    const clickLastYearCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfLastYear, endOfLastYear);
    const clickCurrentYearCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', startOfCurrentYear, endOfCurrentYear);

    const dayChangeClick = this.calculatePercentageChange(clickLastDayCount, clickCurrentDayCount).toFixed(1);
    const weekChangeClick = this.calculatePercentageChange(clickLastWeekCount, clickCurrentWeekCount).toFixed(1);
    const monthChangeClick = this.calculatePercentageChange(clickLastMonthCount, clickCurrentMonthCount).toFixed(1);
    const yearChangeClick = this.calculatePercentageChange(clickLastYearCount, clickCurrentYearCount).toFixed(1);

    //CTR
    const lastDayCTR = this.calculateCTR(lastDayCount, clickLastDayCount);
    const currentDayCTR = this.calculateCTR(currentDayCount, clickCurrentDayCount);  

    const lastWeekCTR = this.calculateCTR(lastWeekCount, clickLastWeekCount);
    const currentWeekCTR = this.calculateCTR(currentWeekCount, clickCurrentWeekCount);
    
    const lastMonthCTR = this.calculateCTR(lastMonthCount, clickLastMonthCount);
    const currentMonthCTR = this.calculateCTR(currentMonthCount, clickCurrentMonthCount);
    
    const lastYearCTR = this.calculateCTR(lastYearCount, clickLastYearCount);
    const currentYearCTR = this.calculateCTR(currentYearCount, clickCurrentYearCount);

    const dayChangeCTR = this.calculatePercentageChange(lastDayCTR, currentDayCTR).toFixed(1);
    const weekChangeCTR = this.calculatePercentageChange(lastWeekCTR, currentWeekCTR).toFixed(1);
    const monthChangeCTR = this.calculatePercentageChange(lastMonthCTR, currentMonthCTR).toFixed(1);
    const yearChangeCTR = this.calculatePercentageChange(lastYearCTR, currentYearCTR).toFixed(1);

    console.log(currentDayCTR, currentMonthCTR, currentWeekCTR, currentYearCTR);
    
    return {
      ...content,
      measures: {
        day: {
          view: {
            currentDayCount,
            dayChangePercentage,
          },
          click:{
            clickCurrentDayCount,
            dayChangeClick
          },
          ctr:{
            currentDayCTR,
            dayChangeCTR
          }
          
        },
        week: {
          view:{
            currentWeekCount,
            weekChangePercentage,
          },
          click: {
            clickCurrentWeekCount,
            weekChangeClick
          },
          ctr: {
            currentWeekCTR,
            weekChangeCTR
          }

        },
        month: {
          view: {
            currentMonthCount,
            monthChangePercentage,
          },
          click: {
            clickCurrentMonthCount,
            monthChangeClick,
          },
          ctr: {
            currentMonthCTR,
            monthChangeCTR
          }
        },
        year: {
          view:{
            currentYearCount,
            yearChangePercentage,
          },
          click:{
            clickCurrentYearCount,
            yearChangeClick,
          },
          ctr:{
            currentYearCTR,
            yearChangeCTR,
          }
        }
      }
    };

  }

  private calculateCTR(views: number, clicks: number): number {
    if (views === 0) {
      return 0;
    }
    return (clicks / views) * 100;
  }

  // private calculateCTRChange(oldValue: number, newValue: number): number {
  //   if (oldValue === 0) oldValue = 1;
  //   const result = ((newValue - oldValue) / oldValue) * 100;
  //   return result;
  // }

  private calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) oldValue = 1;
    const result = ((newValue - oldValue) / oldValue) * 100;
    return result;
  }

  // private calculateCTRPercentageChange(oldValue: number, newValue: number): number {
  //   const result = ((newValue - oldValue) / oldValue) * 100;
  //   return result;
  // }

  public async getOneCategoryContentByUserId(userId: any){
    const content = await Repository.getOneCategoryContentByUserId(userId);
    return content;
  }

  public async getOneCategoryContentCustom(id: any, initialDate: Date, finalDate: Date){
    const viewCount = await Repository.getViewOrClickCountByDateRange(id, 'viewInfos', initialDate, finalDate);
    const clickCount = await Repository.getViewOrClickCountByDateRange(id, 'clickInfos', initialDate, finalDate);
    const CTRCount = this.calculateCTR(viewCount, clickCount);

    console.log(initialDate)
    
    //const dayChangeCTR = this.calculatePercentageChange(lastDayCTR, currentDayCTR).toFixed(1);

    return {
      viewCount,
      clickCount,
      CTRCount
    };
  }

  public async postAnswer(id: any, answer: any){
    answer.time = dayjs().format('DD/MM/YYYY')
    const result = await Repository.postAnswer(id, answer);
    return result;
  }

  public async getCourses(){
    const courses = await Repository.getCourses();
    return courses;
  }

  public async getCoursesById(courseId: string){
    const course = await Repository.getCourseById(courseId);
    return course;
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
