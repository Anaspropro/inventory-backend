import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity';

// Mock the @dataui/crud-typeorm module to avoid complex repository setup
jest.mock('@dataui/crud-typeorm', () => ({
  TypeOrmCrudService: class {
    constructor(public repo: any) {}
  },
}));

describe('SalesService', () => {
  let service: SalesService;

  const mockSaleRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockSaleItemRepository = {
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
        SalesService,
        {
          provide: getRepositoryToken(Sale),
          useValue: mockSaleRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(SaleItem),
          useValue: mockSaleItemRepository,
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have repositories injected', () => {
    expect(service['repo']).toBeDefined();
    expect(service['productRepository']).toBeDefined();
    expect(service['saleItemRepository']).toBeDefined();
  });
});
