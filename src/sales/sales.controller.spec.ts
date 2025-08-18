import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

describe('SalesController', () => {
  let controller: SalesController;

  const mockSalesService = {
    create: jest.fn(),
    findAllWithRelations: jest.fn(),
    findOneWithRelations: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    createOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: mockSalesService,
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service injected', () => {
    expect(controller['salesService']).toBeDefined();
  });
});
