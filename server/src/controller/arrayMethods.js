friends = [john, peter, joanas, jonsg, ponki];

friends.unshift("newFriend"); // adds newFriend to the beginning of the array
friends.push("newFriend"); // adds newFriend to the end of the array
friends.pop(); // removes the last element from the array
friends.shift(); // removes the first element from the array

friends.indexOf("peter"); // returns the index of the element in the array
friends.includes("peter"); // returns true if the element is in the array
friends.includes("peter", 1); // returns true if the element is in the array starting from index 1
friends.indexOf("bobby"); // returns -1 if the element is not in the array
