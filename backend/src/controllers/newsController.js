import prisma from '../prisma.js'

export async function getAllNews(req, res) {
  try {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(news)
  } catch (error) {
    console.error('getAllNews error', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getNewsById(req, res) {
  const id = Number.parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Неверный формат ID' })
  }
  try {
    const news = await prisma.news.findUnique({ where: { id } })
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' })
    }
    res.json(news)
  } catch (error) {
    console.error('getNewsById error', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
