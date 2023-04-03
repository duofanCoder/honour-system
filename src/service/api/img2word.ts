import axios from 'axios';

// const AK = "3R28aw9C50ocDImSHd8bCIG4"
// const SK = "Gtt7yyuPSPOXcYa6KNbnX9s1HjxCdZK5"

function getBase64FromUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.send();
  });
}

async function getTextFromImage(image: string) {
  const url = 'https://aip.baidubce.com/baiduApi/rest/2.0/ocr/v1/general_basic';
  const imageBase64 = await getBase64FromUrl(image);
  try {
    let params = new FormData();
    params.append('image', imageBase64.substring(imageBase64.indexOf(',') + 1));
    const response = await axios.post(url, params, {
      params: {
        access_token: '24.f6784f49a5716570a0d1d9348c298f80.2592000.1683047390.282335-17666477',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.words_result) {
      return response.data.words_result;
    } else {
      throw new Error('No text found in image');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get text from image');
  }
}

// async function getAccessToken(apiKey = AK, secretKey = SK): Promise<string> {
//     const url = 'https://aip.baidubce.com/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secretKey;
//
//     try {
//         const response = await axios.get(url);
//
//         return response.data.access_token;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to get access token');
//     }
// }

export default getTextFromImage;