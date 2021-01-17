class User {
  constructor (
    public id: string,
    public firstname: string,
    public lastname: string,
    public bio: string,
    public isVisible: boolean,
    public sex: string,
    public age: number,
    public email: string,
    public phoneNumber: string,
    public education: [Education],
    public workExperience: [WorkExperience],
    public hometown: String,
    public profileImageUrl: string,

    public whatAmIDoing: string,
    public latitude: number,
    public longitude: number,
    public showMeCriteria: object
  ) { }
}

type Education = {
  name: string,
  entryYear: number,
  graduationYear: number,
  focus: string,
  degree: Degree
}

enum Degree {
  highschool,
  ms,
  ma,
  md,
  phd,
}

type WorkExperience = {
  organizationName: string,
  startYear: number,
  endYear: number,
  title: string
}

export default User
