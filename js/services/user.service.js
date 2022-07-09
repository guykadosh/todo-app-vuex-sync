import { storageService } from './storage.service.js'

const USER_KEY = 'loggedInUser'

export const userService = {
  getLoggedinUser,
  save,
}

function save(user) {
  storageService.store(USER_KEY, user)
}

function getLoggedinUser() {
  const user = storageService.load(USER_KEY)
  if (user) return user

  _login()
  return storageService.load(USER_KEY)
}

function _login() {
  storageService.store(USER_KEY, {
    fullName: 'Puki Ben David',
    prefs: {
      color: '#ffffff',
      bgColor: '#0b7285',
    },
    activities: [{ txt: 'Added a Todo', at: 1523873242735 }],
  })
}
