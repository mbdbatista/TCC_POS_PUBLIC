import 'reflect-metadata'
import Container from "typedi"
import { FishSpecieAlreadyRegistered } from '../../../../src/2-business/errors/fish/fishErrors'
import { IFishSpecieRepositoryToken } from "../../../../src/2-business/repositories/iFishSpecieRepository"
import { CreateFishSpecieUseCase } from "../../../../src/2-business/useCases/fish/specie/createFishSpecieUseCase"
import { CreateFishSpecieInput } from "../../../../src/3-controller/serializers/fish/specie/createFishSpecie/createFishSpecieInput"
import { mockAuditLog } from '../../../utils/mockAuditLog'

describe("2-business.useCase.fish.createfishSpecieUseCase", () => {
  const input = new CreateFishSpecieInput({
    name: 'Tilápia',
    carnivore: false,
    sizes: [
      {
        id: '1',
        size: 2,
        unitsPerMeter: 100
      }
    ]
  })
  const fish = {
    id: '123456',
    name: 'Tilápia',
    carnivore: false,
    sizes: [
      {
        id: '1',
        size: 2,
        unitsPerMeter: 100
      }
    ]
  }

  beforeEach(() => {
    Container.reset()
    mockAuditLog()
    Container.set(IFishSpecieRepositoryToken, ({
      findByName: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockResolvedValue(fish)
    }))
  })

  test('CreateFishSpecie::Success', async () => {
    const useCase = Container.get(CreateFishSpecieUseCase)
    const result = await useCase.run(input)
    expect(result.name).toEqual(input.name)
    expect(result.carnivore).toEqual(input.carnivore)
    expect(result.sizes).toEqual(input.sizes)
  })

  test('CreateFishSpecie:Failure::FishSpecieAlreadyRegistered', async () => {
    const fishSpecieRepo = Container.get(IFishSpecieRepositoryToken)
    jest.spyOn(fishSpecieRepo, 'findByName').mockResolvedValue(fish)

    const useCase = Container.get(CreateFishSpecieUseCase)
    try {
      await useCase.run(input)
    } catch (error) {
      expect(error.code).toEqual(FishSpecieAlreadyRegistered.code)
    }
  })
})