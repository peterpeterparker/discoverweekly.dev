import dynamic from "next/dynamic";

import config from '../../config.json';

import styles from './Hero.module.scss';

import {SharePlaylist} from "../button/SharePlaylist";
import {SecondaryButton} from "../button/SecondaryButton";
const Background = dynamic(() => import('../background/Background'), {ssr: false});
import {Social} from "../social/Social";

export const Hero = () => {
    return (
        <article className={`w-full relative ${styles.height} bg-black`}>

            <Background></Background>

            <div className={`flex justify-center items-center flex-col mt-8 ${styles.position}`}>
                <div className="mx-4 text-center">
                    <h1 className="font-bold text-2xl xs:text-4xl sm:text-6xl lg:text-8xl mb-2 sm:mb-4 text-white tracking-wide">{config.title}</h1>
                    <p className="sm:text-2xl lg:text-3xl mb-8 text-white">{config.description}</p>
                    <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                        <SharePlaylist label="Share your playlist"></SharePlaylist>
                        <SecondaryButton color="bg-black bg-opacity-80 text-white hover:text-black hover:bg-purple-400">
                            Get playlists
                        </SecondaryButton>
                    </div>
                </div>

                <Social margin="m-8" color={'text-white dark:text-white'}></Social>
            </div>
        </article>
    )
}
