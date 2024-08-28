import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  // @Get()
  // findAll() {
  //   return this.categoryService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get('/')
  findAllTaste() {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
