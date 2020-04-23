const getAllClubManageMessge = (req, res) => {
  res.json([
    {
      key: '1',
      id: 1,
      clubName: '计算机协会',
      clubPass: '123456',
      clubID: 'X06'
    },
    {
      key: '2',
      id: 2,
      clubName: '计算机协会',
      clubPass: 'London No. 1 Lake Park',
      clubID: 'X07'
    },
    {
      key: '3',
      id: 3,
      clubName: '计算机协会',
      clubPass: 'Sidney No. 1 Lake Park',
      clubID: 'X08'
    },
  ]);
};

export default {
  'GET /api/allClubManageMessge': getAllClubManageMessge,
};
