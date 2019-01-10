const PubSub = require('../helpers/pub_sub.js');

const Countries = function(){
  this.countries = [];
}

Countries.prototype.bindEvents = function(){

  PubSub.subscribe('SelectView:country-selected', (event) => {
    const selectedIndex = event.detail;
    const country = this.findCountry(selectedIndex);
    // console.log(country);

    PubSub.publish('Countries:country-found', country);
  });
}

Countries.prototype.findCountry = function(index){
  return this.countries[index];
};


Countries.prototype.getData = function(){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status !== 200){
      return;
    }
    // console.log(xhr.responseText);
    const jsonString = xhr.responseText;
    const data = JSON.parse(jsonString);
    // console.log(data);
    this.countries = data;
    PubSub.publish('Countries:all-countries-ready', this.countries);
  });

  xhr.open('GET', 'https://restcountries.eu/rest/v2/');
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send();
}

module.exports = Countries;
