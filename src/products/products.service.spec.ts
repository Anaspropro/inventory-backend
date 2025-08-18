import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

// Mock the @dataui/crud-typeorm module to avoid complex repository setup
jest.mock('@dataui/crud-typeorm', () => ({
  TypeOrmCrudService: class {
    constructor(public repo: any) {}
  },
}));

describe('ProductsService', () => {
  let service: ProductsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have repository injected', () => {
    expect(service['repo']).toBeDefined();
  });
});
