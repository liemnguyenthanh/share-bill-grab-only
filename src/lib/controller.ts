import { Ranking } from '@/models/Ranking';
import connectDB from './connectDb';
import { RankingType } from '@/types';

interface RankingFilter {
  page?: number;
  limit?: number;
}

export async function getRankItems(filter: RankingFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const rankingItems = await Ranking.find()
      .skip(skip)
      .limit(limit)
      .sort({ payment_period: 'desc' })
      .lean()
      .exec();
    const list: RankingType[] = rankingItems.map((item) => ({
      name: item.name,
      date: item.date,
      payment_period: item.payment_period,
      slug: item.slug,
      price: item.price,
    }));
    const results = rankingItems.length;

    return {
      list,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}
