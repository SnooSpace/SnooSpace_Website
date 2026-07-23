import React from 'react';
import { HeroScreen } from '@/screens/HeroScreen';
import { WhyScreen } from '@/screens/WhyScreen';
import { JourneyScreen } from '@/screens/JourneyScreen';
import { ExperiencesScreen } from '@/screens/ExperiencesScreen';
import { RealAppScreen } from '@/screens/RealAppScreen';
import { CommunityScreen } from '@/screens/CommunityScreen';
import { RoadmapScreen } from '@/screens/RoadmapScreen';
import { DownloadScreen } from '@/screens/DownloadScreen';

export default function HomePage() {
  return (
    <>
      <HeroScreen />
      <WhyScreen />
      <JourneyScreen />
      <ExperiencesScreen />
      <RealAppScreen />
      <CommunityScreen />
      <RoadmapScreen />
      <DownloadScreen />
    </>
  );
}

