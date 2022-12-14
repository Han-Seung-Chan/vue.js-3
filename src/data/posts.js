const posts = [
  { id: 1, title: '제목 1', content: '내용 1', createAt: '2022-01-01' },
  { id: 2, title: '제목 2', content: '내용 2', createAt: '2022-02-02' },
  { id: 3, title: '제목 3', content: '내용 3', createAt: '2022-03-03' },
  { id: 4, title: '제목 4', content: '내용 4', createAt: '2022-04-04' },
  { id: 5, title: '제목 5', content: '내용 5', createAt: '2022-05-05' },
];

export const getPosts = () => {
  return posts;
};

export const getPostsId = (id) =>
  posts.find((item) => item.id === parseInt(id));
