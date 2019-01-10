const PubSub = require('../helpers/pub_sub.js');

const CountryView = function(){

};

CountryView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-selected', (event) => {
    const country = event.detail;
    this.render(country);
  });
}

CountryView.prototype.render = function(country){
  const container = document.querySelector('#country');
  container.innerHTML = '';

  const header = this.addElement('h2', country.name);

  const region = this.addElement('p', country.description);

  // const flag = this.addElement('h3', 'Instruments include:');

  container.appendChild(header);
  container.appendChild(region);
  // container.appendChild(flag);
};

CountryView.prototype.addElement = function(type, text){
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}

module.exports = CountryView;
