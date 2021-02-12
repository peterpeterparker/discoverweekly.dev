import {useEffect, useState} from 'react';

import {Profile} from '../profile/Profile';
import {Twitter} from '../links/Twitter';
import {GitHub} from '../links/GitHub';
import {Website} from '../links/Website';

export const Author = ({frontmatter}) => {
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
      <Profile frontmatter={frontmatter} infoCss="mt-4" imageCss="big"></Profile>

      <p className="max-w-xs mt-8">{description}</p>

      {renderProject()}

      <div className="flex mt-4">
        {renderGitHub()}
        {renderTwitter()}
        {renderWebsite()}
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
        <a href={project} rel="noopener norefferer" aria-label={`${name} project`} className="text-white hover:text-purple-600 underline">
          {projectName}
        </a>{'!'}
      </p>
    );
  }

  function renderTwitter() {
    if (!twitter) {
      return undefined;
    }

    return <Twitter url={twitter} label={`Twitter @${twitter}`} small={true}></Twitter>;
  }

  function renderGitHub() {
    if (!github) {
      return undefined;
    }

    return <GitHub url={github} label={`GitHub ${github}`} small={true}></GitHub>;
  }

  function renderWebsite() {
    if (!website) {
      return undefined;
    }

    return <Website url={website} label={`Personal website`} small={true}></Website>;
  }
};
