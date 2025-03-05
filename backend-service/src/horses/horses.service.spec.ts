import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { HealthStatus } from '../common/enums/healthStatus.enum';
import { OwnersService } from '../owners/owners.service';
import { HorsesRepository } from './horses.repository';
import { HorsesService } from './horses.service';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { HorseDto } from './models/horse-dto';

describe('HorsesService', () => {
  let service: HorsesService;
  let horsesRepository: Partial<HorsesRepository>;
  let ownersService: Partial<OwnersService>;

  beforeEach(async () => {
    horsesRepository = {
      createHourse: jest.fn(),
      getAll: jest.fn(),
      findById: jest.fn(),
      updateHorse: jest.fn(),
      deleteHorse: jest.fn(),
      updateHealth: jest.fn(),
    };

    ownersService = {
      isOwnerExistById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HorsesService,
        { provide: HorsesRepository, useValue: horsesRepository },
        { provide: OwnersService, useValue: ownersService },
      ],
    }).compile();

    service = module.get<HorsesService>(HorsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new horse', async () => {
    const createHorseDto: CreateHorseDto = {
      name: 'Horse1',
      owner: 'owner1',
      breed: 'breed1',
      age: 5,
      healthStatus: HealthStatus.Healthy,
    };
    const horseDto: HorseDto = {
      id: '1',
      name: 'Horse1',
      breed: 'breed1',
      age: 5,
      healthStatus: HealthStatus.Healthy,
    };

    (ownersService.isOwnerExistById as jest.Mock).mockResolvedValue(true);
    (horsesRepository.createHourse as jest.Mock).mockResolvedValue(horseDto);

    const result = await service.createHourse(createHorseDto);
    expect(result).toEqual(horseDto);
    expect(ownersService.isOwnerExistById).toHaveBeenCalledWith('owner1');
    expect(horsesRepository.createHourse).toHaveBeenCalledWith(createHorseDto);
  });

  it('should get all horses', async () => {
    const filterDto: GetAllHorseFilterDto = {
      age: '1',
      breed: 'breed1',
      healthStatus: HealthStatus.Healthy,
    };
    const horseDtoArray: HorseDto[] = [
      {
        id: '1',
        name: 'Horse1',
        breed: 'breed1',
        age: 5,
        healthStatus: HealthStatus.Healthy,
      },
    ];

    (horsesRepository.getAll as jest.Mock).mockResolvedValue(horseDtoArray);

    const result = await service.getAll(filterDto);
    expect(result).toEqual(horseDtoArray);
    expect(horsesRepository.getAll).toHaveBeenCalledWith(filterDto);
  });

  it('should get a horse by id', async () => {
    const horseDto: HorseDto = {
      id: '1',
      name: 'Horse1',
      breed: 'breed1',
      age: 5,
      healthStatus: HealthStatus.Healthy,
    };

    (horsesRepository.findById as jest.Mock).mockResolvedValue(horseDto);

    const result = await service.getById('1');
    expect(result).toEqual(horseDto);
    expect(horsesRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should update a horse', async () => {
    const updateHorseDto: Partial<CreateHorseDto> = { name: 'UpdatedHorse' };
    const horseDto: HorseDto = {
      id: '1',
      name: 'UpdatedHorse',
      breed: 'breed1',
      age: 5,
      healthStatus: HealthStatus.Healthy,
    };

    (horsesRepository.updateHorse as jest.Mock).mockResolvedValue(horseDto);

    const result = await service.updateHorse('1', updateHorseDto);
    expect(result).toEqual(horseDto);
    expect(horsesRepository.updateHorse).toHaveBeenCalledWith(
      '1',
      updateHorseDto,
    );
  });

  it('should delete a horse', async () => {
    const deleteResult: DeleteResult = { raw: [], affected: 1 };

    (horsesRepository.deleteHorse as jest.Mock).mockResolvedValue(deleteResult);

    const result = await service.deleteHorse('1');
    expect(result).toEqual(deleteResult);
    expect(horsesRepository.deleteHorse).toHaveBeenCalledWith('1');
  });

  it('should update horse health', async () => {
    const changeStatusDto: ChangeStatusDto = {
      healthStatus: HealthStatus.Healthy,
    };

    const horseDto: HorseDto = {
      id: '1',
      name: 'Horse1',
      age: 5,
      breed: 'breed1',
      healthStatus: HealthStatus.Healthy,
    };

    (horsesRepository.updateHealth as jest.Mock).mockResolvedValue(horseDto);

    const result = await service.updateHealth('1', changeStatusDto);
    expect(result).toEqual(horseDto);
    expect(horsesRepository.updateHealth).toHaveBeenCalledWith(
      '1',
      changeStatusDto,
    );
  });
});
