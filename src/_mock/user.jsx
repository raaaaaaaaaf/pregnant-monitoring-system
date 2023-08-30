import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { db } from '../firebase/firebaseConfig'
import { getDocs } from 'firebase/firestore';
// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  age: faker.random.numeric(),
  birth: sample([
    'July 20, 1988',
    'Feb 13, 1978',
    'Jan 20, 1990',
    'March 01, 1985',
    'June 20, 1998',
    'March 22, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',
    'July 20, 1988',

  ]),
  weight: faker.random.numeric(),
  height: faker.random.numeric(),
  brgy: sample([
    'Bunyasan',
    'Cagtinae',
    'Can-aga',
    'Cansayong',
    'Cantapoy',
    'Cayawan',
    'Doro',
    'Hanagdong',
    'Karihatag',
    'Masgad',
    'Pili',
    'San Isidro',
    'Tinago',
    'Villariza',

  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['Perinatal', 'Postpartum']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
