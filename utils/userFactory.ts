export interface UserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  mobileNumber: string;
}

export function generateUser(): UserData {
  const timestamp = Date.now();
  return {
    name: `TestUser${timestamp}`,
    email: `testuser${timestamp}@mailtest.com`,
    password: `Pass@${timestamp}`,
    firstName: 'Test',
    lastName: `User${timestamp}`,
    company: 'QA Corp',
    address: '123 Test Street',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '01310-100',
    mobileNumber: '11999990000',
  };
}
