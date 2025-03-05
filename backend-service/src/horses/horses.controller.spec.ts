import { Test, TestingModule } from '@nestjs/testing';
import { HealthStatus } from '../common/enums/healthStatus.enum';
import { HorsesController } from './horses.controller';
import { HorsesService } from './horses.service';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { HorseDto } from './models/horse-dto';
import { UpdateHorseDto } from './models/update-horse-dto';

describe('HorsesController', () => {
  let controller: HorsesController;
  let service: HorsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorsesController],
      providers: [
        {
          provide: HorsesService,
          useValue: {
            createHourse: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            updateHorse: jest.fn(),
            deleteHorse: jest.fn(),
            updateHealth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HorsesController>(HorsesController);
    service = module.get<HorsesService>(HorsesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createHourse', () => {
    it('should create a new horse', async () => {
      const createHorseDto: CreateHorseDto = {
        name: 'Test Horse',
        age: 5,
        breed: 'Arabian',
        healthStatus: HealthStatus.Healthy,
        owner: '1',
      };
      const result: HorseDto = {
        id: '1',
        name: 'Test Horse',
        age: 5,
        breed: 'Arabian',
        healthStatus: HealthStatus.Healthy,
      };

      jest.spyOn(service, 'createHourse').mockResolvedValue(result);

      expect(await controller.createHourse(createHorseDto)).toBe(result);
    });
  });

  describe('getAll', () => {
    it('should return an array of horses', async () => {
      const getAllHorseFilterDto: GetAllHorseFilterDto = {
        age: '5',
        breed: 'Arabian',
        healthStatus: HealthStatus.Healthy,
      };
      const result: HorseDto[] = [
        {
          id: '1',
          name: 'Test Horse',
          age: 5,
          breed: 'Arabian',
          healthStatus: HealthStatus.Healthy,
        },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll(getAllHorseFilterDto)).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return a horse by ID', async () => {
      const result: HorseDto = {
        id: '1',
        name: 'Test Horse',
        age: 5,
        healthStatus: HealthStatus.Healthy,
        breed: 'Arabian',
      };

      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.getById('1')).toBe(result);
    });
  });

  describe('updateHorse', () => {
    it('should update a horse by ID', async () => {
      const updateHorseDto: UpdateHorseDto = { name: 'Updated Horse', age: 6 };
      const result: HorseDto = {
        id: '1',
        name: 'Updated Horse',
        age: 6,
        breed: 'Arabian',
        healthStatus: HealthStatus.Healthy,
      };

      jest.spyOn(service, 'updateHorse').mockResolvedValue(result);

      expect(await controller.updateHorse('1', updateHorseDto)).toBe(result);
    });
  });

  describe('deleteHorse', () => {
    it('should delete a horse by ID', async () => {
      jest.spyOn(service, 'deleteHorse').mockResolvedValue(undefined);

      expect(await controller.deleteHorse('1')).toBe(undefined);
    });
  });

  describe('updateHealth', () => {
    it('should update the health status of a horse by ID', async () => {
      const changeStatusDto: ChangeStatusDto = {
        healthStatus: HealthStatus.Injured,
      };
      const result: HorseDto = {
        id: '1',
        name: 'Test Horse',
        age: 5,
        breed: 'Arabian',
        healthStatus: HealthStatus.Injured,
      };

      jest.spyOn(service, 'updateHealth').mockResolvedValue(result);

      expect(await controller.updateHealth('1', changeStatusDto)).toBe(result);
    });
  });
});
