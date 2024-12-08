import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread } from './schemas/thread.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { NotificationsGateway } from 'src/notfications/notifications.gateway'; 

@Injectable()
export class ThreadService {
  constructor(
    @InjectModel('Thread') private readonly threadModel: Model<Thread>,
    private readonly notificationsGateway: NotificationsGateway, // Inject the notifications gateway
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const createdThread = new this.threadModel(createThreadDto);
    const savedThread = await createdThread.save();

    // Send a notification after creating a thread
    this.notificationsGateway.sendNotification(createThreadDto.createdBy, {
      message: `A new thread "${savedThread.title}" was created!`,
    });

    return savedThread;
  }

  async findAll(): Promise<Thread[]> {
    // Populate the 'createdBy' field with the user's name from the User model
    return this.threadModel.find().populate('createdBy', 'name').exec();
  }

  async findOne(id: string): Promise<Thread> {
    // Populate the 'createdBy' field with the user's name for a specific thread
    return this.threadModel.findById(id).populate('createdBy', 'name').exec();
  }
}
