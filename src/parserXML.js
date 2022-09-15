import _ from 'lodash';

const uniqId = () => _.uniqueId();
const parserXML = (xml) => {
  const newDomParser = new DOMParser();
  const domXML = newDomParser.parseFromString(xml, 'text/xml');
  const feed = {
    title: domXML.querySelector('channel > title').textContent,
    description: domXML.querySelector('channel > description').textContent,
  };
  const items = domXML.querySelectorAll('item');
  const contents = [];
  items.forEach((item) => {
    contents.push({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      id: uniqId(),
      active: false,
    });
  });
  return { feed, contents };
};

export default parserXML;
