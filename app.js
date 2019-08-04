const searchInput = document.getElementById('js_search-input');
const buttonSearch = document.getElementById("js_search-btn");
const errorMsg = document.getElementById("js_error-msg");
const instruction = document.getElementById("js_instruction");

const resultsWrapper = document.getElementById("js_results");

const c_name = document.getElementById("js_company-name");
const c_domain = document.getElementById("js_company-domain");
const c_logo = document.getElementById("js_company-logo");

const loader = document.getElementById("js_loader");


function getData(name) {
    url= `https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`;

    loader.classList.add("show");
   
    axios.get(url)
    .then(resultat => {
        handleResponse(resultat.data);
    }).catch(e => {
        handleError()
        console.error(e);
    })

    instruction.classList.remove('show');
    errorMsg.classList.remove('show');

};

function handleError() {
    errorMsg.classList.add('show');
    resultsWrapper.classList.remove('show');
    loader.classList.remove("show");
  
};

function handleResponse(company) {
    loader.classList.remove("show");
    showData(company);
};
    

function showData(data) {

    resultsWrapper.classList.add('show');
    const company_1 = data[0];
    const name = company_1.name;
    const domain = company_1.domain;

    c_name.textContent = name;
    c_domain.textContent = domain;
    c_logo.src = `https://logo.clearbit.com/${domain}`;

};

function handleSearch() {
    const text = searchInput.value;

    if (text) {
        getData(text);
    }

    getData(text);
    
};

function addListenerToSearchButton() {
    
    buttonSearch.addEventListener('click', handleSearch);

}


addListenerToSearchButton() 