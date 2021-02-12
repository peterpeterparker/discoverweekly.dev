import config from '../../config.json';

import styles from './Hero.module.scss';

import {PrimaryButton} from "../button/PrimaryButton";
import {SecondaryButton} from "../button/SecondaryButton";
import {Background} from "../background/Background";
import {Social} from "../social/Social";

export const Hero = () => {
    return (
        <article className={`w-full relative ${styles.height}`}>

            <Background></Background>

            <div className={`flex justify-center items-center flex-col mt-8 ${styles.position}`}>
                <div className="mx-4 text-center">
                    <h1 className="font-bold text-2xl xs:text-4xl sm:text-6xl lg:text-8xl mb-2 sm:mb-4 text-white tracking-wide">{config.title}</h1>
                    <p className="sm:text-2xl lg:text-3xl mb-8 text-white">{config.description}</p>
                    <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                        <PrimaryButton>
                            Share your playlist
                        </PrimaryButton>
                        <SecondaryButton>
                            Get playlists
                        </SecondaryButton>
                    </div>
                </div>

                <Social margin="m-8"></Social>
            </div>
        </article>
    )
}
