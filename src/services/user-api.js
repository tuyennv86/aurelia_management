import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class UserApi
{
  constructor(http)
  {
    this.http = http;
  }

  getUser(username)
  {
    //debugger;
    return this.http.fetch('auth/getuser?username=' + username)
      .then(response => response.json())
      .then(user =>
      {
        return user;
      })
      .catch(error =>
      {
        console.log('Error retrieving books.');
      });

  }

  getUsers()
  {
    return this.http.fetch('auth')
      .then(response => response.json())
      .then(users =>
      {
        return users;
      })
      .catch(error =>
      {
        console.log('Error retrieving users.');
      });

  }

  addUser(user)
  {
    return this.http.fetch('auth/signup', {
      method: 'post',
      body: json(user)
    })
      .then(response => response.json())
      .then(createdUser =>
      {
        return createdUser;
      })
      .catch(error =>
      {
        console.log('Error adding user');
      });
  }

  deleteUser(user)
  {
    return this.http.fetch(`auth/${user.name}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(responseMessage =>
      {
        return responseMessage;
      })
      .catch(error =>
      {
        console.log('Error deleting book');
      });
  }

  saveUser(user)
  {
    return this.http.fetch(`auth/${user.name}`, {
      method: 'put',
      body: json(user)
    })
      .then(response => response.json())
      .then(savedUser =>
      {
        return savedUser;
      })
      .catch(error =>
      {
        console.log('Error saving book');
      });
  }
}
