export default function handler(req, res) {
    // GET 요청에 대해 200 상태 코드와 메시지를 응답
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Healthy' });
    } else {
      // 허용되지 않은 메서드에 대해 405 상태 코드 응답
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }