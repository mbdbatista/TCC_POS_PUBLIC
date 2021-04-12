import { CreateUserInput } from "../../../../../src/3-controller/serializers/user/create/createUserInput"

describe('3-controller.serializers.user.create.createUserInput', () => {
  const currentDate = new Date()
  const input = new CreateUserInput({
    birthDate: currentDate,
    email: 'teste@teste.com',
    firstName: 'teste',
    lastName: 'teste',
    password: 'teste123'
  })

  test('isValid::Success', () => {
    const result = input.isValid()
    expect(result).toBe(true)
  })

  test('isValid::Failure', () => {
    const failedInput = new CreateUserInput({
      ...input,
      firstName: undefined
    })
    const result = failedInput.isValid()
    expect(result).toBe(false)
    expect(failedInput.errors.length).toBeGreaterThan(0)
  })
})