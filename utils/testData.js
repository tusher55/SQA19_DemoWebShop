function uniqueEmail(prefix = 'tusher.sqa19') {
  return `${prefix}.${Date.now()}@example.com`;
}

module.exports = {
  uniqueEmail,
  invalidUser: {
    email: 'wrong.user@example.com',
    password: 'WrongPass123!',
  },
  registerUser: {
    firstName: 'Tusher',
    lastName: 'Dhali',
    password: 'Test@12345',
  },
  product: {
    name: 'Computing and Internet',
    categoryPath: '/books',
    productPath: '/computing-and-internet',
    searchTerm: 'Computing and Internet',
    quantity: '2',
  },
  address: {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    address1: '123 Test Street',
    zip: '90001',
    phone: '1234567890',
  },
};
