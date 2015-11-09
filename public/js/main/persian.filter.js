import persianjs from 'usablica/persian.js';

export default function() {
  return function(input) {
    return persianjs(input + '').arabicChar().englishNumber().arabicNumber().toString();
  };
}
