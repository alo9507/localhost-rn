import Education from './Education';
import WorkExperience from './WorkExperience';

class User {
  constructor(
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
    public hometown: string,
    public profileImageUrl: string,

    public whatAmIDoing: string,
    public latitude: number,
    public longitude: number,
    public showMeCriteria: object
  ) {}
}

export default User;
