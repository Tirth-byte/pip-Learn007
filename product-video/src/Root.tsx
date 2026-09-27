import React from 'react';
import {Composition} from 'remotion';
import {PipLearnLaunch, type LaunchProps} from './Video';

export const Root: React.FC = () => (
  <Composition
    id="PipLearnLaunch"
    component={PipLearnLaunch}
    durationInFrames={1080}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{bgm: true}}
  />
);
