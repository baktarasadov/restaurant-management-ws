import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { ResponseEntity } from 'src/common/entity';
import { API_VERSION } from 'src/common/constant';
import { LanguageDto } from './dto/language.dto';

@ApiTags('Languages')
@Controller({
  version: API_VERSION,
  path: 'languages',
})
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new language',
    description: 'Creates a new language record with the provided details.',
  })
  @ApiBody({
    type: CreateLanguageDto,
    description: 'The details of the language to be created.',
  })
  @ApiResponse({
    status: 201,
    description: 'The language has been successfully created.',
    type: LanguageDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  public async create(@Body() createLanguageDto: CreateLanguageDto) {
    const data = await this.languageService.create(createLanguageDto);
    return ResponseEntity.created(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all languages',
    description: 'Retrieves a list of all available languages.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all languages.',
    type: [LanguageDto],
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  public async findAll() {
    const data = await this.languageService.findAll();
    return ResponseEntity.ok(data);
  }
}
