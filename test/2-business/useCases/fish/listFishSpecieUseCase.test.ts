import 'reflect-metadata'
import Container from "typedi"
import { IFishSpecieRepositoryToken } from "../../../../src/2-business/repositories/iFishSpecieRepository"
import { ListFishSpecieUseCase } from '../../../../src/2-business/useCases/fish/specie/listFishSpecieUseCase'
import { ListFishSpecieInput } from '../../../../src/3-controller/serializers/fish/specie/listFishSpecie/listFishSpecieInput'


describe('2-business.useCases.fish.ListFishSpecieUseCase', () => {

  const input = new ListFishSpecieInput({
    name: 'Tilápia'
  })  
  const fish = {
    id: '123456',
    name: 'Tilápia',
    carnivore: false,
    sizes: [
      {
        size: 2,
        unitsPerMeter: 100
      }
    ]
  }

  const fishes = [fish]

  beforeEach(() => {
    Container.reset()

    Container.set(IFishSpecieRepositoryToken, ({
      findAll: jest.fn().mockResolvedValue(fishes)
    }))  
  })

  test('ListFishSpecies:Success', async () => {
    const useCase = Container.get(ListFishSpecieUseCase)
    const result = await useCase.run(input)
    expect(result).toEqual(fishes)
  })

  test('ListFishSpecies:Success::WithoutName', async () => {
    const newinput = new ListFishSpecieInput({
      ...input,
      name: undefined
    })
    const useCase = Container.get(ListFishSpecieUseCase)
    const result = await useCase.run(newinput)
    expect(result).toEqual(fishes)
  })
})