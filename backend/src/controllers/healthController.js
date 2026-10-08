import prisma from '../prisma.js'

export async function getHealth(req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', db: 'ok' })
  } catch {
    res.status(503).json({ status: 'ok', db: 'error' })
  }
}
