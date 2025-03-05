import { Test, TestingModule } from '@nestjs/testing';
import { CreateOwnerDto } from './models/create-owner-dto';
import { OwnerDto } from './models/owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

describe('OwnersController', () => {
  let controller: OwnersController;
  let service: OwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
      providers: [
        {
          provide: OwnersService,
          useValue: {
            createOwner: jest.fn(),
            getAll: jest.fn(),
            getbyId: jest.fn(),
            updateOwner: jest.fn(),
            deleteOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OwnersController>(OwnersController);
    service = module.get<OwnersService>(OwnersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOwner', () => {
    it('should create a new owner', async () => {
      const createOwnerDto: CreateOwnerDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const ownerEntity: OwnerDto = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      jest.spyOn(service, 'createOwner').mockResolvedValue(ownerEntity);

      expect(await controller.createOwner(createOwnerDto)).toBe(ownerEntity);
      expect(service.createOwner).toHaveBeenCalledWith(createOwnerDto);
    });
  });

  describe('getAll', () => {
    it('should return an array of owners', async () => {
      const ownerEntities: OwnerDto[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(ownerEntities);

      expect(await controller.getAll()).toBe(ownerEntities);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getbyId', () => {
    it('should return an owner by ID', async () => {
      const ownerEntity: OwnerDto = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      jest.spyOn(service, 'getbyId').mockResolvedValue(ownerEntity);

      expect(await controller.getbyId('1')).toBe(ownerEntity);
      expect(service.getbyId).toHaveBeenCalledWith('1');
    });
  });

  describe('updateOwner', () => {
    it('should update an owner by ID', async () => {
      const updateOwnerDto: UpdateOwnerDto = { name: 'Jane Doe' };
      const ownerEntity: OwnerDto = {
        id: '1',
        name: 'Jane Doe',
        email: 'john@example.com',
      };

      jest.spyOn(service, 'updateOwner').mockResolvedValue(ownerEntity);

      expect(await controller.updateOwner('1', updateOwnerDto)).toBe(
        ownerEntity,
      );
      expect(service.updateOwner).toHaveBeenCalledWith('1', updateOwnerDto);
    });
  });

  describe('deleteOwner', () => {
    it('should delete an owner by ID', async () => {
      jest.spyOn(service, 'deleteOwner').mockResolvedValue(undefined);

      expect(await controller.deleteOwner('1')).toBe(undefined);
      expect(service.deleteOwner).toHaveBeenCalledWith('1');
    });
  });
});
