import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class UserApi
{
  constructor(http)
  {
    this.http = http;
  }
  getListUser(pageIndex, limit)
  {
    return this.http.fetch('auth/list?page=' + pageIndex + '&limit=' + limit)
      .then(response => response.json())
      .then(dataUser =>
      {
        return dataUser;
      })
      .catch(error =>
      {
        console.log(error);
      });

  }

  getUser(username)
  {
    return this.http.fetch('auth/getuser?username=' + username)
      .then(response => response.json())
      .then(user =>
      {
        return user;
      })
      .catch(error =>
      {
        console.log('Error retrieving users.');
      });

  }

  getUserById(id)
  {
    return this.http.fetch(`auth/user/${id}`)
      .then(response => response.json())
      .then(user =>
      {
        return user;
      })
      .catch(error =>
      {
        console.log('Error retrieving users.');
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
  changPass(userchang)
  {
    return this.http.fetch('auth/changpass', {
      method: 'post',
      body: json(userchang)
    })
      .then(response => response.json())
      .then(createdUser =>
      {
        return createdUser;
      })
      .catch(error =>
      {
        return error;
      });
  }

  updateInfo(user)
  {
    return this.http.fetch('auth/update/', {
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
        console.log('Error update info user');
      });
  }

  updateImageProfile(id, image)
  {

    let formData = new FormData();
    formData.append('file', image)

    return this.http.fetch(`auth/${id}/avatar`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data =>
      {
        return data;
      })
      .catch(error => console.log(error));
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

  addUserImg(user, image)
  {
    let formData = new FormData();
    formData.append('file', image);
    formData.append("fullname", user.fullname);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("password", user.password);
    formData.append("username", user.username);

    return this.http.fetch('auth/signup', {
      method: 'post',
      body: formData
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
    return this.http.fetch(`auth/${user.id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(responseMessage =>
      {
        return responseMessage;
      })
      .catch(error =>
      {
        console.log('Error deleting user');
      });
  }

  saveUser(user, image)
  {
    let formData = new FormData();
    formData.append('file', image);
    formData.append("fullname", user.fullname);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    return this.http.fetch(`auth/${user.id}`, {
      method: 'put',
      body: formData
    }).then(response => response.json())
      .then(savedUser =>
      {
        return savedUser;
      })
      .catch(error =>
      {
        return error;
      });
  }

  saveUserNoImage(user)
  {

    return this.http.fetch(`auth/NoImage/${user.id}`, {
      method: 'put',
      body: json(user)
    }).then(response => response.json())
      .then(savedUser =>
      {
        return savedUser;
      })
      .catch(error =>
      {
        return error;
      });
  }
}
