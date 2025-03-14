var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _info, _Restaurant_instances, validate_fn, _restaurants, _filterType, _Restaurants_instances, setToLocalStorage_fn, getFromLocalStorage_fn, filterByFavorite_fn, filterByCategory_fn, sortByName_fn, sortByDistance_fn, renderRestaurants_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const $ = (selector, parent = document) => parent.querySelector(selector);
const Title = ({ text, tagName, handleClickTitle: handleClickTitle2, className }) => {
  const title = document.createElement(tagName);
  [...className].forEach((name) => title.classList.add(name));
  title.textContent = text;
  title.addEventListener("click", () => handleClickTitle2());
  return title;
};
const createElement = (htmlTemplate) => {
  const $el = document.createElement("div");
  $el.innerHTML = htmlTemplate.trim();
  return $el.firstChild;
};
const Image = (src, alt, className) => {
  return createElement(
    /*html*/
    `
    <img class="${className}" src=${src} alt=${alt}/>
  `
  );
};
const ModalContent = (contents) => {
  const modalContent = document.createElement("div");
  modalContent.addEventListener("click", (e) => e.stopPropagation());
  modalContent.classList.add("modal-container");
  contents.forEach((content) => {
    modalContent.appendChild(content);
  });
  $(".modal-backdrop").appendChild(modalContent);
  return modalContent;
};
const BUTTON_TEXT = {
  CANCEL: "취소하기",
  ADD: "추가하기",
  DELETE: "삭제하기",
  CLOSE: "닫기"
};
const FOOD_CATEGORY = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  asian: "아시안",
  western: "양식",
  etc: "기타"
};
const INPUT_HELP_TEXT = {
  SELECT_PLACEHOLDER: "선택해주세요.",
  DESCRIPTION: "메뉴 등 추가 정보를 입력해 주세요.",
  LINK: "매장 정보를 확인할 수 있는 링크를 입력해 주세요."
};
const WALK_TIME_MINUTES = [5, 10, 15, 20, 30];
const ERROR_MESSAGE = {
  CATEGORY_FIELD_REQUIRED: "카테고리를 선택해주세요.",
  NAME_FIELD_REQUIRED: "이름을 입력해주세요.",
  DISTANCE_FIELD_REQUIRED: "거리를 선택해주세요."
};
const validateEmptyString = (string, message) => {
  if (string === "") throw new Error(message);
};
class Restaurant {
  constructor({
    id,
    category,
    name,
    distance,
    description,
    link,
    favorite = false
  }) {
    __privateAdd(this, _Restaurant_instances);
    __privateAdd(this, _info);
    __publicField(this, "toggleFavoriteMark", () => {
      __privateGet(this, _info).favorite = !__privateGet(this, _info).favorite;
      return __privateGet(this, _info).favorite;
    });
    __privateSet(this, _info, {
      id,
      category,
      name,
      distance,
      description,
      link,
      favorite
    });
    __privateMethod(this, _Restaurant_instances, validate_fn).call(this);
  }
  grantId(id) {
    __privateGet(this, _info).id = id;
  }
  toJSON() {
    return __privateGet(this, _info);
  }
  get info() {
    return {
      ...__privateGet(this, _info)
    };
  }
}
_info = new WeakMap();
_Restaurant_instances = new WeakSet();
validate_fn = function() {
  validateEmptyString(
    __privateGet(this, _info).category,
    ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED
  );
  validateEmptyString(__privateGet(this, _info).name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
  validateEmptyString(
    __privateGet(this, _info).distance,
    ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED
  );
};
const clearError = () => {
  var _a;
  (_a = $(".error-message")) == null ? void 0 : _a.remove();
};
const addIdToError = (id, validateFn) => {
  try {
    clearError();
    validateFn();
  } catch (e) {
    throw new Error(e.message, { cause: id });
  }
};
const validateStringLength = (string, { minLength, maxLength }) => {
  if (string.length <= maxLength && string.length >= minLength) return;
  if (minLength === 0) throw new Error(`${maxLength}자 이하를 작성해주세요.`);
  throw new Error(`${minLength}자 이상 ${maxLength}자 이하를 작성해주세요.`);
};
const validateInfo = (info) => {
  addIdToError(
    "category",
    () => validateEmptyString(info.category, ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED)
  );
  addIdToError("name", () => {
    validateEmptyString(info.name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
    validateStringLength(info.name, { minLength: 1, maxLength: 20 });
  });
  addIdToError(
    "distance",
    () => validateEmptyString(info.distance, ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED)
  );
  addIdToError("description", () => {
    if (info.description)
      validateStringLength(info.description, { minLength: 0, maxLength: 500 });
  });
  return info;
};
const getInfo = () => {
  const form = $("#register-form");
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());
  return validateInfo(info);
};
const Button = ({ text, style, onClick, type = "submit", id }) => {
  const button = createElement(
    /*html*/
    `
    <button type=${type} id=${id} class="button text-caption ${style}">
      ${text}
    </button>
  `
  );
  button.addEventListener("click", onClick);
  return button;
};
const ErrorMessage = (message) => {
  return createElement(
    /*html*/
    `
    <p class="error-message text-caption">
      ${message}
    </p>
  `
  );
};
const Input = ({ name, required = false }) => {
  return createElement(
    /*html*/
    `
    <input type="text" id=${name} name=${name} ${required ? "required" : ""}/>
  `
  );
};
const LABEL_TEXT = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크"
};
const InputField = (infoType, inputElement, text) => {
  const inputField = createElement(
    /*html*/
    `
    <div class="form-item" id=${infoType}-form-item>
      <label for=${infoType} class="text-caption">${LABEL_TEXT[infoType]}</label>
    </div>  
  `
  );
  const helpText = createElement(
    /*html*/
    `
    <span class="help-text text-caption">${text}</span> 
  `
  );
  inputField.appendChild(inputElement);
  if (text) inputField.appendChild(helpText);
  return inputField;
};
const modalCloseAndFilter = (filter) => {
  modalClose();
  filter();
};
const modalClose = () => {
  const backDrop = $(".modal-backdrop");
  backDrop.classList.remove("open");
  backDrop.replaceChildren();
};
const Select = ({
  name,
  required = false,
  options,
  hasDefaultOption = false,
  onChange
}) => {
  const select = createElement(
    /*html*/
    `
    <select name=${name} id=${name} ${required ? "required" : ""}>
    </select>
  `
  );
  if (!hasDefaultOption) {
    const defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "");
    defaultOption.textContent = INPUT_HELP_TEXT.SELECT_PLACEHOLDER;
    select.appendChild(defaultOption);
  }
  options.forEach((option) => {
    const optionTag = document.createElement("option");
    optionTag.setAttribute("value", option.value);
    optionTag.textContent = option.label;
    select.appendChild(optionTag);
  });
  select.addEventListener("change", onChange);
  return select;
};
const TextArea = ({ name, required = false }) => {
  return createElement(
    /*html*/
    `
    <textarea type="text" name=${name} id=${name} required=${required}></textarea>
  `
  );
};
const ButtonContainer = (buttons) => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttons.forEach((button) => buttonContainer.appendChild(button));
  return buttonContainer;
};
const RegisterForm = (addRestaurant) => {
  const registerForm = document.createElement("form");
  registerForm.setAttribute("id", "register-form");
  registerForm.appendChild(
    InputField(
      "category",
      Select({
        name: "category",
        required: true,
        options: Object.keys(FOOD_CATEGORY).map((key) => ({
          label: FOOD_CATEGORY[key],
          value: key
        }))
      })
    )
  );
  registerForm.appendChild(
    InputField("name", Input({ name: "name", required: true }))
  );
  registerForm.appendChild(
    InputField(
      "distance",
      Select({
        name: "distance",
        required: true,
        options: WALK_TIME_MINUTES.map((key) => ({
          label: `${key}분 내`,
          value: `${key}`
        }))
      })
    )
  );
  registerForm.appendChild(
    InputField(
      "description",
      TextArea({ name: "description" }),
      INPUT_HELP_TEXT.DESCRIPTION
    )
  );
  registerForm.appendChild(
    InputField("link", Input({ name: "link" }), INPUT_HELP_TEXT.LINK)
  );
  registerForm.appendChild(
    ButtonContainer([
      Button({
        text: BUTTON_TEXT.CANCEL,
        style: "button--secondary",
        onClick: modalClose,
        type: "button",
        id: "cancel-button"
      }),
      ,
      Button({
        text: BUTTON_TEXT.ADD,
        style: "button--primary",
        onClick: (e) => {
          try {
            registerRestaurant(e, addRestaurant);
          } catch (e2) {
            onSubmitFailed(e2);
          }
        },
        id: "register-button"
      })
    ])
  );
  return registerForm;
};
const onSubmitFailed = (e) => {
  const currentInputField = $(`#${e.cause}-form-item`);
  currentInputField.appendChild(ErrorMessage(e.message));
};
const registerRestaurant = (e, addRestaurant) => {
  e.preventDefault();
  const info = getInfo();
  addRestaurant(new Restaurant(info));
  $("select#category").value = "all";
  modalClose();
};
const registerIcon = (addRestaurant) => {
  const registerIcon2 = document.createElement("button");
  registerIcon2.classList.add("gnb__button");
  registerIcon2.appendChild(Image("./add-button.png", "음식점 추가"));
  registerIcon2.addEventListener("click", () => {
    $(".modal-backdrop").classList.add("open");
    ModalContent([
      Title({
        text: "새로운 음식점",
        tagName: "h2",
        className: ["modal-title", "text-title"]
      }),
      RegisterForm(addRestaurant)
    ]);
  });
  return registerIcon2;
};
const header = (addRestaurant) => {
  const header2 = document.createElement("header");
  header2.classList.add("gnb");
  header2.appendChild(
    Title({
      text: "점심 뭐 먹지",
      tagName: "h1",
      className: ["gnb__title", "text-title"]
    })
  );
  header2.appendChild(registerIcon(addRestaurant));
  return header2;
};
const Modal = (filter) => {
  const backDrop = createElement(
    /*html*/
    `
    <div class="modal-backdrop"></div>
  `
  );
  backDrop.addEventListener("click", () => modalCloseAndFilter(filter));
  return backDrop;
};
const CategoryAndSortFilter = (changeState) => {
  const filterContainer = document.createElement("section");
  filterContainer.classList.add("restaurant-filter-container");
  filterContainer.appendChild(
    Select({
      hasDefaultOption: true,
      name: "category",
      options: [
        { label: "전체", value: "all" },
        ...Object.keys(FOOD_CATEGORY).map((key) => ({
          label: FOOD_CATEGORY[key],
          value: key
        }))
      ],
      onChange: (e) => changeState({ category: e.target.value })
    })
  );
  filterContainer.appendChild(
    Select({
      hasDefaultOption: true,
      name: "sorting",
      options: [
        { label: "이름순", value: "name" },
        { label: "거리순", value: "distance" }
      ],
      onChange: (e) => changeState({ option: e.target.value })
    })
  );
  return filterContainer;
};
const Tab = ({ text, id, active = false, changeState }) => {
  const tab = createElement(
    /*html*/
    `
    <div class="favorite-filter-tab ${active ? "active" : ""}" id=${id}>${text}</div>
  `
  );
  tab.addEventListener("click", (e) => {
    var _a, _b;
    (_a = e.target.previousSibling) == null ? void 0 : _a.classList.remove("active");
    (_b = e.target.nextSibling) == null ? void 0 : _b.classList.remove("active");
    e.target.classList.add("active");
    if (e.target.id === "favorite-all") {
      changeState({ favorite: false });
      return;
    }
    changeState({ favorite: true });
  });
  return tab;
};
const FavoriteTabFilters = (changeState) => {
  const filters = document.createElement("div");
  filters.classList.add("favorite-filter-container");
  filters.appendChild(
    Tab({
      text: "모든 음식점",
      id: "favorite-all",
      active: true,
      changeState
    })
  );
  filters.appendChild(
    Tab({
      text: "자주 가는 음식점",
      id: "favorite",
      changeState
    })
  );
  return filters;
};
const Space = () => {
  return createElement(`<div class="space"></div>`);
};
const CategoryImage = (category) => {
  const categoryImage = document.createElement("div");
  categoryImage.classList.add("restaurant__category");
  const src = `./category-${category}.png`;
  categoryImage.appendChild(Image(src, category, "category-icon"));
  return categoryImage;
};
const Description = (text, ellipsis) => {
  return createElement(
    /*html*/
    `
    <p class="restaurant__description text-body ${ellipsis ? "text-ellipsis" : ""}">
      ${text}
    </p>
    `
  );
};
const Distance = (minute) => {
  return createElement(
    /*html*/
    `
    <span class="restaurant__distance text-body">${`캠퍼스부터 ${minute}분 내`}</span>
    `
  );
};
const RestaurantInfo = ({
  id,
  name,
  distance,
  description,
  favorite,
  toggleFavoriteMark,
  handleClickTitle: handleClickTitle2
}) => {
  const restaurantInfo = document.createElement("div");
  restaurantInfo.classList.add("restaurant__info");
  restaurantInfo.setAttribute("id", `restaurant__info__${id}`);
  restaurantInfo.appendChild(
    Title({
      text: name,
      tagName: "h3",
      className: ["restaurant__name", "text-subtitle"],
      handleClickTitle: handleClickTitle2
    })
  );
  restaurantInfo.appendChild(Distance(distance));
  restaurantInfo.appendChild(Description(description[0], description[1]));
  const favoriteMark = createElement(
    /*html*/
    `
      <div class="restaurant__favorite-mark">${favorite ? "★" : "☆"}</div>
  `
  );
  favoriteMark.addEventListener("click", () => {
    const favorite2 = toggleFavoriteMark();
    favoriteMark.innerHTML = favorite2 ? "★" : "☆";
  });
  restaurantInfo.appendChild(favoriteMark);
  return restaurantInfo;
};
const RestaurantCard = (restaurant, filter, deleteRestaurant) => {
  const { id, category, name, distance, description, favorite } = restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");
  restaurantCard.prepend(CategoryImage(category));
  restaurantCard.appendChild(
    RestaurantInfo({
      id,
      name,
      distance,
      description: [description, true],
      favorite,
      toggleFavoriteMark: () => {
        restaurant.toggleFavoriteMark();
        filter();
      },
      handleClickTitle: () => handleClickTitle(restaurant, filter, deleteRestaurant)
    })
  );
  return restaurantCard;
};
function handleClickTitle(restaurant, filter, deleteRestaurant) {
  const { category, name, distance, description, favorite, link } = restaurant.info;
  $(".modal-backdrop").classList.add("open");
  ModalContent([
    CategoryImage(category),
    Space(),
    RestaurantInfo({
      name,
      distance,
      description: [description, false],
      favorite,
      toggleFavoriteMark: restaurant.toggleFavoriteMark
    }),
    createElement(
      /*html*/
      `<a href=${link} class="restaurant__link">${link}</a>`
    ),
    ButtonContainer([
      Button({
        text: BUTTON_TEXT.DELETE,
        style: "button--secondary",
        onClick: () => {
          const isConfirm = confirm("정말 삭제하시겠습니까?");
          if (isConfirm) {
            deleteRestaurant(restaurant.info.id);
            modalCloseAndFilter(filter);
          }
        },
        type: "button",
        id: "delete-button"
      }),
      Button({
        text: BUTTON_TEXT.CLOSE,
        style: "button--primary",
        onClick: () => modalCloseAndFilter(filter),
        id: "close-button"
      })
    ])
  ]);
}
const defaultRestaurants = [
  new Restaurant({
    id: 1,
    category: "korean",
    name: "피양콩할마니",
    distance: WALK_TIME_MINUTES[0],
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    link: "http//localhost:30000"
  }),
  new Restaurant({
    id: 2,
    category: "chinese",
    name: "친친",
    distance: WALK_TIME_MINUTES[2],
    description: "설명입니다",
    link: "http//localhost:30000"
  }),
  new Restaurant({
    id: 3,
    category: "japanese",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[1],
    description: "설명입니다",
    link: "http//localhost:30000"
  }),
  new Restaurant({
    id: 4,
    category: "japanese",
    name: "한나",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000"
  })
];
class Restaurants {
  constructor() {
    __privateAdd(this, _Restaurants_instances);
    __privateAdd(this, _restaurants);
    __privateAdd(this, _filterType);
    __publicField(this, "addRestaurant", (restaurant) => {
      restaurant.grantId(__privateGet(this, _restaurants).length + 1);
      __privateGet(this, _restaurants).push(restaurant);
      __privateGet(this, _filterType).category = "all";
      this.filter();
    });
    __publicField(this, "deleteRestaurant", (id) => {
      __privateSet(this, _restaurants, __privateGet(this, _restaurants).filter((res) => res.info.id !== id));
    });
    __publicField(this, "changeState", (state) => {
      const sortType = Object.keys(state)[0];
      const sortState = state[sortType];
      if (sortType === "category") {
        __privateGet(this, _filterType).category = sortState;
      } else if (sortType === "option") {
        __privateGet(this, _filterType).option = sortState;
      } else if (sortType === "favorite") {
        __privateGet(this, _filterType).favorite = sortState;
      }
      this.filter();
    });
    __publicField(this, "filter", () => {
      const filtered = __privateMethod(this, _Restaurants_instances, filterByCategory_fn).call(this, __privateMethod(this, _Restaurants_instances, filterByFavorite_fn).call(this));
      if (__privateGet(this, _filterType).option === "name") __privateMethod(this, _Restaurants_instances, sortByName_fn).call(this, filtered);
      if (__privateGet(this, _filterType).option === "distance") __privateMethod(this, _Restaurants_instances, sortByDistance_fn).call(this, filtered);
      __privateMethod(this, _Restaurants_instances, renderRestaurants_fn).call(this, filtered);
    });
    __privateSet(this, _restaurants, [...defaultRestaurants]);
    __privateSet(this, _filterType, {
      category: "all",
      option: "name",
      favorite: false
    });
    __privateMethod(this, _Restaurants_instances, getFromLocalStorage_fn).call(this);
    this.filter();
  }
}
_restaurants = new WeakMap();
_filterType = new WeakMap();
_Restaurants_instances = new WeakSet();
setToLocalStorage_fn = function() {
  const stringifyData = JSON.stringify(
    __privateGet(this, _restaurants).map((restaurant) => restaurant.toJSON())
  );
  localStorage.setItem("restaurants", stringifyData);
};
getFromLocalStorage_fn = function() {
  const storedDataString = localStorage.getItem("restaurants");
  if (storedDataString) {
    const parsedData = JSON.parse(storedDataString);
    __privateSet(this, _restaurants, parsedData.map(
      (data) => new Restaurant(data)
    ));
  }
};
filterByFavorite_fn = function() {
  if (__privateGet(this, _filterType).favorite) {
    return [...__privateGet(this, _restaurants)].filter(
      (restaurant) => restaurant.info.favorite
    );
  }
  return [...__privateGet(this, _restaurants)];
};
filterByCategory_fn = function(restaurants) {
  if (__privateGet(this, _filterType).category === "all") return restaurants;
  return restaurants.filter(
    (restaurant) => restaurant.info.category === __privateGet(this, _filterType).category
  );
};
sortByName_fn = function(restaurants) {
  return restaurants.sort((a, b) => a.info.name.localeCompare(b.info.name));
};
sortByDistance_fn = function(restaurants) {
  return restaurants.sort((a, b) => a.info.distance - b.info.distance);
};
renderRestaurants_fn = function(restaurants) {
  const ulTag = $(".restaurant-list");
  ulTag.replaceChildren();
  if (restaurants.length === 0) {
    ulTag.appendChild(
      createElement(`<div>등록된 식당이 존재하지 않습니다.</div>`)
    );
    return;
  }
  __privateMethod(this, _Restaurants_instances, setToLocalStorage_fn).call(this);
  restaurants.forEach((restaurant) => {
    ulTag.appendChild(
      RestaurantCard(restaurant, () => this.filter(), this.deleteRestaurant)
    );
  });
};
addEventListener("load", () => {
  const restaurantList = new Restaurants();
  $("#app").prepend(header(restaurantList.addRestaurant));
  $("main").prepend(CategoryAndSortFilter(restaurantList.changeState));
  $("main").prepend(FavoriteTabFilters(restaurantList.changeState));
  $("main").appendChild(Modal(restaurantList.filter));
});
