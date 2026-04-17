"use client";
import ProjectList from '@/components/DomainWise/ProjectList/ProjectList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/opsedge/flow_diagram");
  }, [router]);

  return (
    <>
      <ProjectList />
    </>
  );
};

export default Page;