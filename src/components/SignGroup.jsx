import { GoogleAuth } from 'components/GoogleAuth';
import { FacebookAuth } from './FacebookAuth';
import { PhoneAuth } from './PhoneAuth';

export const SignGroup = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 15,
      }}
    >
      <GoogleAuth />
      <FacebookAuth />
      <PhoneAuth />
    </div>
  );
};
