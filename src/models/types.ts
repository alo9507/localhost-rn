type User = {
  id: string!
  name: string!
  bio: string!
  whatAmIDoing: string!
  location: string!
  isVisible: boolean!
}

class User implements User {

}

export { User }
