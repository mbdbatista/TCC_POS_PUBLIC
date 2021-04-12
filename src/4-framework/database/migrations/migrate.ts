import { AccessType, Profile } from "../../../1-domain/entities/profile"
import { MongooseMetaModel } from "../models/mongooseMeta"
import { ProfileModel } from "../models/profileModel"
import { UserModel } from "../models/userModel"

export class Migrate {  
  static readonly executeMigration = async () => {
    const exists = await MongooseMetaModel.findOne({ name: 'initial-migration'})
    if (exists) {
      return
    }
    const adminProfile = await ProfileModel.create({
      actions: [
        {
          access: AccessType.all,
          route: 'home'
        },
        {
          access: AccessType.all,
          route: 'profile'
        },
        {
          access: AccessType.all,
          route: 'fish'
        },
        {
          access: AccessType.all,
          route: 'user'
        }
      ],
      active: true,
      name: "Administrador"
    })

    const visitorProfile = await ProfileModel.create({
      actions: [
        {
          access: AccessType.read,
          route: 'home'
        }
      ],
      active: true,
      name: "Visitante"
    })

    const managerProfile = await ProfileModel.create({
      actions: [
        {
          access: AccessType.all,
          route: 'pond'
        },
        {
          access: AccessType.all,
          route: 'fish-breeding'
        }
      ],
      active: true,
      name: "Empresário"
    })

    await UserModel.create({
      firstName: 'Administrador',
      email: 'admin@admin.com',
      password: 'pkGLQGl7oX48RsjjdPUMC0AIlKIk0nVPFT+VTPMoHJM=',
      birthDate: new Date(),
      profile: adminProfile.id
    })

    await UserModel.create({
      firstName: 'Visitante',
      email: 'visitor@visitor.com',
      password: 'pkGLQGl7oX48RsjjdPUMC0AIlKIk0nVPFT+VTPMoHJM=',
      birthDate: new Date(),
      profile: visitorProfile.id
    })

    await UserModel.create({
      firstName: 'Empresário',
      email: 'manager@manager.com',
      password: 'pkGLQGl7oX48RsjjdPUMC0AIlKIk0nVPFT+VTPMoHJM=',
      birthDate: new Date(),
      profile: managerProfile.id
    })

    await MongooseMetaModel.create({
      name: 'initial-migration',
      createdDate: new Date()
    })
    
  }
}
