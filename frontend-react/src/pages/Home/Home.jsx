import "./home.css"
import HeroSearch from './HeroSearch'
import HomeStart from './HomeStart'
import HomeReview from './HomeReview'
import MainHero from './MainHero'
import HomeFeature from './HomeFeature'
import BetaNotice from "@/components/notice/BetaNotice"

export default function Home() {

  return (
    <div>
      <BetaNotice />
      {/* <TrialNotice open={open}
        onOpenChange={setOpen}
        onStartExploring={() => setOpen(false)}/> */}
      <MainHero />
      <HeroSearch />
      <HomeFeature />
      <HomeReview />
      <HomeStart />
    </div>
  )
}
