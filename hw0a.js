/*
2 by n table of US infant birth weight data, stored as a 2-dimensional array. 
The first column is the age of the mother at the time of birth and the second column is the birth weight of the infant.
*/
var birthWeights = [[18, 2.0],
					[35, 3.3],	
					[20, 4.4],					
					[30, 5.0],
					[35, 4],
					[28, 3.5],
					[34, 4.5],
					[20, 5.5],
					[50, 6.3]];


// Run the function
var results = agesFromBirthweights(birthWeights, 6, 3, 6);

// Output the results
console.log("Results:");
console.log(results);

/*
Write a single function, in your language of choice, that takes as input: 
1. the birth weight table
2. the number of rows in the table
3. a number min and a number max (in this order);

that then returns:
1. the average,
2. the median
3. the mode of the ages of the mothers whose infant has birth weight between min lbs and max lbs. Do not use any pre-defined or built-in functions (e.g. sort, filter, mean etc).
*/
function agesFromBirthweights(birthWeights, rowCount, minWeight, maxWeight) {

	// Setup the variable we want to use
	var momAges = [(rowCount)?rowCount:birthWeights.length];
	var ageTotal = 0;

	// Loop through the birthWeights data
	for (var i = 0; i < birthWeights.length; i++) {
		var momAge = birthWeights[i][0];
		var babyWeight = birthWeights[i][1]; 
		
		// Add the mother's age to the momAges array and ageTotal if the babyWeight is between the min lbs and max lbs
		if (babyWeight >= minWeight && babyWeight <= maxWeight) {
			momAges.push(momAge);
			ageTotal += momAge;
		}
	}

	// Sort the momsAge array using a bubble sort for calculating the median
	momAges = sortAges(momAges);

	// Calculate the average 
	var average = (ageTotal/momAges.length);

	// Calculate the median
	var median = getMedian(momAges);

	// Calculate the mode
	var mode = getMode(momAges);


	return {'average': average, 'median': median, 'mode(s)': mode};
	
}

// Function to sort the mother's ages
function sortAges(a) {
	
	// Null check
	if(a.length == 0)
    	return null;
	
	var isSorted = false;
	
	// Loop through the array until the sorted flag is true
	do {
		isSorted = false;
		
		// Loop through the array
		for (var i=0; i < a.length-1; i++) {
			
			// If this value is greater than the next transpose them
			if (a[i] > a[i+1]) {
				var temp = a[i];
				a[i] = a[i+1];
				a[i+1] = temp;
				isSorted = true;
	        }
	    }
	} while (isSorted);

	console.log("Filtered and sorted ages:");
	console.log(a);

	return a;
	
}

// Function to get the median
function getMedian(a) {

	// Null check
	if(a.length == 0)
    	return null;

	// Check is the array is even.  If so, we need to get the two middle point and average them together
	var isEven = (a.length % 2) ? true:false;
	
	// Get the middle index ofthe array
	var midIndex = Math.floor(a.length/2);

	// If even, grab the two middle indexes and average them.  If odd, return the middle index value
	return (isEven)?a[midIndex]:(a[midIndex]+a[midIndex-1])/2;
	
}

// Function to get the mode
function getMode(a) {
	
	// Null check
	if(a.length == 0)
	    	return null;	
	
	var m = {},
	highCount = 1, 
	modes = [a[0]];

	// Loop through the array
	for(var i = 0; i < a.length; i++) {
		
		// Set the current array element for this iteration
		var e = a[i];

		// Add each discovered array element to the count for this value in the map object
		(m[e]==null) ? m[e]=1 : m[e]++;
		
		// If this value is greater that the current highest count for the values in the array, add this as a potential mode
		if (m[e] > highCount){
			
	            modes = [e];
	            highCount = m[e];
		
		// If this value has a count that is the same as the current high count, add it to an array to handle multiple modes
		}else if (m[e] == highCount){
			
	            modes.push(e);
	            highCount = m[e];
	    }
	}
	    
	return modes;
	
}