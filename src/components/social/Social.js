import config from "../../config.json";

import {Twitter} from "../links/Twitter";
import {GitHub} from "../links/GitHub";

export const Social = ({margin, color = 'text-black dark:text-white'}) => {
    return <div className={`flex ${margin}`}>
        <GitHub url={config.github} label="GitHub" small={true} color={color}></GitHub>

        <Twitter url="https://twitter.com/daviddalbusco" label={`Twitter @daviddalbusco`} small={true} color={color}></Twitter>

        <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdiscoverweekly.dev&text=Check+out+DiscoverWeekly.dev+by+%40daviddalbusco%20%F0%9F%A4%9F" rel="noopener norefferer" aria-label="Share on Twitter" className={`m-2 hover:text-purple-600 ${color}`}>
            <svg className="h-6 w-6 fill-current" viewBox='0 0 512 512'><path d='M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40M336 128l-80-80-80 80M256 321V48' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/></svg>
        </a>
    </div>
}
