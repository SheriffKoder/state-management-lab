import {
  HomepageCurrentFocusSection,
  HomepageHeader,
  HomepageShowcaseSection,
  HomepageSideNav,
  HomepageTextSectionBlock,
} from "@/features/homepage";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { homepageNavigationConfig } from "@/lib/homepage-navigation";
import { homepageShowcaseConfig } from "@/lib/homepage-showcase";
import {
  homepageRecentLearningsConfig,
  homepageStateOwnershipConfig,
} from "@/lib/homepage-text-sections";export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <div className="flex flex-row h-screen overflow-hidden relative bg-[rgba(26,26,26,0.05)]">

        <HomepageSideNav groups={homepageNavigationConfig} />

        <div className="flex-1 flex flex-col items-start justify-start m-4 border border-foreground/10 border-l-0 gradient-border-l rounded-md p-4 bg-background/50 backdrop-blur-sm relative z-[2]">
          <HomepageHeader
            title="State Management Lab"
            description="A structured exploration of state management patterns in React and Next.js—from local UI state to global client state, server cache, and URL-driven state."
          />
          <div className="flex flex-col gap-4 w-full overflow-y-auto">
           <HomepageCurrentFocusSection groups={homepageNavigationConfig} />
            {/* <HomepageShowcaseSection config={homepageShowcaseConfig} /> */}
            {/* <HomepageTextSectionBlock config={homepageStateOwnershipConfig} /> */}
            {/* <HomepageTextSectionBlock config={homepageRecentLearningsConfig} /> */}
          </div>
        </div>

      </div>


      <div className="fixed top-4 right-4 z-[10]">
        <ThemeSwitcher />
      </div>
    </main>
  );
}
