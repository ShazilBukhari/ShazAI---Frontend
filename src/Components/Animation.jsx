import { TypeAnimation } from 'react-type-animation';

const Animation = () => (
  <TypeAnimation
    sequence={['React Typing Animation', 1000, 'Using Library', 2000]}
    wrapper="span"
    cursor={true}
    repeat={Infinity}
    style={{ fontSize: '2em' }}
  />
);
export default Animation