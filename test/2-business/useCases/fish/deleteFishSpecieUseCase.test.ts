
import 'reflect-metadata'
import { Container } from 'typedi'
import { FishSpecieNotFound } from '../../../../src/2-business/errors/fish/fishErrors'
import { IFishSpecieRepositoryToken } from '../../../../src/2-business/repositories/iFishSpecieRepository'
import { DeleteFishSpecieUseCase } from '../../../../src/2-business/useCases/fish/specie/deleteFishSpecieUseCase'
import { DeleteFishSpecieInput } from '../../../../src/3-controller/serializers/fish/specie/deleteFishSpecie/deleteFishSpecieInput'

describe("2-business.useCase.fish.deleteFishSpecieUseCase", () => {
    const input = new DeleteFishSpecieInput({
        id: '1'
    })

    beforeEach(() => {
        Container.reset()
        Container.set(IFishSpecieRepositoryToken, ({
            findOne: jest.fn().mockResolvedValue({ name: 'Teste' }),
            delete: jest.fn().mockResolvedValue({name: 'Teste'})
        }))
    })

    test("Success:DeleteFishSpecie", async () => {
        const useCase = Container.get(DeleteFishSpecieUseCase)
        const result = await useCase.run(input)
        expect(result).toEqual(true)
    })

    test("Failure:FishSpecieNotFound", async () => {
        const repository = Container.get(IFishSpecieRepositoryToken)
        jest.spyOn(repository, "findOne").mockResolvedValue(null)
        const useCase = Container.get(DeleteFishSpecieUseCase)
        try {
            await useCase.run(input)
        } catch (error) {
            expect(error.code).toEqual(FishSpecieNotFound.code)
        }
    })
})