import ClientOnly from '@/components/atoms/ClientOnly';
import { MainLayout } from '@/components/layouts';
import { Ranking } from '@/components/molecules/Ranking';
import { SheetsPage } from '@/components/pages';
import { getRankItems } from '@/lib/controller';

export default async function Page() {
  const rankingItems = await getRankItems();

  return (
    <MainLayout>
      <ClientOnly>
        <Ranking rankingItems={rankingItems.list ?? []} />
      </ClientOnly>
      <SheetsPage />
    </MainLayout>
  );
}
