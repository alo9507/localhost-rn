import User from '../../models/User';
import { UpdateUserInput } from './graphql/input';
import UserRepository from './UserRepository';
import users from './mockUsers';
import incomingNods from './incomingNods';

class MockUserRepository implements UserRepository {
  constructor() {}

  showMeCriteria = { sex: ['male', 'female'], age: [0, 100] };
  user = new User(
    'id',
    11,
    'myemail@g.com',
    '978-269-4479',
    'male',
    'Andrew',
    'OBreezy',
    'bio',
    'chilling',
    'sdf',
    true,
    10.0,
    10.0,
    'profileimage',
    this.showMeCriteria
  );

  getUser(id: string): Promise<User> {
    const promise: Promise<User> = new Promise((resolve, _) => {
      const mockUser = this.user;
      resolve(mockUser);
    });
    return promise;
  }

  createUser(id: string, phoneNumber: string): Promise<User> {
    const promise: Promise<User> = new Promise((resolve, _) => {
      const mockUser = this.user;
      resolve(mockUser);
    });
    return promise;
  }

  nodSeen(input): Promise<Object> {
    const promise: Promise<Object> = new Promise(async (resolve, _) => {
      const { recipient, sender } = input;
      resolve({ recipient, sender });
    });
    return promise;
  }

  returnNod(input): Promise<Object> {
    const promise: Promise<Object> = new Promise(async (resolve, _) => {
      const { from, to, latitude, longitude, message } = input;
      resolve({ from, to, latitude, longitude, message });
    });
    return promise;
  }

  updateUser(input: UpdateUserInput): Promise<User> {
    const promise: Promise<User> = new Promise((resolve, _) => {
      const mockUser = this.user;
      resolve(mockUser);
    });
    return promise;
  }

  getUsers(): Promise<User[]> {
    const promise: Promise<User[]> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  getIncomingNods(id: string): Promise<User[]> {
    const promise: Promise<User[]> = new Promise((resolve, _) => {
      resolve(incomingNods);
    });
    return promise;
  }

  updateShowMeCriteria(input: UpdateUserInput): Promise<User> {
    const promise: Promise<User> = new Promise((resolve, _) => {
      resolve(this.user);
    });
    return promise;
  }

  updateLocationGetUsers(input: UpdateUserInput): Promise<User[]> {
    const promise: Promise<User[]> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  becomeVisibleTo(input: Object): Promise<Object> {
    const promise: Promise<Object> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  becomeInvisibleTo(input: Object): Promise<Object> {
    const promise: Promise<Object> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  unmatch(input: Object): Promise<Object> {
    const promise: Promise<Object> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  report(input: Object): Promise<Object> {
    const promise: Promise<Object> = new Promise((resolve, _) => {
      resolve(users);
    });
    return promise;
  }

  sendNod(input: Object): Promise<Object> {
    const promise: Promise<Object> = new Promise((resolve, _) => {
      resolve({});
    });
    return promise;
  }
}

export default MockUserRepository;
