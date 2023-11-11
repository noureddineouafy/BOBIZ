import axios from 'axios';
import cheerio from 'cheerio';

let mediafireDl = async (url) => {
  let res = await axios.get(url);
  let $ = await cheerio.load(res.data);
  let hasil = [];
  let link = $('a#downloadButton').attr('href');
  let size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('', '');
  let seplit = link.split('/');
  let nama = seplit[5];
  let mime = nama.split('.');
  mime = mime[1];

  hasil.push({
    nama,
    mime,
    size,
    link
  });

  return hasil;
}

export {
  mediafireDl
};
