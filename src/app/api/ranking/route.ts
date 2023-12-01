import { getRankItems } from '@/lib/controller';

export async function GET() {
  const res = await getRankItems();
  return Response.json(res);
}
