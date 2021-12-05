import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const callPapagoTranslation = (
  source: string,
  target: string,
  text: string
) => {
  let translatedString: string = '';
  let status;
  axios
    .request({
      url: 'https://openapi.naver.com/v1/papago/n2mt',
      method: 'POST',
      data: {
        source,
        target,
        text
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'X-Naver-Client-Id': process.env.NAVER_PAPAGO_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_PAPAGO_CLIENT_SECRET!
      }
    })
    .then(res => {
      status = 200;
      translatedString = res.data;
    })
    .catch(err => {
      status = 400; // FIX
      if (err.response) console.log('res error : ', err.response.data);
      if (err.request) console.log('req error : ', err.request.data);
    });

  return { translatedString, status };
};

export default callPapagoTranslation;
