export interface Profile {
  id: string
  name: string
  actions: Actions[]
  active: boolean
}
interface Actions {
  route: string
  access: AccessType
}

export enum AccessType {
  all = 0,
  read = 1,
  write = 2
}

export const AccessTypeAdapter = (type: AccessType) => {
  switch (type) {
    case AccessType.all:
      return 'Liberado'
    case AccessType.write:
      return 'Escrita'
    case AccessType.read:
      return 'Leitura'
  }
}
