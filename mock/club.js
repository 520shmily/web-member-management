const getClubMessage = (req, res) => {
  res.json([
    {
      key: '1',
      id: 1,
      clubWordMessage: '计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会计算计算机协会计算机协会计算机协会计算机协会计算机协会机协会',
      clubName: '计算机协会',
      clubID: 'X06',
      clubImgMessage: 'iii',
      clubPhotos: [
        {
          uid: '0',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '1',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ],
    }
  ]);
};

export default {
  'GET /api/club': getClubMessage,
};
