class User {
  constructor (
    public id: string,
    public age: number,
    public email: string,
    public sex: string,
    public name: string,
    public bio: string,
    public whatAmIDoing: string,
    public location: string,
    public isVisible: boolean,
    public latitude: boolean,
    public longitude: boolean
  ) { }
}

export default User
