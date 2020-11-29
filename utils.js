import {Parser} from 'htmlparser2';
import {format} from 'date-fns';
import {it} from 'date-fns/locale';

export async function convertHTMLToText(htmlMessage) {
  return new Promise((resolve) => {
    let message = '';

    const parser = new Parser({
      ontext: (text) => (message += text),
      onend: () => resolve(message),
    });
    parser.write(htmlMessage);
    parser.end();
  });
}

export function italianFormat(date, dateFormat) {
  return format(date, dateFormat, {locale: it});
}
