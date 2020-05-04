// Dependent selects
// function findNestedObjectBySlug (obj, value) {
// 	let result = [];

// 	obj.forEach(item => result = item.slug === value ? item.children : findNestedObjectBySlug(item.children, value));

// 	return result;
// }

let rubricIdInput = document.querySelector('[name="rubrics_id"]');

function getNextSelectItems (selectItem) {
	let nextSelectItems = [];

	while (selectItem) {
		selectItem = selectItem.nextElementSibling;

		if (selectItem && selectItem.classList.contains('Filter_item-select')) {
			nextSelectItems.push(selectItem);
		}
	}

	return nextSelectItems;
}

function getPrevSelectItems (selectItem) {
	let prevSelectItems = [];

	while (selectItem) {
		selectItem = selectItem.previousElementSibling;

		if (selectItem && selectItem.classList.contains('Filter_item-select')) {
			prevSelectItems.push(selectItem);
		}
	}

	return prevSelectItems;
}

function drawSelectItem (tree, parentElem) {
	let lang = document.querySelector('html').getAttribute('lang');

	let selectItem = document.createElement('div');
	selectItem.className = 'Filter_item Filter_item-select';
	parentElem.append(selectItem);

	let parentId = tree[0]["parent_id"];
	selectItem.setAttribute('data-parent-id', +parentId);

	if (parentId) {
		selectItem.classList.add('hidden');
	}

	let select = document.createElement('select');
	select.className = 'Select Select-filterBlock';

	let defaultOption = new Option('Не выбрано', 'none');
	let options = [];

	tree.forEach(item => {
		let newOption = new Option(item.name[lang], item.slug);
		newOption.setAttribute('data-id', item.id);
		options.push(newOption);
	});

	select.append(defaultOption, ...options);
	selectItem.append(select);

	return selectItem;
}

function drawDependentSelects (tree, parentElem) {
	let select = drawSelectItem(tree, parentElem).querySelector('Select');

	let prevOptionId = null;

	select.onchange = function () {
		let optionId = this.options[this.selectedIndex].dataset.id;

		let currentSelectItem = this.closest('.Filter_item-select');
		let nextSelectItems = getNextSelectItems(currentSelectItem);

		toggleDependentSelects(nextSelectItems, optionId);
		prevOptionId = optionId;
		
		if (optionId != undefined) {
			rubricIdInput.value = optionId;
		} else {
			let prevParentItem = select.closest('.Filter_item-select').previousElementSibling;

			if (prevParentItem && prevParentItem.classList.contains('Filter_item-select')) {
				let prevParentItemSelectedIndex = prevParentItem.querySelector('Select').selectedIndex;
				rubricIdInput.value = prevParentItem.querySelector('Select').options[prevParentItemSelectedIndex].dataset.id;
			} else {
				rubricIdInput.value = null;
			}
		}
	};

	tree.forEach(item => {
		if (item.children.length) {
			drawDependentSelects(item.children, parentElem);
		}
	});

	$('.Select-filterBlock').fSelect('reload');
}

function toggleDependentSelects (selectItems, optionId) {
	for (let item of selectItems) {
		if (item.dataset.parentId == optionId) {
			item.classList.remove('hidden');
		} else {
			item.classList.add('hidden');
			item.querySelector('select').value = 'none';
		}

		$('.Select-filterBlock').fSelect('reload');
	}
}

function findTargetOption (optionId, parentElem) {
	let selectItems = parentElem.querySelectorAll('.Filter_item-select');

	for (let item of selectItems) {
		for (let option of item.querySelector('Select').options) {
			if (option.dataset.id == optionId) {
				return option;
			}
		}
	}
}

function showSelectChain (targetOption, optionId) {
	let selectItem = targetOption.closest('.Filter_item-select');
	let prevSelectItems = getPrevSelectItems(selectItem);
	let nextSelectItems = getNextSelectItems(selectItem);
	let parentId = selectItem.dataset.parentId;

	// console.log(prevSelectItems);

	selectItem.classList.remove('hidden');
	targetOption.selected = true;

	for (let item of prevSelectItems) {
		item.classList.remove('hidden');

		console.log(item.dataset.parentId);

		for (let option of item.querySelector('.Select').options) {
			if (option.dataset.id == parentId) {
				option.selected = true;
				parentId = item.dataset.parentId;
			}
		}
	}

	toggleDependentSelects(nextSelectItems, optionId);

	$('.Select-filterBlock').fSelect('reload');
}

// fetch('/ajax/rubrics.json')
// 	.then(response => response.json())
// 	.then(rubrics => {
// 		let selectedRubricsId = 0;

// 		let categoriesFilter = document.forms.categories_filter;
// 		let filterMain = categoriesFilter.querySelector('.Filter_main');

// 		drawDependentSelects(rubrics, filterMain);

// 		let url = new URL(window.location.href);

// 		if (url.searchParams.has('rubric_id')) {
// 			let rubricId = url.searchParams.get('rubric_id');

// 			let targetOption = findTargetOption(rubricId, filterMain);
// 			showSelectChain(targetOption, rubricId);
// 		}
		
// 	});

let rubrics = [
  {
    "id": 3,
    "slug": "wiki",
    "name": {
      "ru": "База знаний",
      "uk": "База знань"
    },
    "is_parentable": true,
    "is_editable": false,
    "is_deletable": false,
    "_lft": 9,
    "_rgt": 16,
    "parent_id": null,
    "created_at": "2020-01-27 18:09:39",
    "updated_at": "2020-01-27 18:09:39",
    "ancestors": [],
    "children": [
      {
        "id": 4,
        "slug": "other",
        "name": {
          "ru": "Другое",
          "uk": "Інше"
        },
        "is_parentable": false,
        "is_editable": false,
        "is_deletable": false,
        "_lft": 10,
        "_rgt": 11,
        "parent_id": 3,
        "created_at": "2020-01-27 18:09:39",
        "updated_at": "2020-01-27 18:09:39",       
        "children": []
      },
      {
        "id": 11,
        "slug": "germany",
        "name": {
          "ru": "Германия",
          "uk": "Германия"
        },
        "is_parentable": true,
        "is_editable": true,
        "is_deletable": true,
        "_lft": 12,
        "_rgt": 15,
        "parent_id": 3,
        "created_at": "2020-01-27 18:43:07",
        "updated_at": "2020-01-27 18:43:07",      
        "children": [
          {
            "id": 13,
            "slug": "docs",
            "name": {
              "ru": "Документы",
              "uk": "Документи"
            },
            "is_parentable": true,
            "is_editable": true,
            "is_deletable": true,
            "_lft": 13,
            "_rgt": 14,
            "parent_id": 11,
            "created_at": "2020-01-27 18:43:45",
            "updated_at": "2020-01-27 18:43:45",            
            "children": []
          }
        ]
      }
    ]
  }
];

let categoriesFilter = document.forms.categories_filter;
let filterMain = categoriesFilter.querySelector('.Filter_main');

drawDependentSelects(rubrics, filterMain);

let url = new URL(window.location.href);

if (url.searchParams.has('rubric_id')) {
	let rubricId = url.searchParams.get('rubric_id');
	rubricIdInput.value = rubricId;

	let targetOption = findTargetOption(rubricId, filterMain);
	showSelectChain(targetOption, rubricId);
}