import { Container } from 'typedi'
import { schedule } from 'node-cron'
import { CreateFeedingUseCase } from '../../2-business/useCases/feeding/createFeedingUseCase'
export const FeedingJob = () => {
  const hours = '0 */6 * * *'
  schedule(hours, async () => {
    try {
      const useCase = Container.get(CreateFeedingUseCase)
      await useCase.run()
    } catch (error) {
      console.log('Error running cron')
    }
  })
}
