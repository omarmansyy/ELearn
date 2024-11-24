import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { Module } from './modules.schema';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get()
  getAllModules() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  getModule(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Post()
  createModule(@Body() module: Module) {
    return this.modulesService.create(module);
  }

  @Put(':id')
  updateModule(@Param('id') id: string, @Body() module: Module) {
    return this.modulesService.update(id, module);
  }

  @Delete(':id')
  deleteModule(@Param('id') id: string) {
    return this.modulesService.delete(id);
  }
}
