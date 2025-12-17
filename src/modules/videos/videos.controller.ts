import Service from './videos.service';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  public async findAll(req: Request, res: Response) {
    const { size, page, search } = req.query as RequestQueryDto;

    const result = (size && page)
      ? await Service.findAll(size, page, search)
      : await Service.findAllNoPagination(search);
    res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(req.params.id);
    res.status(200).json(result);
  }

  public async findAllShows(req: Request, res: Response) {
    const { size, page, search } = req.query as RequestQueryDto;
    const result = await Service.findAllNoPaginationShows(search);
    res.status(200).json(result);
  }

  public async findOneShow(req: Request, res: Response) {
    const result = await Service.findOneShow(req.params.id);
    res.status(200).json(result);
  }


  public async findOneCampaign(req: Request, res: Response) {
    const result = await Service.getOneCampaign(req.params.id);
    res.status(200).json(result);
  }

  public async findCategoryContent(req: Request, res: Response) {
    const result = await Service.getCategoryContent(req.params.filter);
    res.status(200).json(result);
  }

  public async findOneCategoryContent(req: Request, res: Response) {
    const result = await Service.getOneCategoryContent(req.params.id);
    res.status(200).json(result);
  }
  
  public async findOneCategoryContentCustom(req: Request, res: Response) {
    const result = await Service.getOneCategoryContentCustom(req.params.id, req.body.initialDate, req.body.finalDate);
    res.status(200).json(result);
  }

  public async findOneCategoryContentByUserId(req: Request, res: Response) {
    const result = await Service.getOneCategoryContentByUserId(req.params.id);
    res.status(200).json(result);
  }


  public async postComment(req: Request, res: Response) {
    const result = await Service.postComment(req.params.id, req.body);
    res.status(200).json(result);
  }

  public async postAnswer(req: Request, res: Response) {
    const result = await Service.postAnswer(req.params.commentId, req.body);
    res.status(200).json(result);
  }

  public async postLike(req: Request, res: Response) {
    const result = await Service.postLike(req.params.id, req.params.action);
    res.status(200).json(result);
  }

  public async postView(req: Request, res: Response) {
    const result = await Service.postView(req.params.id);
    res.status(200).json(result);
  }

  public async postViewCampaign(req: Request, res: Response) {
    const result = await Service.postViewCampaign(req.params.id);
    res.status(200).json(result);
  }

  public async postClickCampaign(req: Request, res: Response) {
    const result = await Service.postClickCampaign(req.params.id);
    res.status(200).json(result);
  }

  public async postContact(req: Request, res: Response) {
    const result = await Service.postContact(req.body);
    return res.status(200).json(result)
  }

  public async getAllCategories(req: Request, res: Response) {
    const result = await Service.getAllCategories();
    return res.status(200).json(result)
  }

  public async getHomeCategories(req: Request, res: Response) {
    const result = await Service.getHomeCategories();
    return res.status(200).json(result)
  }

  public async getCampaigns(req: Request, res: Response) {
    const result = await Service.getCampaigns();
    return res.status(200).json(result)
  }

  public async getVideoHome(req: Request, res: Response) {
    const result = await Service.getVideoHome();
    return res.status(200).json(result)
  }

  public async getCourses(req: Request, res: Response) {
    const result = await Service.getCourses();
    return res.status(200).json(result)
  }

  public async getCourseById(req: Request, res: Response) {
    const result = await Service.getCoursesById(req.params.id);
    return res.status(200).json(result)
  }
  
  public async postCourseComment(req: Request, res: Response) {
    const result = await Service.postCourseComment(req.params.id, req.body);
    res.status(200).json(result);
  }

  // public async createOne(req: Request, res: Response) {
  //   const result = await Service.createOne(req.body);
  //   res.status(201).json(result);
  // }

  // public async updateOne(req: Request, res: Response) {
  //   const result = await Service.updateOne(+req.params.id, req.body);
  //   res.status(200).json(result);
  // }

  // public async deleteOne(req: Request, res: Response) {
  //   const result = await Service.deleteOne(+req.params.id);
  //   res.status(200).json(result);
  // }
}

export default new Controller();
