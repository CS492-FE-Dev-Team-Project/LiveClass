import axios from 'axios';
import config from '../config';
import {
  Language,
  PapagoLanguageDetectionResponse,
  PapagoTranslateResponse
} from '../types';

const translate = async (source: Language, target: Language, text: string) => {
  if (source === target) return { result: text, status: 201 };

  const { data, status } = await axios.request({
    url: 'https://openapi.naver.com/v1/papago/n2mt',
    method: 'POST',
    data: {
      source,
      target,
      text
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-Naver-Client-Id': config.auth.naver.clientId,
      'X-Naver-Client-Secret': config.auth.naver.clientSecret
    }
  });

  const {
    message: { result: translatedText }
  }: PapagoTranslateResponse = data;

  return { result: translatedText, status };
};

// curl "https://openapi.naver.com/v1/papago/detectLangs" \
//     -d "query=만나서 반갑습니다." \
//     -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
//     -H "X-Naver-Client-Id: MsZ7xuiNrx_i7M53OKC7" \
//     -H "X-Naver-Client-Secret: ck0NrxrKXT" -v

const detectLanguage = async (query: string) => {
  const { data } = await axios.request({
    url: 'https://openapi.naver.com/v1/papago/detectLangs',
    method: 'POST',
    data: { query },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-Naver-Client-Id': config.auth.naver.clientId,
      'X-Naver-Client-Secret': config.auth.naver.clientSecret
    }
  });

  const { langCode }: PapagoLanguageDetectionResponse = data;

  return { src: langCode };
};

export { detectLanguage, translate };
