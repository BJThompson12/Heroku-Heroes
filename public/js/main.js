const source = document.querySelector('#about-template').innerHTML;
const template = Handlebars.compile(source);


const data = {
    companyName: 'Acme Corp',
    companyDescription: 'We make things happen!',
    companyFounder: 'John Doe',
    foundingYear: 2005
};

const aboutSection = document.querySelector('#about');
aboutSection.innerHTML = template(data);