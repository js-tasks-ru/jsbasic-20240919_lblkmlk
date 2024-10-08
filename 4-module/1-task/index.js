function makeFriendsList(friends) {
  const ul = document.createElement('ul');

  for (let i = 0; i < friends.length; i++) {
   ul.innerHTML += `<li>${friends[i].firstName} ${friends[i].lastName}</li>`;
  }

   return ul;
}
