import React, {useEffect, useState} from 'react';

import {Profile} from '../profile/Profile';
import {Twitter} from '../links/Twitter';
import {GitHub} from '../links/GitHub';
import {Website} from '../links/Website';
import {SharePlaylist} from '../share/SharePlaylist';

export const Author = ({frontmatter, slug}) => {
  const {description, twitter, github, website, project, name} = frontmatter;

  const [projectName, setProjectName] = useState(undefined);

  useEffect(() => {
    if (!project) {
      return;
    }

    try {
      const url = new URL(project);
      setProjectName(url.hostname);
    } catch (err) {
      // Do not display a project then
    }
  }, [project]);

  return (
    <section className="max-w-screen-md m-auto p-5 mt-8 flex flex-col justify-center items-center text-center">
      <Profile frontmatter={frontmatter} infoCss="mt-4" standalone={true}></Profile>

      {description ? <p className="max-w-sm mt-0.5">{description}</p> : undefined}

      {renderProject()}

      <div className="flex mt-6">
        {renderGitHub()}
        {renderTwitter()}
        {renderWebsite()}
        <SharePlaylist slug={slug} name={name} twitter={twitter}></SharePlaylist>
      </div>
    </section>
  );

  function renderProject() {
    if (!project || !projectName) {
      return undefined;
    }

    return (
      <p className="mt-4">
        Check out my awesome project{' '}
        <a
          href={project}
          rel="noopener norefferer"
          aria-label={`${name} project`}
          className="dark:text-white hover:text-purple-600 dark:hover:text-purple-600 underline">
          {projectName}
        </a>
        {'!'}
      </p>
    );
  }

  function renderTwitter() {
    if (!twitter) {
      return undefined;
    }

    return <Twitter url={`https://twitter.com/${twitter}`} label={`Twitter @${twitter}`} small={false}></Twitter>;
  }

  function renderGitHub() {
    if (!github) {
      return undefined;
    }

    return <GitHub url={`https://github.com/${github}`} label={`GitHub ${github}`} small={false}></GitHub>;
  }

  function renderWebsite() {
    if (!website) {
      return undefined;
    }

    return <Website url={website} label={`Personal website`} small={false}></Website>;
  }
};
