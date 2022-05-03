/// <reference types="multer" />
import { Video } from 'src/model/video.schema';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    createBook(request: any, response: any, video: Video, files: {
        video?: Express.Multer.File[];
        cover?: Express.Multer.File[];
    }): Promise<any>;
    read(id: any): Promise<Object>;
    stream(id: any, request: any, response: any): Promise<void>;
    update(response: any, id: any, video: Video): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
