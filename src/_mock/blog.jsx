import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Ensure a safe birth for mother and child by promoting good health habits and reducing risk factors.',
  'Teach health habits that may be continued after pregnancy',
  'Educate in self-care for pregnancy',
  'Provide physical care',
  'Prepare parents for the responsibilities of parenthood',
];

const posts = [...Array(1)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
