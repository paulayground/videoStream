import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Video, VideoDocument } from 'src/model/video.schema';
export declare class VideoService {
    private videoModel;
    constructor(videoModel: Model<VideoDocument>);
    createVideo(video: Object): Promise<Video>;
    readVideo(id: any): Promise<any>;
    streamVideo(id: string, request: Request, response: Response): Promise<void>;
    update(id: any, video: Video): Promise<Video>;
    delete(id: any): Promise<any>;
}
