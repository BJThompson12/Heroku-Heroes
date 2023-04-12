const source = document.querySelector('#about-template').innerHTML;
const template = Handlebars.compile(source);


const data = {
    companyName: 'AniMatch',
    companyDescription: 'We made a tinder like website but instead of people its Anime!',
};

const aboutSection = document.querySelector('#about');
aboutSection.innerHTML = template(data);