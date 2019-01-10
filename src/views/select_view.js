const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:all-countries-ready', (event) => {
    // console.log(event.detail);
    this.populate(event.detail);
  });

  this.element.addEventListener('change', (event) => {
    // console.log(event.target);
    PubSub.publish('SelectView:country-selected', event.target.value)
  })
}

SelectView.prototype.populate = function(countries){
  countries.forEach((country, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = country.name;
    this.element.appendChild(option);
  })
};

module.exports = SelectView;
