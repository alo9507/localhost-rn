import { generateRandomPoint } from './generateRandomPoint';

const cafeLocation = { latitude: 24.22244098031902, longitude: 23.125367053780863 };
const networkingEventLocation = { latitude: 50.22244098031902, longitude: 50.125367053780863 };

const locations = {
    cafe: generateRandomPoint(cafeLocation, 800),
    networkingEvent: generateRandomPoint(networkingEventLocation, 800)
};

const usersWithNod = [
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: "433b6860-51a1-411a-ad43-ad74035541a3",
            sex: 'male',
            firstname: 'George',
            lastname: "Lastname",
            email: 'george@g.com',
            bio: "George's bio",
            whatAmIDoing: 'What George is doing',
            isVisible: true,
            age: 25,
            profileImageUrl: "https://randomuser.me/portraits/men/55.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'john',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 25,
            profileImageUrl: "https://randomuser.me/portraits/men/56.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'lat10_long10',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 25,
            latitude: 10,
            longitude: 10,
            profileImageUrl: "https://randomuser.me/portraits/men/25.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'lat80_long80',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 25,
            latitude: 80,
            longitude: 80,
            profileImageUrl: "https://randomuser.me/portraits/men/15.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'male_25_visible',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 25,
            profileImageUrl: "https://randomuser.me/portraits/men/43.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'male_25_invisible',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: false,
            age: 25,
            profileImageUrl: "https://randomuser.me/portraits/men/23.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'female_25_visible',
            sex: 'female',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 25,
            profileImageUrl: "https://randomuser.me/portraits/men/23.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'female_25_invisible',
            sex: 'female',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: false,
            age: 25,
            women: "https://randomuser.me/portraits/women/55.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'male_40_visible',
            sex: 'male',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 40,
            profileImageUrl: "https://randomuser.me/portraits/men/65.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'female_40_visible',
            sex: 'female',
            firstname: 'John',
            lastname: "Lastname",
            email: 'john@g.com',
            bio: "John's bio",
            whatAmIDoing: 'What john is doing',
            isVisible: true,
            age: 40,
            latitude: locations['networkingEvent'].latitude,
            longitude: locations['networkingEvent'].longitude,
            profileImageUrl: "https://randomuser.me/portraits/women/23.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'jenny',
            sex: 'female',
            firstname: 'Jenny',
            lastname: "Lastname",
            email: 'jenny@g.com',
            bio: "Jenny's bio",
            whatAmIDoing: 'What jenny is doing',
            isVisible: true,
            age: 50,
            latitude: locations['networkingEvent'].latitude,
            longitude: locations['networkingEvent'].longitude,
            profileImageUrl: "https://randomuser.me/portraits/men/25.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'bill',
            sex: 'male',
            firstname: 'Bill',
            lastname: "Lastname",
            email: 'bill@g.com',
            bio: "Bill's bio",
            whatAmIDoing: 'What Bill is doing',
            isVisible: true,
            age: 20,
            latitude: locations['cafe'].latitude,
            longitude: locations['cafe'].longitude,
            profileImageUrl: "https://randomuser.me/portraits/men/76.jpg"
        }
    },
    {
        nod: {
            createdAt: 0,
            latitude: 11.0,
            longitude: 11.0,
            message: "Hi there",
            initiator: "sdf",
            seen: false
        },
        user: {
            id: 'tamara',
            sex: 'female',
            firstname: 'Tamara',
            lastname: "Lastname",
            email: 'tamara@g.com',
            bio: "Tamara's bio",
            whatAmIDoing: 'What Tamara is doing',
            isVisible: true,
            age: 24,
            latitude: locations['cafe'].latitude,
            longitude: locations['cafe'].longitude,
            profileImageUrl: "https://randomuser.me/portraits/women/78.jpg"
        }
    }
];

export default usersWithNod;
