// Toast Plugin
var useToastText = false;
if (showToastFor) {
	useToastText = true;
	window.addEventListener("DOMContentLoaded", function () {
		// Welcoming User
		showToastFor('Welcome to Basic Notes');
	}, false);
}


// DOM Variables
	var _introView = document.querySelector('#introView');
	var _introViewOne = document.querySelector('#introViewOne');
	var _newNoteView = document.querySelector('#newNoteView');
	var  _listNoteView = document.querySelector('#listNoteView');
	// switch function between views
	var switchViewTo = function (vw) {
		switch(vw) {
			case 'ViewIntro':
				// first hide
				_newNoteView.style.display = 'none';
				_listNoteView.style.display = 'none';
				// then show
				_introViewOne.style.display = 'block';

				// then run scripts in this View if any
				//
				// ...
				break;
			case 'NewNote':
				// first hide
				_listNoteView.style.display = 'none';
				_introViewOne.style.display = 'none';
				// then show
				_newNoteView.style.display = 'block';

				// then run scripts in this View if any
				// 
				// ...
				break;
			case 'ListNotes':
				// first hide
				_newNoteView.style.display = 'none';
				_introViewOne.style.display = 'none';
				// then show
				_listNoteView.style.display = 'block';

				// then run scripts in this View if any
				//
				// ...
					printStoreNotes(notesBankStore,'All');
				break;

			default:
				break;
		}
	};

	// Notes Catergories
	var notesCategories = [
		{
			name : 'Uncategorized',
			value : 1,
			_icon : 'fa-life-ring',
			_color: 'w3-text-grey',
			_hover: 'hover-light-grey',
			_borderColor : 'w3-border-grey',
			_bgColor : ['w3-grey','w3-light-grey'],
			_hoverDel : 'w3-hover-light-grey'
		},
		{
			name : 'Work',
			value : 2,
			_icon : 'fa-car',
			_color: 'w3-text-blue',
			_hover: 'hover-pale-blue',
			_borderColor : 'w3-border-blue',
			_bgColor : ['w3-blue','w3-pale-blue'],
			_hoverDel : 'w3-hover-pale-blue'
		},
		{
			name : 'Personal',
			value : 3,
			_icon : 'fa-user',
			_color: 'w3-text-red',
			_hover: 'hover-pale-red',
			_borderColor : 'w3-border-red',
			_bgColor : ['w3-red','w3-pale-red'],
			_hoverDel : 'w3-hover-pale-red'
		},
		{
			name : 'Family Affair',
			value : 4,
			_icon : 'fa-users',
			_color: 'w3-text-green',
			_hover: 'hover-pale-green',
			_borderColor : 'w3-border-green',
			_bgColor : ['w3-green','w3-pale-green'],
			_hoverDel : 'w3-hover-pale-green'
		},
		{
			name : 'Study',
			value : 5,
			_icon : 'fa-book',
			_color: 'w3-text-orange',
			_hover: 'hover-pale-yellow',
			_borderColor : 'w3-border-orange',
			_bgColor : ['w3-orange','w3-pale-yellow'],
			_hoverDel : 'w3-hover-pale-yellow'
		}
	];

	// LocalStorage => on Client's Browser to Save Notes
	/* * * * * * ============= * * * * * * * * * * * * */
	/*												   */
	/*	L 	O 	C 	A 	L 	S 	T 	O 	R 	A 	G 	E  */
	/*												   */
	/* * * * * * ============= * * * * * * * * * * * * */
	// I Choose localStorage and Save data as JSON Object
	var notesBankStoreDataName = 'basic-notes-store';
	// then get and save last session Object here
	var notesBankStore = []; 
	// Check if Device supports LocalStorage
	var hasNotesBankStore = function () {
		var _virtualStore = null;
		// Most browsers block localStorage when Cookies are disabled;
		try {
			_virtualStore = localStorage.getItem(notesBankStoreDataName);
		} catch (error) {
			if (useToastText) {
				showToastFor("Enable Cookies in Browser");
			} else {
				alert("If you'd like your notes saved, turn on cookies");
			}
		}
		// When set to go
		if (localStorage && JSON.parse(_virtualStore) && (JSON.parse(_virtualStore)).length > 0 ) {
			return true;
		} else {
			return false;
		}
	};

	// If supported,
	// Prepare
	var setNotesBankStore = function () {
		// Check if Notes Bank Store exists
		if (hasNotesBankStore() === true) {
			// Then fetch the data 
			notesBankStore = JSON.parse( localStorage.getItem(notesBankStoreDataName) );
			// console.log('Found!');
			return true;
		// Else create new
		} else {
			// Set new
			if (localStorage) {
				try {
					localStorage.setItem(notesBankStoreDataName, null);
					// console.log('Created New!');
				} catch (error) {
					// console.log('Failed New Creation!');
				}
			}
			return false;
		}
	};

	/* / Fetching
	var getNotesBankStore = function () {
		
	}*/

	// Introduction & Running
	window.addEventListener('load',function(){
		// remove animation
		_introView.style.display = 'none';
		// check if there is a NOTES Object in storage
		if (setNotesBankStore() && notesBankStore) {
			// show available notes
			switchViewTo('ListNotes');
		} else {
			switchViewTo('ViewIntro');
		}
	});

	// VIEWS


	// Create New View
	var _introViewOneBtn = document.querySelector('#introViewOne button');
	if (_introViewOneBtn) {
		//console.log('Exists...');
		_introViewOneBtn.addEventListener('click',function () {
			switchViewTo('NewNote');
		});
	}


	// New Note/Entry View
	// Select field
	var _newNoteViewSelect = document.querySelector('#newNoteGroup');
	if (_newNoteViewSelect) {
		window.addEventListener('load',function () {
			if (notesCategories) {
				//console.log('ok');
				for (var i = 0; i < notesCategories.length; i++) {
					//console.log(i);
					var _new_opt = document.createElement('option');
					_new_opt.setAttribute('value',notesCategories[i].value);
					var _new_txt = document.createTextNode(notesCategories[i].name);
					_new_opt.appendChild(_new_txt);
					_newNoteViewSelect.appendChild(_new_opt);
				}
			}
		})
	}
	// Text field
	var _newNoteViewTextArea = document.querySelector('#newNoteTextArea');
	if (_newNoteViewTextArea) {
		// Clear 
		window.addEventListener('load',function(){
			_newNoteViewTextArea.value = '';
		});

		// Auto expand when text overflows
		_newNoteViewTextArea.addEventListener('keyup',function(e){
			// Actual height of the field
			var _its_actual_height = _newNoteViewTextArea.offsetHeight;
			// Apparent height - that is if it overflows
			var _its_apparent_height = _newNoteViewTextArea.scrollHeight;

			// console.log('Run!');
			// console.log(_its_actual_height);
			// console.log(_its_apparent_height);
			// console.log('Done!');

			// Check if the Apparent height is greater than Exact height
			if (_its_apparent_height > parseInt(_its_actual_height)) {
				_its_actual_height += 50;
				// Expand
				_newNoteViewTextArea.style.height = _its_actual_height+'px';
			}

			/* Backspace if clicked => reduce height
			var _the_key_pressed = e.which || e.keyCode;
			//console.log(_the_key_pressed);
			if (_the_key_pressed == 8) {
				// If its actual height is greater than 100px and 
				// DROPPED // 
			}
			*	A bug, couldn't confirm if Backspace if click, the remaining height 
			*	is less or reduced
			*
			*	// DROPPED // 
			*
			*/
		});
	}
	// Cancel Submission
	var _newNoteViewBtnCancel = document.querySelector('#newNoteCancel');
	if (_newNoteViewBtnCancel) {
		_newNoteViewBtnCancel.addEventListener('click',function (event) {
			// no form submission 
			event.preventDefault();
			// Clear field
			if (_newNoteViewTextArea) {
				_newNoteViewTextArea.value = '';
			}
			// Check if there any notes
			if (notesBankStore && notesBankStore.length !== 0) {
				switchViewTo('ListNotes');
			} else {
				switchViewTo('ViewIntro');
			}
		});
	}
	// Allow Saving
	var _newNoteViewBtnOkay = document.querySelector('#newNoteSave');
	if (_newNoteViewBtnOkay) {
		_newNoteViewBtnOkay.addEventListener('click',function (event) {
			// no form submission 
			event.preventDefault();
			// Check if TEXTAREA has a value (len > 0)
			if (_newNoteViewTextArea && _newNoteViewSelect && _newNoteViewTextArea.value.length > 0) {
				// => Then Save
				if (insertAndSaveNote()) {
					switchViewTo('ListNotes');
				}
			} else {
				// => Else
				// Check for any notes
				if (notesBankStore && notesBankStore.length !== 0) {
					switchViewTo('ListNotes');
				} else {
					switchViewTo('ViewIntro');
				}
			}
		});
	}

	// Saving a Notes 
	// => Get new Date().getTime() value
	// => Get text value from textarea
	// => Get group from select
	// => Package it 
	// => Insert it in store
	// => Then, back it up in Storage
	var insertAndSaveNote = function () {
		// Get Time 
		let _current_time = new Date().getTime();
		// Get Group
		let _current_grup = _newNoteViewSelect.value;
		// Get Text
		let _current_note = _newNoteViewTextArea.value;
		// Package
		let _current_pack = {
			note : _current_note,
			grup : _current_grup,
			time : _current_time
		};
		// Insert
		//console.log(notesBankStore);
		notesBankStore.push(_current_pack);
		// Back Up
		if (localStorage) {
			try {
				localStorage.setItem(notesBankStoreDataName, JSON.stringify(notesBankStore));
				// console.log('Saved!');
			} catch (error) {
				// console.log('Not Saved!');
				showToastFor("Enable Cookies in Browser");
			}
			
		}

		// Clear field
		_newNoteViewTextArea.value = '';
		// Status Report
		//console.log(notesBankStore);
		return true;
	}


	// List Notes View

	// Sidebar Group Display
	var _notesGrouping = document.querySelector('#notesGrouping');
	if (_notesGrouping && notesCategories) {
		// Store the Output in HTML
		var _outputHtml = `
					<!-- heading -->
					<span class="w3-bar-item w3-large w3-hide-small">
						<button class="w3-button w3-hover-none w3-block">Groups</button>
					</span>
					<!-- /heading -->
					<!-- groups -->
					<label class="rcontainer w3-block w3-opacity-min w3-hover-opacity-off">
                        <input type="radio" name="category" value="All">
                        <span onclick="sortNotesBy('All')" class="rcheckmark w3-block w3-row">
                        	<span class="w3-col s3 w3-mobile"><i class="fa fa-folder"></i></span>
                        	<span class="w3-col s9 w3-left-align w3-medium w3-hide-small" style="padding: 5px 0">All</span>
                        </span>
                    </label>`;
		// Loop through as we save/append
		for (var i = 0; i < notesCategories.length; i++) {
			// Radio Buttons with name="category"
			_outputHtml += `
					<label class="rcontainer w3-block w3-opacity-min w3-hover-opacity-off">
                        <input type="radio" name="category" value="`+notesCategories[i].value+`">
                        <span onclick="sortNotesBy(`+notesCategories[i].value+`)" class="rcheckmark w3-block w3-row  w3-round-large `+notesCategories[i]._hover+`">
                        	<span class="w3-col s3 w3-mobile `+notesCategories[i]._color+`"><i class="fa `+notesCategories[i]._icon+`"></i></span>
                        	<span class="w3-col s9 w3-left-align w3-medium w3-hide-small" style="padding: 5px 0">`+notesCategories[i].name+`</span>
                        </span>
                    </label>`;
		}
		// Print them
		_notesGrouping.innerHTML = _outputHtml + '<!-- /groups -->';
	}
	// Bubble click event to change Notes Sorting
	var sortNotesBy = function (groupID) {
		// sort according to group and print again
		printStoreNotes(notesBankStore, groupID);
		// Clear search field if not null
		if (_notesSearchField) {
			_notesSearchField.value = '';
		}
	};

	// Switch to New Entry View
	var _noteCreateBtn = document.querySelector('#noteCreateBtn');
	if (_noteCreateBtn) {
		_noteCreateBtn.addEventListener('click',function () {

			// Change the checked radio button to 'ALL'
			var _the_radio_options = document.querySelectorAll('.rcontainer');
			if (_the_radio_options && _the_radio_options.length>0) {
				_the_radio_options[0].click();
			}

			// then Switch
			switchViewTo('NewNote');

		});
	}

	// Which Category
	var whichCategoryIs = function (cw) {
		if (notesCategories) {
			for (var i = 0; i < notesCategories.length; i++) {
				if (notesCategories[i].value == Number(cw)) {
					return i;
					break;
				}
			}
		}
		return 0;
		
	}

	// Notes Time Formatter
	var suitableTimeText = function (aTimeStamp) {
		// Make Date Object of the Timestamp
		var cStamp = new Date(aTimeStamp);
		// Get Current time in millisecond == Ctime
		var cTime = new Date();
		// Get Difference between Ctime & aTimeStamp = CDiff
		var cDiff = cTime.getTime() - cStamp.getTime();
		// Convert the CDiff into days
		cDiff /= (1000 * 60 * 60 * 24);
		// AM or PM
		var cMedian = 'PM';
		if (cStamp.getHours() >=0 && cStamp.getHours() < 12) {
			cMedian = 'AM';
		} 
		// if CDiff is less than One Day
		if (cDiff < 1) {
			// Print the 'Today at H:M' of the aTimeStamp
			let cHour = cStamp.getHours();
			if (cHour < 10) { cHour = '0' + cHour; }
			let cMinute = cStamp.getMinutes();
			if (cMinute < 10) { cMinute = '0' + cMinute; }
			return cHour + ':' + cMinute + ' ' + cMedian;

		/* else if CDiff is greater or equal to One Day && less than Two Days
		} else if (cDiff >= 1 && cDiff < 2) {
			// Print 'Yesterday at H:M'
			return cStamp.getHours() + ':' + cStamp.getMinutes() + ' ' + cMedian;

		// else */
		} else {
			// Months store
			let _cMonths = ['Janaury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			// if Ctime.getFullYear() == aTimeStamp.getFullYear()
			if (cTime.getFullYear() == cStamp.getFullYear()) {
				// Print 'September 24' // Month and Date
				return _cMonths[cStamp.getMonth()] + ' ' + cStamp.getDate();

			// else Print 'Sept 24, 2021'
			} else {
				return _cMonths[cStamp.getMonth()].substring(0,3) + ' ' + cStamp.getDate() + ' ' + cStamp.getFullYear();
			}
		}
					
	};

	// Notes Printer
	var printStoreNotes = function (notesArr, groupID) {
		if (notesArr && notesArr.length > 0) {
			// Sort in Descending Order by Time
			notesArr = notesArr.sort(function (_prev, _next) {
 				if (_prev.time > _next.time) return -1;
 				if (_prev.time < _next.time) return 1;
 				return 0;
			});
			//console.log(notesArr);
			// Output in HTML
			var printOutComeInHTMTL = '';
			// Loop through with Filteration of Group
			for (var i = 0; i < notesArr.length; i++) {
				var _option_d = notesArr[i].note || 'Not Found!';
				var _option_e = notesArr[i].time || 0;
				var _option_f = notesArr[i].grup || 0;

				var whCate = whichCategoryIs(_option_f);
				var _option_a = notesCategories[whCate]._borderColor;
				var _option_b = notesCategories[whCate]._bgColor[0];
				var _option_c = notesCategories[whCate]._bgColor[1];
				var _option_z = notesCategories[whCate]._hoverDel;

				if (_option_f == groupID || groupID == 'All') {
					printOutComeInHTMTL += `
					<div class="w3-bar-item w3-col l4 w3-margin-top w3-opacity-min">
						<div class="`+_option_b+`" style="padding: 4px"></div>
						<div class="w3-container w3-padding w3-border `+_option_c+` `+_option_a+` w3-tooltip">
							<div class="w3-right-align w3-text" style="position: absolute;right:0px;bottom:0">
								<button onclick="deleteNoteOf(`+i+`)" class="w3-button w3-transparent `+_option_z+`">
								<i class="fa fa-trash"></i>
							</button>
							</div>
							<div class="w3-right-align w3-small">`+suitableTimeText(_option_e)+`</div>
							<div>`+_option_d+`</div>
							<div class="w3-clear"></div>
						</div>
					</div>`;
				} else {
					printOutComeInHTMTL += '';
				}
			}
			// If Output is empty, show 
			if (printOutComeInHTMTL.trim() == '' || printOutComeInHTMTL.trim().length == 0) {
				// Print the Error
				_notesBox.innerHTML = `
					<div class="w3-bar-item w3-opacity-min">
						<div class="w3-center w3-padding-16">
							<span><i class="fa fa-meh"></i>&nbsp;No notes available.</span> 
						</div>
					</div>
				`;
			// else
			} else {
				// Print the HTML
				_notesBox.innerHTML = printOutComeInHTMTL;
			}
		}
	};

	// Notes Container
	var _notesBox = document.querySelector('#notesBox');
	if (_notesBox && notesBankStore) {
		printStoreNotes(notesBankStore, 'All');
	}

	// Delete Note Button
	/* Could not refer to DOM that is not yet created
	*  which is a bug, couldn't add Click EventListener
	*  so i added an inline onclick attr to each delete button on printStoreNotes()
	*
	*  var _noteDeleteBtn = document.querySelectorAll('.deleteNoteBtn');
	*  console.log(_noteDeleteBtn.length);
	*/

	// Delete Note
	var deleteNoteOf = function (cval) {
		// Check Obj size
		if (notesBankStore && notesBankStore.length == 1) {
			notesBankStore.pop();
		} else if (notesBankStore && notesBankStore.length > 1) {
			// loop until it is located in the Array, then Delete it!
			for (var i = 0; i < notesBankStore.length; i++) {
				if (i==Number(cval)) {

					notesBankStore.splice(i,1);

					break;
				}
			}
		}

		// After Successful delete or not
		// Back Up Again the current Obj State
		if (localStorage) {
			try {
				localStorage.setItem(notesBankStoreDataName, JSON.stringify(notesBankStore));
				// console.log('Updated!');
			} catch (error) {
				// console.log('Not Updated!');
			}
		}

		// Change the checked radio button to 'ALL' 
		// => sorts back to show all
		var _the_radio_options = document.querySelectorAll('.rcontainer');
		if (_the_radio_options && _the_radio_options.length>0) {
			_the_radio_options[0].click();
		}

		// then refresh print view
		// Check for any notes
		if (notesBankStore && notesBankStore.length !== 0) {
			switchViewTo('ListNotes');
		} else {
			switchViewTo('ViewIntro');
		}
	};

	// Search Field
	var _notesSearchField = document.querySelector('#searchTextField');
	if (_notesSearchField) {
		window.addEventListener('load',function(){
			_notesSearchField.value = '';
		});
	}
		/* When the user clicks on the button,<br>toggle between hiding and showing 
  		the dropdown content */

	function filterNotesHandler() {
		// if exists
		if (_notesBox && _notesSearchField) {
			// get blocks to search from
			var _notesBoxSingles = _notesBox.querySelectorAll('.w3-bar-item');
			// get the keyword
			var _filterKeyword = _notesSearchField.value.trim();
			// if blocks are not zero
			if (_notesBoxSingles.length > 0) {
				// loop through checking each block's text content
				// if they match / contain the keyword
				for (var i = 0; i < _notesBoxSingles.length; i++) {
					// block's text content
					var _contentSet = _notesBoxSingles[i].textContent || _notesBoxSingles[i].innerText;

					if (_contentSet.indexOf(_filterKeyword) > -1) {
						_notesBoxSingles[i].style.display = "";
					} else {
						_notesBoxSingles[i].style.display = "none";
					}
				}
			}
		}
	} 
	
	/* Dark Mode / Light Mode */
var _htmlTag = document.documentElement;
/*
	using body gave me a bug on my Android, 
	to fix that i used html tag and
	assign the darkmode class to html 

	LIKE =>

		html.calc-darkmode,
		.calc-darkmode body 
		{
			background: #111;
  			color: #ff974a;
		}

	...
*/
var _htmlBody = document.body;
var _toggleDLMode = document.getElementById('darkModeBtn');
if (_toggleDLMode) {
	_toggleDLMode.addEventListener('click',function(){
		_htmlTag.classList.toggle('notes-darkmode');
		if (_htmlTag.classList.contains('notes-darkmode')) {
			// console.log('Dark Mode');
			_toggleDLMode.innerHTML = '<i class="fa fa-moon"></i><span class="w3-hide-small">&nbsp;Dark Mode</span>';
			//document.body.classList.replace('calc-darkmode', 'w3-light-grey');
			if (localStorage) {
				localStorage.setItem("notes-dark-mode", "true");  
			}
		} else if (_htmlTag.classList.contains('w3-white')) {
			// console.log('Light Mode');
			_toggleDLMode.innerHTML = '<i class="fa fa-sun"></i><span class="w3-hide-small">&nbsp;Light Mode</span>';
			//_htmlTag.classList.replace('w3-light-grey', 'calc-darkmode');
			if (localStorage) {
				localStorage.setItem("notes-dark-mode", "false");  
			}
		}
	});
} 

/* store Dark Mode value in Local Storage */
window.addEventListener('load', function () {
	if (localStorage && localStorage.getItem("notes-dark-mode") === "true") { 	
		if (_toggleDLMode) {
			_toggleDLMode.click();
		}
	}
});