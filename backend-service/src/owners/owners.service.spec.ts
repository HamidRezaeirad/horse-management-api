import { Test, TestingModule } from '@nestjs/testing';
import { CreateOwnerDto } from './models/create-owner-dto';
import { OwnerDto } from './models/owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';
import { OwnersRepository } from './owners.repository';
import { OwnersService } from './owners.service';

describe('OwnersService', () => {
  let service: OwnersService;
  let repository: OwnersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersService,
        {
          provide: OwnersRepository,
          useValue: {
            createOwner: jest.fn(),
            getAll: jest.fn(),
            findById: jest.fn(),
            updateOwner: jest.fn(),
            deleteOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OwnersService>(OwnersService);
    repository = module.get<OwnersRepository>(OwnersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an owner', async () => {
    const createOwnerDto: CreateOwnerDto = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    const ownerDto: OwnerDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    (jest.spyOn(repository, 'createOwner') as jest.Mock).mockResolvedValue(
      ownerDto,
    );

    expect(await service.createOwner(createOwnerDto)).toEqual(ownerDto);
    expect(repository.createOwner).toHaveBeenCalledWith(createOwnerDto);
  });

  it('should get all owners', async () => {
    const ownerDtos: OwnerDto[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ];

    (jest.spyOn(repository, 'getAll') as jest.Mock).mockResolvedValue(
      ownerDtos,
    );

    expect(await service.getAll()).toEqual(ownerDtos);
    expect(repository.getAll).toHaveBeenCalled();
  });

  it('should get an owner by id', async () => {
    const ownerDto: OwnerDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    (jest.spyOn(repository, 'findById') as jest.Mock).mockResolvedValue(
      ownerDto,
    );

    expect(await service.getbyId('1')).toEqual(ownerDto);
    expect(repository.findById).toHaveBeenCalledWith('1');
  });

  it('should check if an owner exists by id', async () => {
    const ownerDto: OwnerDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    (jest.spyOn(repository, 'findById') as jest.Mock).mockResolvedValue(
      ownerDto,
    );

    expect(await service.isOwnerExistById('1')).toEqual(ownerDto);
    expect(repository.findById).toHaveBeenCalledWith('1');
  });

  it('should update an owner', async () => {
    const updateOwnerDto: UpdateOwnerDto = { name: 'Jane Doe' };
    const ownerDto: OwnerDto = {
      id: '1',
      name: 'Jane Doe',
      email: 'john@example.com',
    };

    (jest.spyOn(repository, 'updateOwner') as jest.Mock).mockResolvedValue(
      ownerDto,
    );

    expect(await service.updateOwner('1', updateOwnerDto)).toEqual(ownerDto);
    expect(repository.updateOwner).toHaveBeenCalledWith('1', updateOwnerDto);
  });

  it('should delete an owner', async () => {
    jest.spyOn(repository, 'deleteOwner').mockResolvedValue(undefined);

    expect(await service.deleteOwner('1')).toEqual(undefined);
    expect(repository.deleteOwner).toHaveBeenCalledWith('1');
  });
});
