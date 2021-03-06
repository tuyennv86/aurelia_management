import { computedFrom } from 'aurelia-framework';

export class Welcome
{
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  @computedFrom('firstName', 'lastName')
  get fullName()
  {
    return `${this.firstName} ${this.lastName}`;
  }

  submit()
  {
    this.previousValue = this.fullName;
    // eslint-disable-next-line no-alert
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate()
  {
    if (this.fullName !== this.previousValue)
    {
      // eslint-disable-next-line no-alert
      return confirm('Are you sure you want to leave?');
      // if (confirm('Are you sure you want to leave?'))
      // {
      //   alert('fdfd');
      // }
    }
  }

}

export class UpperValueConverter
{
  toView(value)
  {
    return value && value.toUpperCase();
  }
}
