import { CreateFishSpecieInput } from "../../../../../src/3-controller/serializers/fish/specie/createFishSpecie/createFishSpecieInput"

describe('3-controller.serializers.user.create.createUserInput', () => {
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

  test('isValid::Success', () => {
    const result = input.isValid()
    expect(result).toBe(true)
  })

  test('isValid::Failure', () => {
    const failedInput = new CreateFishSpecieInput({
      ...input,
      name: undefined
    })
    const result = failedInput.isValid()
    expect(result).toBe(false)
    expect(failedInput.errors.length).toBeGreaterThan(0)
  })
})