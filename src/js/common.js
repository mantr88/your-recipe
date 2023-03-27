import axios from "axios";

const refs = {
    dishes: document.querySelector('.projects'),
    submitBtn: document.querySelector('.query_submit'),
    form: document.querySelector('.query'),
};
console.log(refs.dishes)

let items = [];
let query = '';

const render = (items) => {
    const markup = items.map(({ name, slug, thumbnail_url, total_time_tier, description }) => `
    <li class="projects__item">
              <a href="" class="case-link links">
                <div class="projects__thumb">
                  <div class="projects__hover-overlay">
                    <p class="projects__description">
                      ${description}
                    </p>
                  </div>
                  <img src="${thumbnail_url}" alt="${slug}" width="370px" hight="274px" loading="lazy" />
                </div>
                <div class="projects__title-block">
                  <h2 class="projects__title">${name}</h2>
                  <p class="projects__text">Cooking time ${total_time_tier.display_tier}</p>
                </div>
              </a>
    </li>
    `).join('');
    
    refs.dishes.innerHTML = '';
    refs.dishes.insertAdjacentHTML('beforeend', markup);
    
}

const searchRecipe = (query) => {
    const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  params: {from: '0', size: '20', tags: 'under_30_minutes', q: `${query}`},
  headers: {
    'X-RapidAPI-Key': '2687ce53a9msh9d98799d769c03fp1bef36jsn78fb9a080fbe',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

return axios.request(options).then(function (response) {
    console.log(response.data);
    items = response.data.results;
    render(items);
}).catch(function (error) {
	console.error(error);
});
}



const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    // отримуємо строку запита
    const { value } = e.target.elements.query;
    console.log(value);
    
    // якщо запит введено вперше та поле запиту не порожшнє,
    // то записуємо строку запиту в змінну
    if (query === value || !value) {
        return;
    };
    
    query = value.trim();

    if (query === '') {
        return;
    };
    // для отримання першої сторінки отриманих данних від АРІ    
    // page = 1;
    // викликаємо функцію обробки пошуку данних по запиту в АРІ
    searchRecipe(query);
}

refs.form.addEventListener('submit', submitHandler);
