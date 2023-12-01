'use client';
import { MainLayout } from '@/components/layouts';
import { Ranking } from '@/components/molecules/Ranking';
import { SheetsPage } from '@/components/pages';

export default function Page() {
  return (
    <MainLayout>
      <Ranking />
      <SheetsPage />
    </MainLayout>
  );
}
